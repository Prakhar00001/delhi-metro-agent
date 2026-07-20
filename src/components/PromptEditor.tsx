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
    <div className="w-full flex flex-col gap-5 mt-4">
      
      {/* Dynamic Preferences Dropdown Drop Container */}
      <div className="relative w-full text-left">
        <label className="text-[13px] font-semibold text-gray-400 tracking-wide block mb-2">User Preference Profile</label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-12 px-4 rounded-xl border border-gray-800 bg-[#0F172A] text-left text-[14px] font-medium text-white flex items-center justify-between transition-all hover:border-gray-700"
        >
          <span className={value ? "text-white" : "text-gray-400"}>
            {selectedOption ? selectedOption.label : "Select strategy execution rules..."}
          </span>
          <svg width="16" height="16" className="text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-[74px] left-0 w-full bg-[#111827] border border-gray-800 rounded-xl shadow-2xl z-50 p-1">
            {PREFERENCE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className="w-full h-10 px-3 text-left text-[13px] text-gray-300 hover:bg-[#1F2937] hover:text-white rounded-lg transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Emerald Green Action Button Asset */}
      <button
        onClick={onSubmit}
        disabled={isLoading || disabled}
        className="w-full h-12 rounded-xl bg-[#52B788] hover:bg-[#40A074] disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-[#0F172A] text-[15px] font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-[#0F172A]/30 border-t-[#0F172A] rounded-full animate-spin" />
        ) : (
          <>
            {/* Minimalist Train Icon */}
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <rect x="4" y="3" width="16" height="14" rx="2" />
              <path d="M4 11h16M8 17l-2 3M16 17l2 3M12 7h.01" />
            </svg>
            <span>Get Route Strategy</span>
          </>
        )}
      </button>

    </div>
  );
}