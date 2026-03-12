import * as React from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  senderName?: string;
  senderId?: string;
}

export interface Conversation {
  id: string;
  userName: string;
  userAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  listingId: string;
  listingTitle: string;
  messages: Message[];
  otherUserId: string;
}

let conversations: Conversation[] = [];
let listeners: (() => void)[] = [];
let currentUserId: string | null = null;

function notifyListeners() {
  listeners.forEach((l) => l());
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

async function loadConversations(userId: string) {
  currentUserId = userId;

  const { data: convRows, error } = await supabase
    .from("conversations")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("updated_at", { ascending: false });

  if (error || !convRows) {
    console.error("Failed to load conversations", error);
    return;
  }

  const convIds = convRows.map((c: any) => c.id);
  let allMessages: any[] = [];
  if (convIds.length > 0) {
    const { data: msgs } = await supabase
      .from("messages")
      .select("*")
      .in("conversation_id", convIds)
      .order("created_at", { ascending: true });
    allMessages = msgs || [];
  }

  // Count unread messages per conversation (messages not sent by me and not read)
  const unreadMap: Record<string, number> = {};
  allMessages.forEach((m: any) => {
    if (m.sender_id !== userId && !m.read) {
      unreadMap[m.conversation_id] = (unreadMap[m.conversation_id] || 0) + 1;
    }
  });

  // Fetch profile names for other users
  const otherUserIds = convRows.map((c: any) =>
    c.sender_id === userId ? c.receiver_id : c.sender_id
  );
  const uniqueIds = [...new Set(otherUserIds)];
  let profileMap: Record<string, { name: string; avatar_url: string | null }> = {};
  if (uniqueIds.length > 0) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("user_id, name, avatar_url")
      .in("user_id", uniqueIds);
    if (profiles) {
      profiles.forEach((p: any) => {
        profileMap[p.user_id] = { name: p.name, avatar_url: p.avatar_url };
      });
    }
  }

  conversations = convRows.map((c: any) => {
    const otherUserId = c.sender_id === userId ? c.receiver_id : c.sender_id;
    const profile = profileMap[otherUserId];
    const convMessages = allMessages.filter((m: any) => m.conversation_id === c.id);
    const lastMsg = convMessages[convMessages.length - 1];

    return {
      id: c.id,
      userName: profile?.name || "Lietotājs",
      userAvatar: profile?.avatar_url || undefined,
      lastMessage: lastMsg?.text || "",
      timestamp: lastMsg ? formatTime(lastMsg.created_at) : formatTime(c.created_at),
      unread: unreadMap[c.id] || 0,
      listingId: c.listing_id || "",
      listingTitle: c.listing_title || "",
      otherUserId,
      messages: convMessages.map((m: any) => ({
        id: m.id,
        text: m.text,
        timestamp: formatTime(m.created_at),
        isOwn: m.sender_id === userId,
        senderId: m.sender_id,
      })),
    } as Conversation;
  });

  notifyListeners();
}

export const messagesStore = {
  getConversations: (): Conversation[] => conversations,

  getConversation: (id: string): Conversation | undefined => {
    return conversations.find((c) => c.id === id);
  },

  loadForUser: loadConversations,

  startConversation: async (data: {
    listingId: string;
    listingTitle: string;
    messageText: string;
    authorName?: string;
    receiverId: string;
  }): Promise<Conversation | null> => {
    if (!currentUserId) return null;

    // Check if conversation already exists for this listing between these users
    const existing = conversations.find(
      (c) => c.listingId === data.listingId && c.otherUserId === data.receiverId
    );

    if (existing) {
      await messagesStore.addMessage(existing.id, data.messageText);
      return conversations.find((c) => c.id === existing.id) || null;
    }

    // Create new conversation
    const { data: conv, error: convError } = await supabase
      .from("conversations")
      .insert({
        listing_id: data.listingId,
        listing_title: data.listingTitle,
        sender_id: currentUserId,
        receiver_id: data.receiverId,
      })
      .select()
      .single();

    if (convError || !conv) {
      console.error("Failed to create conversation", convError);
      return null;
    }

    // Insert first message
    const { data: msg } = await supabase
      .from("messages")
      .insert({
        conversation_id: conv.id,
        sender_id: currentUserId,
        text: data.messageText,
      })
      .select()
      .single();

    const newConv: Conversation = {
      id: conv.id,
      userName: data.authorName || "Lietotājs",
      listingId: data.listingId,
      listingTitle: data.listingTitle,
      lastMessage: data.messageText,
      timestamp: msg ? formatTime(msg.created_at) : formatTime(conv.created_at),
      unread: 0,
      otherUserId: data.receiverId,
      messages: msg
        ? [
            {
              id: msg.id,
              text: msg.text,
              timestamp: formatTime(msg.created_at),
              isOwn: true,
              senderId: currentUserId,
            },
          ]
        : [],
    };

    conversations = [newConv, ...conversations];
    notifyListeners();
    return newConv;
  },

  addMessage: async (conversationId: string, text: string): Promise<void> => {
    if (!currentUserId) return;

    const { data: msg, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: currentUserId,
        text,
      })
      .select()
      .single();

    if (error || !msg) {
      console.error("Failed to send message", error);
      return;
    }

    // Update conversation updated_at
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId);

    const newMsg: Message = {
      id: msg.id,
      text: msg.text,
      timestamp: formatTime(msg.created_at),
      isOwn: true,
      senderId: currentUserId,
    };

    conversations = conversations.map((c) => {
      if (c.id === conversationId) {
        return {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: text,
          timestamp: newMsg.timestamp,
        };
      }
      return c;
    });

    notifyListeners();
  },

  markAsRead: async (conversationId: string): Promise<void> => {
    if (!currentUserId) return;

    // Mark all unread messages in this conversation as read in DB
    await supabase
      .from("messages")
      .update({ read: true })
      .eq("conversation_id", conversationId)
      .neq("sender_id", currentUserId)
      .eq("read", false);

    conversations = conversations.map((c) => {
      if (c.id === conversationId) {
        return { ...c, unread: 0 };
      }
      return c;
    });
    notifyListeners();
  },

  subscribe: (listener: () => void): (() => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

// Setup realtime subscription for new messages
function setupRealtime() {
  supabase
    .channel("messages-realtime")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        if (!currentUserId) return;
        const msg = payload.new as any;
        // Skip own messages (already added optimistically)
        if (msg.sender_id === currentUserId) return;

        const conv = conversations.find((c) => c.id === msg.conversation_id);
        if (conv) {
          const newMsg: Message = {
            id: msg.id,
            text: msg.text,
            timestamp: formatTime(msg.created_at),
            isOwn: false,
            senderId: msg.sender_id,
          };
          conversations = conversations.map((c) => {
            if (c.id === msg.conversation_id) {
              return {
                ...c,
                messages: [...c.messages, newMsg],
                lastMessage: msg.text,
                timestamp: newMsg.timestamp,
                unread: c.unread + 1,
              };
            }
            return c;
          });
          notifyListeners();
        } else {
          // New conversation from someone else — reload
          loadConversations(currentUserId!);
        }
      }
    )
    .subscribe();
}

setupRealtime();

export function useConversations(): Conversation[] {
  const [, forceUpdate] = React.useState({});

  React.useEffect(() => {
    return messagesStore.subscribe(() => forceUpdate({}));
  }, []);

  return messagesStore.getConversations();
}
