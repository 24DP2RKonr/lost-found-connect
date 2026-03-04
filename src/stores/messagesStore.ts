import * as React from "react";

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  senderName?: string;
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
}

const initialConversations: Conversation[] = [];

const STORAGE_KEY = "atradi_messages_v2";

function loadConversations(): Conversation[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to load messages from localStorage", e);
  }
  return initialConversations;
}

function saveConversations(conversations: Conversation[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (e) {
    console.error("Failed to save messages to localStorage", e);
  }
}

let conversations: Conversation[] = loadConversations();
let listeners: (() => void)[] = [];

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function getTimestamp(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}

export const messagesStore = {
  getConversations: (): Conversation[] => conversations,

  getConversation: (id: string): Conversation | undefined => {
    return conversations.find((c) => c.id === id);
  },

  startConversation: (data: {
    listingId: string;
    listingTitle: string;
    messageText: string;
    authorName?: string;
    senderName?: string;
  }): Conversation => {
    const existing = conversations.find((c) => c.listingId === data.listingId);

    if (existing) {
      const newMsg: Message = {
        id: Date.now().toString(),
        text: data.messageText,
        timestamp: getTimestamp(),
        isOwn: true,
        senderName: data.senderName || "Es",
      };

      conversations = conversations.map((c) => {
        if (c.id === existing.id) {
          return {
            ...c,
            messages: [...c.messages, newMsg],
            lastMessage: data.messageText,
            timestamp: "Tikko",
          };
        }
        return c;
      });

      saveConversations(conversations);
      notifyListeners();
      return conversations.find((c) => c.id === existing.id)!;
    }

    const newConversation: Conversation = {
      id: Date.now().toString(),
      userName: data.authorName || "Lietotājs",
      listingId: data.listingId,
      listingTitle: data.listingTitle,
      lastMessage: data.messageText,
      timestamp: "Tikko",
      unread: 0,
      messages: [
        {
          id: Date.now().toString(),
          text: data.messageText,
          timestamp: getTimestamp(),
          isOwn: true,
          senderName: data.senderName || "Es",
        },
      ],
    };

    conversations = [newConversation, ...conversations];
    saveConversations(conversations);
    notifyListeners();
    return newConversation;
  },

  addMessage: (conversationId: string, text: string, senderName?: string): void => {
    const newMsg: Message = {
      id: Date.now().toString(),
      text,
      timestamp: getTimestamp(),
      isOwn: true,
      senderName: senderName || "Es",
    };

    conversations = conversations.map((c) => {
      if (c.id === conversationId) {
        return {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: text,
          timestamp: "Tikko",
        };
      }
      return c;
    });

    saveConversations(conversations);
    notifyListeners();
  },

  subscribe: (listener: () => void): (() => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

export function useConversations(): Conversation[] {
  const [, forceUpdate] = React.useState({});

  React.useEffect(() => {
    return messagesStore.subscribe(() => forceUpdate({}));
  }, []);

  return messagesStore.getConversations();
}
