"use server";

import { prompt } from "../lib/gemini";

export async function geminiPromptAction(message: string) {
  if (!message || message.trim().length === 0) {
    throw new Error("Message is required");
  }
  const response = await prompt(message);
  return response;
}
