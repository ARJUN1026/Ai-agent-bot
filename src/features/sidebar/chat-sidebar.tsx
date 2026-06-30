"use client";

import { Download, HelpCircle, MessageSquarePlus, Search, Settings, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Conversation } from "@/types/chat";
import { cn } from "@/lib/utils";

interface Props {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ChatSidebar({ conversations, activeConversationId, onSelect, onDelete }: Props) {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="glass hidden w-72 shrink-0 rounded-2xl p-4 lg:flex lg:flex-col"
    >
      <button className="mb-4 flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--foreground)] px-3 py-2 text-sm text-[var(--background)] hover:opacity-92 dark:bg-[var(--accent-soft)] dark:text-[#111827]">
        <MessageSquarePlus className="size-4" /> New Chat
      </button>
      <div className="mb-3 flex items-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-[var(--muted)]">
        <Search className="size-4" /> Search Conversation
      </div>
      <div className="flex-1 space-y-2 overflow-auto">
        {conversations.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              "group w-full rounded-xl border border-[var(--border)] bg-white/55 p-3 text-left hover:bg-black/2 dark:bg-white/2 dark:hover:bg-white/4",
              activeConversationId === item.id && "border-slate-300 bg-white dark:border-slate-600 dark:bg-white/5",
            )}
          >
            <p className="truncate text-sm font-medium">{item.title}</p>
            <div className="mt-1 flex items-center justify-between text-xs text-[var(--muted)]">
              <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
              <Trash2
                className="size-3 opacity-0 transition group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
              />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
        <button className="flex w-full items-center gap-2 rounded-xl px-2 py-2 hover:bg-black/4 dark:hover:bg-white/6">
          <Download className="size-4" /> Export Chat
        </button>
        <button className="flex w-full items-center gap-2 rounded-xl px-2 py-2 hover:bg-black/4 dark:hover:bg-white/6">
          <Settings className="size-4" /> Settings
        </button>
        <button className="flex w-full items-center gap-2 rounded-xl px-2 py-2 hover:bg-black/4 dark:hover:bg-white/6">
          <HelpCircle className="size-4" /> Help & About
        </button>
      </div>
    </motion.aside>
  );
}
