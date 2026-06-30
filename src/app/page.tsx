"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useChatData } from "@/hooks/use-chat";
import { api } from "@/services/api-client";
import { ChatMessage } from "@/types/chat";
import { ChatInput } from "@/features/chat/chat-input";
import { ChatWindow } from "@/features/chat/chat-window";
import { TopNav } from "@/features/navbar/top-nav";
import { ChatSidebar } from "@/features/sidebar/chat-sidebar";

export default function Home() {
  const { conversations, activeConversationId, setConversations, setActiveConversationId } =
    useChatData();
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState("Ready");

  const activeConversation = useMemo(
    () => conversations.find((item) => item.id === activeConversationId),
    [activeConversationId, conversations],
  );

  async function refresh() {
    const { data } = await api.get("/history");
    setConversations(data);
  }

  async function onSend(text: string) {
    try {
      setLoading(true);
      const optimistic: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        createdAt: new Date().toISOString(),
      };
      if (activeConversation) {
        setConversations(
          conversations.map((c) =>
            c.id === activeConversation.id ? { ...c, messages: [...c.messages, optimistic] } : c,
          ),
        );
      }
      const { data } = await api.post("/chat", { conversationId: activeConversationId, message: text });
      setProvider(data.provider);
      setActiveConversationId(data.conversationId);
      await refresh();
    } catch {
      toast.error("Unable to get response. Retry in a moment.");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: string) {
    await api.delete(`/conversation/${id}`);
    toast.success("Conversation deleted");
    await refresh();
  }

  return (
    <main className="gradient-bg min-h-screen p-4 text-[var(--foreground)] lg:p-6">
      <div className="mx-auto flex max-w-[1400px] gap-4">
        <ChatSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelect={setActiveConversationId}
          onDelete={onDelete}
        />
        <section className="flex min-h-[90vh] flex-1 flex-col gap-4">
          <TopNav provider={provider} />
          <div className="flex-1 overflow-auto">
            <ChatWindow messages={activeConversation?.messages ?? []} onPromptClick={onSend} />
          </div>
          <ChatInput onSend={onSend} loading={loading} />
        </section>
      </div>
    </main>
  );
}
