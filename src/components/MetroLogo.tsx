import React from "react";

export default function MetroLogo() {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      <div className="relative w-9 h-9 flex items-center justify-center bg-metro-dark rounded-xl transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-md">
        {/* Minimalist Graphic Element: Transit Line Vector intersecting a digital spark */}
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h9" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-metro-dark text-[15px] tracking-tight leading-tight">MetroSage</span>
        <span className="text-[11px] text-metro-muted tracking-wider uppercase font-medium">AI Agent</span>
      </div>
    </div>
  );
}