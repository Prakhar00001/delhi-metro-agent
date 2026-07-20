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

  const filteredStations = stations.filter(station =>
    station.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 relative flex flex-col gap-1.5 text-left">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-metro-muted">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 px-4 rounded-xl border border-metro-border bg-metro-card text-left text-[14px] font-medium text-metro-dark flex items-center justify-between transition-all hover:border-metro-muted/40 focus:outline-none focus:shadow-focusRing"
      >
        <span className={value ? "text-metro-dark" : "text-metro-muted font-normal"}>
          {value || placeholder}
        </span>
        <svg className="w-4 h-4 text-metro-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-metro-card border border-metro-border rounded-xl shadow-premium z-50 p-2 overflow-hidden transition-all animate-in fade-in slide-in-from-top-2 duration-200">
          <input
            type="text"
            placeholder="Search matching stations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 text-[13px] bg-metro-canvas border border-metro-border rounded-lg mb-2 focus:outline-none focus:border-metro-accent/50"
          />
          <div className="max-h-48 overflow-y-auto flex flex-col gap-0.5 custom-scrollbar">
            {filteredStations.length > 0 ? (
              filteredStations.map((station) => (
                <button
                  key={station}
                  onClick={() => {
                    onChange(station);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className="w-full h-9 px-3 text-left text-[13px] text-metro-dark hover:bg-metro-canvas font-medium rounded-lg transition-colors flex items-center justify-between"
                >
                  {station}
                </button>
              ))
            ) : (
              <span className="text-[12px] text-metro-muted px-3 py-2 italic">No station matches detected.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}