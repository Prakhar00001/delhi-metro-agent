"use client";
import React, { useState } from "react";
import MetroLogo from "@/components/MetroLogo";
import StationSelector from "@/components/StationSelector";
import PromptEditor from "@/components/PromptEditor";
import ResultsContainer from "@/components/ResultsContainer";

const DMRC_SAMPLE_STATIONS = [
  "Millennium City Centre",
  "IFFCO Chowk",
  "MG Road",
  "Sikanderpur",
  "Rajiv Chowk",
  "Kashmere Gate",
  "Noida Sector 62",
  "Hauz Khas"
];

export default function Home() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [preference, setPreference] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const triggerSearchPipeline = async () => {
    if (!source || !destination) return;
    setIsLoading(true);
    
    const builtQuery = `Optimize route path from ${source} to ${destination}. Priority constraint: ${preference || "Fastest path"}`;

    try {
      const response = await fetch("http://127.0.0.1:5000/api/commute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: builtQuery, preferences: preference })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Critical API Execution Crash:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070A13] px-4 py-12 flex flex-col items-center justify-start font-sans">
      <div className="w-full max-w-xl flex flex-col gap-8">
        
        {/* Brand Top Header Block */}
        <header className="w-full border-b border-gray-900 pb-5">
          <MetroLogo />
        </header>

        {/* Unified Journey Card Matching Reference Geometry */}
        <section className="w-full bg-[#0F172A]/70 border border-gray-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          
          {/* Card Label */}
          <div className="flex items-center gap-2 text-[#9CA3AF] text-[13px] font-bold tracking-widest uppercase mb-6">
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Journey Details</span>
          </div>

          {/* Dynamic Selection Dropdown Controls */}
          <div className="flex flex-col gap-4">
            <StationSelector 
              label="Source Hub Location" 
              placeholder="Choose boarding point..." 
              stations={DMRC_SAMPLE_STATIONS} 
              value={source} 
              onChange={setSource} 
            />
            <StationSelector 
              label="Destination Target Vector" 
              placeholder="Choose exit point..." 
              stations={DMRC_SAMPLE_STATIONS} 
              value={destination} 
              onChange={setDestination} 
            />
          </div>

          {/* Execution Strategy Rules Interface Trigger */}
          <PromptEditor 
            value={preference}
            onChange={setPreference}
            onSubmit={triggerSearchPipeline}
            isLoading={isLoading}
            disabled={!source || !destination}
          />
        </section>

        {/* Analytics Yield View Display Output */}
        <ResultsContainer data={result} />

      </div>
    </main>
  );
}