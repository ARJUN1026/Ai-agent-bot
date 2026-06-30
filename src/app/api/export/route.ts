import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { conversationId } = (await req.json()) as { conversationId: string };
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  if (!conversation) return NextResponse.json({ error: "Conversation not found" }, { status: 404 });

  const markdown = [
    `# ${conversation.title}`,
    "",
    ...conversation.messages.map(
      (m) => `## ${m.role === "user" ? "User" : "Assistant"}\n\n${m.content}\n`,
    ),
  ].join("\n");

  return NextResponse.json({ content: markdown });
}
