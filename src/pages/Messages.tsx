import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  userName: string;
  userAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  listingTitle: string;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    userName: "Jānis Bērziņš",
    lastMessage: "Vai telefons vēl ir pieejams?",
    timestamp: "Pirms 5 min",
    unread: 2,
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
    listingTitle: "Pazudis kaķis Mincis",
    messages: [
      { id: "1", text: "Sveiki, es redzēju pelēku kaķi pie mūsu mājas!", timestamp: "Vakar 18:00", isOwn: false },
      { id: "2", text: "Tiešām? Kur tieši?", timestamp: "Vakar 18:05", isOwn: true },
      { id: "3", text: "Es nosūtīšu foto", timestamp: "Vakar 18:10", isOwn: false },
    ],
  },
];

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.listingTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      timestamp,
      isOwn: true,
    };

    // Update the selected conversation with the new message
    const updatedConversations = conversations.map((conv) => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: newMessage.trim(),
          timestamp: "Tikko",
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    
    // Update selected conversation to show new message
    const updatedSelected = updatedConversations.find(c => c.id === selectedConversation.id);
    if (updatedSelected) {
      setSelectedConversation(updatedSelected);
    }
    
    setNewMessage("");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Ziņojumi</h1>
          <p className="text-muted-foreground">Sarakste ar citiem lietotājiem</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Conversations List */}
          <div className={`lg:col-span-1 ${selectedConversation ? "hidden lg:block" : ""}`}>
            <div className="rounded-xl border border-border bg-card shadow-card">
              {/* Search */}
              <div className="border-b border-border p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Meklēt sarunas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Conversation List */}
              <div className="max-h-[500px] overflow-y-auto">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full border-b border-border p-4 text-left transition-colors hover:bg-muted/50 ${
                        selectedConversation?.id === conv.id ? "bg-muted" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conv.userAvatar} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {conv.userName.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium text-foreground truncate">
                              {conv.userName}
                            </span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {conv.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mb-1">
                            {conv.listingTitle}
                          </p>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm text-muted-foreground truncate">
                              {conv.lastMessage}
                            </p>
                            {conv.unread > 0 && (
                              <Badge className="bg-accent text-accent-foreground text-xs">
                                {conv.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    Nav atrasta neviena saruna
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className={`lg:col-span-2 ${!selectedConversation ? "hidden lg:block" : ""}`}>
            <div className="rounded-xl border border-border bg-card shadow-card h-[600px] flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="border-b border-border p-4 flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.userAvatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {selectedConversation.userName.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {selectedConversation.userName}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.listingTitle}
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedConversation.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            msg.isOwn
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}
                          >
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t border-border p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Rakstīt ziņojumu..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} className="gap-2">
                        <Send className="h-4 w-4" />
                        Sūtīt
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Izvēlies sarunu, lai sāktu rakstīt</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
