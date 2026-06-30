import axios from "axios";
import { APP } from "@/utils/constants";

interface ProviderResult {
  text: string;
  provider: string;
}

async function callOpenAI(message: string): Promise<ProviderResult> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_MISSING_KEY");
  const { data } = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: APP.SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      temperature: 0.3,
      max_tokens: 220,
    },
    { headers: { Authorization: `Bearer ${key}` } },
  );
  return { text: data?.choices?.[0]?.message?.content ?? "", provider: "OpenAI" };
}

async function callGemini(message: string): Promise<ProviderResult> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_MISSING_KEY");
  const { data } = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
    {
      contents: [{ parts: [{ text: `${APP.SYSTEM_PROMPT}\n\nUser: ${message}` }] }],
    },
  );
  return {
    text: data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "",
    provider: "Gemini",
  };
}

async function callGroq(message: string): Promise<ProviderResult> {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_MISSING_KEY");
  const { data } = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: APP.SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      temperature: 0.2,
      max_tokens: 220,
    },
    { headers: { Authorization: `Bearer ${key}` } },
  );
  return { text: data?.choices?.[0]?.message?.content ?? "", provider: "Groq" };
}

function callMock(message: string): ProviderResult {
  return {
    provider: "Mock AI",
    text: `Thanks for contacting Digital Friend.\n\n- We received your query: "${message.slice(0, 80)}".\n- A support specialist can help with detailed account-specific requests.\n- Please share your registered email at support@digitalfriend.ai for faster assistance.`,
  };
}

export async function generateAIResponse(message: string): Promise<ProviderResult> {
  const chain = [callOpenAI, callGemini, callGroq];
  for (const provider of chain) {
    try {
      const result = await provider(message);
      if (result.text?.trim()) return result;
    } catch {
      continue;
    }
  }
  return callMock(message);
}
