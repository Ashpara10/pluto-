import google, { systemPrompt } from "@/lib/ai";
import redis from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { streamText } from "ai";
import { NextRequest } from "next/server";

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "30s"),
});

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const ip = req.ip ?? "ip";
  const { success, remaining } = await ratelimit.limit(ip);
  if (!success) {
    return Response.json({ remaining }, { status: 429 });
  }
  const { ctx, messages } = await req.json();

  const result = await streamText({
    model: google("gemini-1.5-flash"),
    system: `
        ${systemPrompt}

        <context>
        ${ctx}
        </context>
        `,
    temperature: 0.5,
    messages,
  });
  return result.toAIStreamResponse();
}
