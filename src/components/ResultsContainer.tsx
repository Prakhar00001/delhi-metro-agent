import React from "react";

interface ResultsContainerProps {
  data: {
    agent_response: string;
    metadata: {
      path: string[];
      cost?: number;
      fare?: number;
      duration?: number;
      optimized_duration?: number;
      crowded_nodes: string[];
    };
  } | null;
}

export default function ResultsContainer({ data }: ResultsContainerProps) {
  if (!data) return null;

  const { agent_response, metadata } = data;

  // Extract variables with structural safe fallback routing strings
  const displayDuration = metadata?.duration ?? metadata?.optimized_duration ?? "0";
  const displayCost = metadata?.cost ?? metadata?.fare ?? "0";
  const displayPath = metadata?.path ?? [];
  const displayCrowded = metadata?.crowded_nodes ?? [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Narrative Synthesis Column */}
      <div className="lg:col-span-7 bg-metro-card border border-metro-border rounded-2xl p-6 shadow-premium text-left flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <h3 className="text-[14px] font-bold text-metro-dark uppercase tracking-wider">AI Commute Advisor</h3>
        </div>
        <p className="text-[15px] text-metro-dark font-medium leading-relaxed whitespace-pre-line bg-metro-canvas/50 border border-metro-border/50 p-4 rounded-xl">
          {agent_response}
        </p>
      </div>

      {/* Graph Metrics Column */}
      <div className="lg:col-span-5 bg-metro-card border border-metro-border rounded-2xl p-6 shadow-premium text-left flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-4">
          <h3 className="text-[14px] font-bold text-metro-dark uppercase tracking-wider">Topology Analytics</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-metro-canvas border border-metro-border rounded-xl">
              <span className="text-[11px] uppercase font-bold text-metro-muted tracking-wider block">Estimated Run</span>
              <span className="text-2xl font-bold text-metro-dark tracking-tight">
                {displayDuration} <span className="text-[14px] font-medium text-metro-muted">min</span>
              </span>
            </div>
            <div className="p-3.5 bg-metro-canvas border border-metro-border rounded-xl">
              <span className="text-[11px] uppercase font-bold text-metro-muted tracking-wider block">Network Fare</span>
              <span className="text-2xl font-bold text-metro-dark tracking-tight">
                ₹{displayCost}
              </span>
            </div>
          </div>
        </div>

        {/* Graph Track Workflow Sequence */}
        <div className="flex flex-col gap-3">
          <span className="text-[11px] uppercase font-bold text-metro-muted tracking-wider">Dynamic Node Sequence</span>
          <div className="flex flex-col relative pl-5 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-metro-border">
            {displayPath.length > 0 ? (
              displayPath.map((station, idx) => {
                const isCrowded = displayCrowded.includes(station);
                return (
                  <div key={idx} className="flex items-center gap-3 py-1.5 relative group">
                    <div className={`absolute -left-[19px] w-2.5 h-2.5 rounded-full border-2 bg-white transition-colors z-10 ${isCrowded ? 'border-red-500 bg-red-50' : 'border-metro-dark'}`} />
                    <span className={`text-[13px] font-semibold tracking-tight ${isCrowded ? 'text-red-600 font-bold' : 'text-metro-dark'}`}>
                      {station}
                    </span>
                    {isCrowded && (
                      <span className="text-[9px] uppercase font-extrabold tracking-widest px-1.5 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded-md">
                        High Density
                      </span>
                    )}
                  </div>
                );
              })
            ) : (
              <span className="text-[13px] text-metro-muted italic">No station sequences tracked.</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}