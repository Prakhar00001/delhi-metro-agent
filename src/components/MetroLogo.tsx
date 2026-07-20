import React from "react";

export default function MetroLogo() {
  return (
    <div className="flex items-center gap-4 text-left select-none">
      <div className="w-12 h-12 flex items-center justify-center bg-[#34D399]/20 border border-[#34D399]/40 rounded-xl text-[#34D399]">
        {/* Abstract structural compass glyph matches the reference design asset */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <polygon points="12,6 16,16 12,13 8,16" fill="currentColor" />
        </svg>
      </div>
      <div className="flex flex-col">
        <h2 className="text-[22px] font-bold text-white tracking-tight leading-tight">Delhi Metro Commute AI Agent</h2>
        <span className="text-[13px] text-gray-400 font-medium tracking-wide mt-0.5">GTFS-Optimized Multi-Modal Guidance</span>
      </div>
    </div>
  );
}