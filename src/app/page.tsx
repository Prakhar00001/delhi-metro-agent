'use client';

import React, { useState } from 'react';
import { Compass, Train, CircleAlert, Landmark, UserCheck, RefreshCw } from 'lucide-react';

interface RouteMetadata {
  path: string[];
  cost: number;
  duration: number;
  crowded_nodes: string[];
}

export default function Dashboard() {
  const [userInput, setUserInput] = useState('Go from Huda City Centre to Rajiv Chowk now');
  const [preferences, setPreferences] = useState('Prefer low crowding.');
  const [loading, setLoading] = useState(false);
  const [agentResponse, setAgentResponse] = useState('');
  const [meta, setMeta] = useState<RouteMetadata | null>(null);

  const calculateRoute = async () => {
    setLoading(true);
    setMeta(null);
    try {
      const res = await fetch('/api/commute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userInput, preferences })
      });
      const data = await res.json();
      setAgentResponse(data.agent_response || 'Error running analysis generation.');
      if (data.route_computed) setMeta(data.metadata);
    } catch {
      setAgentResponse('API request failure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 max-w-6xl mx-auto space-y-8">
      <header className="border-b border-slate-800 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 text-slate-950 p-2 rounded-lg"><Compass size={24} /></div>
          <div>
            <h1 className="text-xl font-bold">Delhi Metro Commute AI Agent</h1>
            <p className="text-xs text-slate-400">GTFS-Optimized Multi-Modal Guidance</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-5 rounded-xl space-y-4 h-fit border border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Landmark size={14} /> Journey Details
          </h2>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Commuter Request</label>
            <textarea value={userInput} onChange={e => setUserInput(e.target.value)} rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">User Preference Profile</label>
            <input type="text" value={preferences} onChange={e => setPreferences(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500" />
          </div>
          <button onClick={calculateRoute} disabled={loading} className="w-full bg-emerald-500 text-slate-950 font-semibold py-2 rounded-lg text-sm hover:bg-emerald-400 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
            {loading ? <RefreshCw className="animate-spin" size={16} /> : <Train size={16} />} Get Route Strategy
          </button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {agentResponse ? (
            <>
              {meta && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
                    <div className="text-xs text-slate-400">Duration</div>
                    <div className="text-lg font-bold text-emerald-400">{meta.duration} mins</div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
                    <div className="text-xs text-slate-400">Total Cost</div>
                    <div className="text-lg font-bold text-emerald-400">₹{meta.cost}</div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center">
                    <div className="text-xs text-slate-400">Stops</div>
                    <div className="text-lg font-bold text-emerald-400">{meta.path.length} Stations</div>
                  </div>
                </div>
              )}

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                <h3 className="font-semibold text-sm border-b border-slate-800 pb-2 text-slate-300">AI Strategy Advisory</h3>
                <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{agentResponse}</p>
              </div>

              {meta && (
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                  <h3 className="font-semibold text-sm text-slate-300">Dynamic Itinerary Stops Map</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    {meta.path.map((station, i) => {
                      const busy = meta.crowded_nodes.includes(station);
                      return (
                        <React.Fragment key={i}>
                          <div className={`px-2 py-1 text-xs border rounded font-medium flex items-center gap-1 ${busy ? 'bg-amber-950/40 border-amber-800 text-amber-300' : 'bg-slate-950 border-slate-800'}`}>
                            {station} {busy && <CircleAlert size={12} className="text-amber-400" />}
                          </div>
                          {i < meta.path.length - 1 && <span className="text-slate-600 text-xs">→</span>}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="border border-dashed border-slate-800 h-64 rounded-xl flex flex-col items-center justify-center text-slate-500 text-sm p-4">
              <Compass size={32} className="text-slate-700 mb-2" />
              Provide journey destinations to invoke the transit agent framework.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}