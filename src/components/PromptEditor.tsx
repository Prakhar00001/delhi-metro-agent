"use client";
import React, { useState } from "react";

interface PreferenceSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const PREFERENCE_OPTIONS = [
  { label: "⚡ Fastest Route (Time Optimized)", value: "Fastest route optimizing track time" },
  { label: "🍃 Least Crowded (Comfort Priority)", value: "Avoid major congestion and highly crowded hubs" },
  { label: "🪙 Most Economical (Lowest Fare)", value: "Prioritize the most budget-friendly route" }
];

export default function PromptEditor({ value, onChange, onSubmit, isLoading, disabled }: PreferenceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = PREFERENCE_OPTIONS.find(opt => opt.value === value);

  return (
    <div className="w-full bg-metro-card border border-metro-border rounded-2xl shadow-premium p-4 flex flex-col md:flex-row items-center gap-4 transition-all">
      <div className="flex-1 relative w-full text-left">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-metro-muted block mb-1.5">Travel Strategy Preference</label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-12 px-4 rounded-xl border border-metro-border bg-metro-card text-left text-[14px] font-medium text-metro-dark flex items-center justify-between transition-all hover:border-metro-muted/40 focus:outline-none focus:shadow-focusRing"
        >
          <span className={value ? "text-metro-dark" : "text-metro-muted font-normal"}>
            {selectedOption ? selectedOption.label : "Select a travel priority strategy..."}
          </span>
          <svg width="16" height="16" className="w-4 h-4 text-metro-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-metro-card border border-metro-border rounded-xl shadow-premium z-50 p-1 overflow-hidden transition-all animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-0.5">
              {PREFERENCE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="w-full h-10 px-3 text-left text-[13px] text-metro-dark hover:bg-metro-canvas font-medium rounded-lg transition-colors flex items-center justify-between"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading || disabled}
        className="w-full md:w-auto md:self-end h-12 px-6 rounded-xl bg-metro-dark text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition-all hover:bg-metro-dark/90 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shrink-0"
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <span>Generate Strategy</span>
            <svg width="14" height="14" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}