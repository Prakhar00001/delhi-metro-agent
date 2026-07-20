"use client";
import React from "react";

interface PromptEditorProps {
  query: string;
  setQuery: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function PromptEditor({ query, setQuery, onSubmit, isLoading }: PromptEditorProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full bg-metro-card border border-metro-border rounded-2xl shadow-premium p-3.5 transition-all focus-within:border-metro-muted/40 relative">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a commute scenario (e.g., 'Fastest route from Millennium City Centre to Rajiv Chowk avoiding high crowding delays')..."
        className="w-full min-h-[90px] max-h-[160px] resize-none bg-transparent text-[15px] text-metro-dark placeholder-metro-muted/70 font-medium focus:outline-none leading-relaxed"
      />
      
      <div className="flex items-center justify-between border-t border-metro-border/60 pt-3 mt-2">
        <div className="flex items-center gap-1.5 text-[12px] text-metro-muted font-medium">
          <kbd className="px-1.5 py-0.5 bg-metro-canvas border border-metro-border rounded text-[10px] font-mono shadow-sm">Enter</kbd>
          <span>to dispatch strategy solver</span>
        </div>
        
        <button
          onClick={onSubmit}
          disabled={isLoading || !query.trim()}
          className="h-9 px-4 rounded-xl bg-metro-dark text-white text-[13px] font-semibold flex items-center gap-2 transition-all hover:bg-metro-dark/90 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Generate Strategy</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}