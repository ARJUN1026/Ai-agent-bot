"use client";

import { useEffect, useState } from "react";
import { Conversation } from "@/types/chat";
import { api } from "@/services/api-client";
import { useChatStore } from "@/store/chat-store";

export function useChatData() {
  const { conversations, setConversations, activeConversationId, setActiveConversationId } =
    useChatStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Conversation[]>("/history")
      .then(({ data }) => {
        setConversations(data);
        if (!activeConversationId && data[0]) setActiveConversationId(data[0].id);
      })
      .finally(() => setLoading(false));
  }, [activeConversationId, setActiveConversationId, setConversations]);

  return {
    loading,
    conversations,
    activeConversationId,
    setConversations,
    setActiveConversationId,
  };
}
