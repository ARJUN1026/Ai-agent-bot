"use client";

import { motion } from "framer-motion";
import { Building2, Globe, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function TopNav({ provider }: { provider: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass sticky top-0 z-20 flex items-center justify-between rounded-2xl px-4 py-3"
    >
      <div className="flex items-center gap-3">
        <div className="metal-ring rounded-xl bg-black/3 p-2 dark:bg-white/3">
          <Building2 className="size-5 text-[var(--accent-strong)] dark:text-[var(--accent-soft)]" />
        </div>
        <div>
          <p className="text-sm text-[var(--muted)]">Digital Friend</p>
          <p className="text-base font-semibold tracking-[0.01em] text-[var(--foreground)]">
            Support Workspace
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full border border-[var(--border)] bg-black/3 px-3 py-1 text-xs text-[var(--muted)] dark:bg-white/4">
          Online - {provider}
        </span>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-xl border border-[var(--border)] p-2 text-[var(--foreground)] hover:bg-black/4 dark:hover:bg-white/6"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-[var(--border)] p-2 text-[var(--foreground)] hover:bg-black/4 dark:hover:bg-white/6"
        >
          <Globe className="size-4" />
        </a>
      </div>
    </motion.header>
  );
}
