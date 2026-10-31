import { useState } from "react";
import { Languages, Sparkles } from "lucide-react";
import { useExplainMutation, BOARD_KEY } from "../store/apiSlice.js";
import { CANVAS } from "../config.js";

const MAX_CHARS = 500;

export default function AskForm({ onAsk }) {
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("hinglish");
  const [explain, { isLoading }] = useExplainMutation({
    fixedCacheKey: BOARD_KEY,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = question.trim();
    if (!text || isLoading) return;
    onAsk(text);
    explain({
      question: text,
      message: "",
      history: [],
      canvas: CANVAS,
      language, // "hinglish" | "english"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold">Ask a question</h2>
        <p className="text-sm opacity-80">
          Get a step-by-step visual explanation
        </p>
      </div>

      <div className="relative">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            // Enter = submit, Shift+Enter = nayi line
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form.requestSubmit();
            }
          }}
          maxLength={MAX_CHARS}
          disabled={isLoading}
          placeholder="Ask anything about Physics or Chemistry..."
          className="textarea w-full h-25 resize-none rounded-xl bg-base-200 pb-8 focus:border-primary focus:outline-2 focus:outline-primary/30"
        />
        <span className="absolute bottom-2 right-3 text-xs opacity-50">
          {question.length}/{MAX_CHARS}
        </span>
      </div>
   <div className="flex gap-2">
      <label className="select  rounded-xl bg-base-200">
        <Languages className="size-4 opacity-70" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={isLoading}
        >
          <option value="hinglish">Hinglish</option>
          <option value="english">English</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={isLoading || !question.trim()}
        className="btn btn-primary  rounded-xl shadow-md"
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <Sparkles size={16}/>
        )}
        {isLoading ? "Thinking..." : "Generate"}
      </button></div>
    </form>
  );
}