"use client";

import { useState } from "react";
import { Mic, Paperclip, SendHorizontal } from "lucide-react";

export function ChatInput({
  onSend,
  loading,
}: {
  onSend: (text: string) => void;
  loading: boolean;
}) {
  const [text, setText] = useState("");
  const remaining = 1000 - text.length;

  return (
    <div className="glass sticky bottom-0 rounded-2xl p-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask Digital Friend AI..."
        className="min-h-24 w-full resize-none rounded-xl bg-transparent p-2 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (text.trim() && !loading) {
              onSend(text);
              setText("");
            }
          }
        }}
      />
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] opacity-70" disabled>
            <Paperclip className="size-4" />
          </button>
          <button className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted)] opacity-70" disabled>
            <Mic className="size-4" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--muted)]">{remaining} chars</span>
          <button
            disabled={loading || !text.trim()}
            onClick={() => {
              onSend(text);
              setText("");
            }}
            className="rounded-xl bg-[#111827] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1f2937] disabled:opacity-40 dark:bg-[#e5e7eb] dark:text-[#111827] dark:hover:bg-white"
          >
            <SendHorizontal className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
