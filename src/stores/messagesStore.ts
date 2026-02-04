import * as React from "react";

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
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

const initialConversations: Conversation[] = [
  {
    id: "1",
    userName: "Jānis Bērziņš",
    lastMessage: "Vai telefons vēl ir pieejams?",
    timestamp: "Pirms 5 min",
    unread: 2,
    listingId: "1",
    listingTitle: "Melns iPhone 15 Pro",
    messages: [
      { id: "1", text: "Sveiki! Es redzēju jūsu sludinājumu par pazudušo telefonu.", timestamp: "14:30", isOwn: false },
      { id: "2", text: "Vai tas ir ar sarkanu maciņu?", timestamp: "14:31", isOwn: false },
      { id: "3", text: "Jā, tieši tā! Vai jūs to esat atraduši?", timestamp: "14:35", isOwn: true },
      { id: "4", text: "Vai telefons vēl ir pieejams?", timestamp: "14:40", isOwn: false },
    ],
  },
  {
    id: "2",
    userName: "Anna Liepiņa",
    lastMessage: "Paldies, tikāmies rīt!",
    timestamp: "Pirms 1h",
    unread: 0,
    listingId: "2",
    listingTitle: "Atrasts maks ar dokumentiem",
    messages: [
      { id: "1", text: "Labdien! Tas varētu būt mans maks.", timestamp: "12:00", isOwn: false },
      { id: "2", text: "Vai jūs varat aprakstīt, kas tajā ir?", timestamp: "12:05", isOwn: true },
      { id: "3", text: "Jā, tur ir ID karte un 2 bankas kartes.", timestamp: "12:10", isOwn: false },
      { id: "4", text: "Paldies, tikāmies rīt!", timestamp: "12:15", isOwn: false },
    ],
  },
  {
    id: "3",
    userName: "Pēteris Kalniņš",
    lastMessage: "Es nosūtīšu foto",
    timestamp: "Vakar",
    unread: 1,
    listingId: "3",
    listingTitle: "Pazudis kaķis Mincis",
    messages: [
      { id: "1", text: "Sveiki, es redzēju pelēku kaķi pie mūsu mājas!", timestamp: "Vakar 18:00", isOwn: false },
      { id: "2", text: "Tiešām? Kur tieši?", timestamp: "Vakar 18:05", isOwn: true },
      { id: "3", text: "Es nosūtīšu foto", timestamp: "Vakar 18:10", isOwn: false },
    ],
  },
];

const STORAGE_KEY = "atradi_messages";

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

  // Start a new conversation from a listing detail page
  startConversation: (data: {
    listingId: string;
    listingTitle: string;
    messageText: string;
  }): Conversation => {
    // Check if conversation for this listing already exists
    const existing = conversations.find((c) => c.listingId === data.listingId);
    
    if (existing) {
      // Add message to existing conversation
      const newMsg: Message = {
        id: Date.now().toString(),
        text: data.messageText,
        timestamp: getTimestamp(),
        isOwn: true,
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

    // Create new conversation
    const newConversation: Conversation = {
      id: Date.now().toString(),
      userName: "Sludinājuma autors",
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
        },
      ],
    };

    conversations = [newConversation, ...conversations];
    saveConversations(conversations);
    notifyListeners();
    return newConversation;
  },

  addMessage: (conversationId: string, text: string): void => {
    const newMsg: Message = {
      id: Date.now().toString(),
      text,
      timestamp: getTimestamp(),
      isOwn: true,
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
