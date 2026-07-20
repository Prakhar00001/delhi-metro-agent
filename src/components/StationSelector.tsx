"use client";
import React, { useState } from "react";

interface StationSelectorProps {
  label: string;
  placeholder: string;
  stations: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function StationSelector({ label, placeholder, stations, value, onChange }: StationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = stations.filter(s => s.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 relative flex flex-col gap-2 text-left">
      <label className="text-[12px] font-semibold text-gray-400 tracking-wide uppercase">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 px-4 rounded-xl border border-gray-800 bg-[#0F172A] text-left text-[14px] text-white flex items-center justify-between transition-all hover:border-gray-700"
      >
        <span className={value ? "text-white font-medium" : "text-gray-500"}>
          {value || placeholder}
        </span>
        <svg width="16" height="16" className="text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-[74px] left-0 w-full bg-[#111827] border border-gray-800 rounded-xl shadow-2xl z-50 p-2">
          <input
            type="text"
            placeholder="Filter stations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 text-[13px] bg-[#0F172A] border border-gray-800 text-white rounded-lg mb-1.5 focus:outline-none focus:border-emerald-500/50"
          />
          <div className="max-h-40 overflow-y-auto flex flex-col gap-0.5 custom-scrollbar">
            {filtered.map(station => (
              <button
                key={station}
                onClick={() => { onChange(station); setIsOpen(false); setSearch(""); }}
                className="w-full h-9 px-3 text-left text-[13px] text-gray-300 hover:bg-[#1F2937] hover:text-white rounded-lg transition-colors"
              >
                {station}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}