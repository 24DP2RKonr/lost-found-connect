import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, ArrowLeft } from "lucide-react";
import { useConversations, messagesStore, Conversation } from "@/stores/messagesStore";

const Messages = () => {
  const allConversations = useConversations();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update selected conversation when store changes
  useEffect(() => {
    if (selectedConversation) {
      const updated = allConversations.find((c) => c.id === selectedConversation.id);
      if (updated) {
        setSelectedConversation(updated);
      }
    }
  }, [allConversations, selectedConversation?.id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages]);

  const filteredConversations = allConversations.filter(
    (conv) =>
      conv.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.listingTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    messagesStore.addMessage(selectedConversation.id, newMessage.trim());
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
                        className={`flex ${msg.isOwn ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            msg.isOwn
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p
                            className={`text-xs font-semibold mb-1 ${
                              msg.isOwn ? "text-primary-foreground/80" : "text-foreground/70"
                            }`}
                          >
                            {msg.isOwn ? (msg.senderName || "Es") : selectedConversation.userName}
                          </p>
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
                    <div ref={messagesEndRef} />
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
