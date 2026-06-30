import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateAIResponse } from "@/services/ai-providers";

export async function POST(req: Request) {
  try {
    const { conversationId, message } = (await req.json()) as {
      conversationId?: string;
      message: string;
    };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const conversation = conversationId
      ? await prisma.conversation.findUnique({ where: { id: conversationId } })
      : null;

    const current =
      conversation ??
      (await prisma.conversation.create({
        data: { title: message.slice(0, 40) || "New Conversation" },
      }));

    await prisma.message.create({
      data: {
        conversationId: current.id,
        role: "user",
        content: message,
      },
    });

    const ai = await generateAIResponse(message);
    const savedAnswer = await prisma.message.create({
      data: {
        conversationId: current.id,
        role: "assistant",
        content: ai.text,
      },
    });

    return NextResponse.json({
      conversationId: current.id,
      provider: ai.provider,
      answer: {
        id: savedAnswer.id,
        role: savedAnswer.role,
        content: savedAnswer.content,
        createdAt: savedAnswer.createdAt.toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: "Something went wrong while generating response.",
        retryable: true,
      },
      { status: 500 },
    );
  }
}
