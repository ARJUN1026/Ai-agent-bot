export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface ChatRequestPayload {
  conversationId: string | null;
  message: string;
  regenerate?: boolean;
}

export interface ChatResponsePayload {
  conversationId: string;
  answer: ChatMessage;
  provider: string;
}
