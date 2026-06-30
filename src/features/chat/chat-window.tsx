"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Bot, Copy, RotateCcw, User } from "lucide-react";
import { ChatMessage } from "@/types/chat";
import { formatTime } from "@/lib/utils";

interface Props {
  messages: ChatMessage[];
  onPromptClick: (prompt: string) => void;
}

const prompts = ["Pricing", "Services", "Careers", "Contact Support", "Product Information"];

export function ChatWindow({ messages, onPromptClick }: Props) {
  if (!messages.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h1 className="mb-2 text-4xl font-semibold text-[var(--foreground)]">
          Welcome to Digital Friend
        </h1>
        <p className="mb-8 text-[var(--muted)]">How can I help you today?</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onPromptClick(prompt)}
              className="glass rounded-2xl px-6 py-4 text-left text-[var(--foreground)] hover:bg-black/3 dark:hover:bg-white/4"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-2">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="group glass rounded-2xl p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              {message.role === "assistant" ? (
                <Bot className="size-4 text-[var(--accent-strong)] dark:text-[var(--accent-soft)]" />
              ) : (
                <User className="size-4 text-slate-500 dark:text-slate-300" />
              )}
              {message.role === "assistant" ? "Digital Friend Support" : "You"}
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
              {formatTime(message.createdAt)}
              <Copy className="size-3 cursor-pointer" />
              {message.role === "assistant" && <RotateCcw className="size-3 cursor-pointer" />}
            </div>
          </div>
          <article className="prose max-w-none text-sm dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {message.content}
            </ReactMarkdown>
          </article>
        </motion.div>
      ))}
    </div>
  );
}
