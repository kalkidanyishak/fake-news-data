"use client";

import { geminiPromptAction } from "@/app/geminiActions";
import { useState } from "react";

export default function GeminiChat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      // Call server action directly
      const result = await geminiPromptAction(input);
      alert('hey')
      setResponse(result);
    } catch (error) {
      setResponse("Error calling Gemini");
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your prompt"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>{response}</div>
      )}
    </div>
  );
}
