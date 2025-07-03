// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

export async function prompt(message: string): Promise<string> {
  try {
    const result = await model.generateContent("የሚቀጥለውን ዳታ ትንታኔ ያድርጉ እና ዜናው የውሸት ወይም እውነት ከሆነ ንገሩኝ። " + message);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Error generating response.";
  }
}
