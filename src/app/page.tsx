"use client";
import React, { useState } from "react";
import MetroLogo from "@/components/MetroLogo";
import StationSelector from "@/components/StationSelector";
import PromptEditor from "@/components/PromptEditor";
import ResultsContainer from "@/components/ResultsContainer";

const DMRC_SAMPLE_STATIONS = [
  "Millennium City Centre Gurugram",
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
    
    // Programmatically construct the query for the AI agent backend
    const builtQuery = `Optimize route path from ${source} to ${destination}. Priority constraint: ${preference || "Fastest path"}`;

    try {
      const response = await fetch("http://127.0.0.1:5000/api/commute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: builtQuery,
          preferences: preference
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Critical Network Interception Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = !source || !destination;

  return (
    <main className="min-h-screen bg-[#FBFBFA] px-4 py-12 md:py-20 text-center flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl flex flex-col items-center gap-6">
        
        <header className="flex flex-col items-center gap-3 animate-in fade-in duration-500">
          <MetroLogo />
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-metro-dark mt-2 max-w-2xl leading-tight">
            Navigate the Delhi Metro via <span className="text-metro-accent font-extrabold">Autonomous Intelligence</span>
          </h1>
          <p className="text-metro-muted text-[15px] max-w-lg font-medium">
            Select your route parameters below to generate mathematically optimized transit strategies.
          </p>
        </header>

        <section className="w-full flex flex-col gap-4 mt-4">
          {/* Station Selector Row */}
          <div className="w-full bg-metro-card border border-metro-border rounded-2xl shadow-premium p-4 flex flex-col sm:flex-row gap-4">
            <StationSelector 
              label="Source Hub" 
              placeholder="Select origin station..." 
              stations={DMRC_SAMPLE_STATIONS} 
              value={source} 
              onChange={setSource} 
            />
            <div className="hidden sm:flex items-center justify-center pt-5 text-metro-muted/40">
              <svg width="20" height="20" className="w-5 h-5 min-w-[20px] min-h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <StationSelector 
              label="Destination Vector" 
              placeholder="Select target station..." 
              stations={DMRC_SAMPLE_STATIONS} 
              value={destination} 
              onChange={setDestination} 
            />
          </div>

          {/* New Preferences Dropdown and Trigger Panel */}
          <PromptEditor 
            value={preference}
            onChange={setPreference}
            onSubmit={triggerSearchPipeline}
            isLoading={isLoading}
            disabled={isButtonDisabled}
          />
        </section>

        <ResultsContainer data={result} />

      </div>
    </main>
  );
}