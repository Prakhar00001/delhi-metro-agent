import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
import networkx as nx

# Absolute import strategy ensures Vercel handles local modular packages perfectly
from data.network import get_delhi_metro_graph, calculate_fare
from data.live_feeds import get_live_metro_status

app = Flask(__name__)
CORS(app) # Forces cross-origin access protection to let Next.js bind seamlessly

client = genai.Client()

@app.route("/api/commute", methods=["POST"])
def process_commute():
    body = request.json or {}
    
    # FIX: Aligned to read the "query" key directly sent by Next.js form states
    user_input = body.get("query") or body.get("input") or ""
    user_preferences = body.get("preferences", "None specified.")
    
    if not user_input:
        return jsonify({"error": "Prompt field input is empty. Provide a commuter query."}), 400

    G = get_delhi_metro_graph()
    if len(G.nodes) == 0:
        return jsonify({"error": "GTFS data missing or unparsed. Check your api/data/gtfs folder."}), 500
        
    live_status = get_live_metro_status()
    all_stations = sorted(list(G.nodes))
    
    extraction_prompt = f"""
    Analyze the user's request: "{user_input}"
    Match it to these official DMRC stations:
    {all_stations}
    Return JSON format strictly: {{"source": "Exact Station Name", "destination": "Exact Station Name"}}
    """
    
    try:
        extraction_response = client.models.generate_content(
            model='gemini-2.5-pro',
            contents=extraction_prompt,
            config=types.GenerateContentConfig(response_mime_type="application/json", temperature=0.1)
        )
        extracted = json.loads(extraction_response.text)
    except Exception as e:
        return jsonify({"error": f"LLM Match Failed: {str(e)}"}), 500

    source = extracted.get("source")
    destination = extracted.get("destination")

    if not source or not destination or source not in G or destination not in G:
        return jsonify({
            "agent_response": f"I couldn't map that to official station registries. Make sure you match names from your dataset (Extracted: {source} -> {destination})",
            "route_computed": False
        })

    # Recalculate edge weights using graph network paths combined with delay indices
    for u, v, data in G.edges(data=True):
        edge_line = data.get("primary_line", "Unknown")
        delay = live_status.get("delays", {}).get(edge_line, {}).get("delay_mins", 0)
        crowd_u = 5 if live_status.get("crowding", {}).get(u, "") in ["High", "Extreme"] else 0
        crowd_v = 5 if live_status.get("crowding", {}).get(v, "") in ["High", "Extreme"] else 0
        data["optimized_weight"] = data.get("weight", 2) + delay + crowd_u + crowd_v

    try:
        path = nx.shortest_path(G, source=source, target=destination, weight="optimized_weight")
        optimized_duration = nx.shortest_path_length(G, source=source, target=destination, weight="optimized_weight")
    except Exception:
        return jsonify({"error": "Path calculation break between structural network nodes."}), 500

    station_count = len(path)
    fare = calculate_fare(station_count)
    
    steps = [{"from": path[i], "to": path[i+1], "line": G[path[i]][path[i+1]].get("primary_line", "Metro Link")} for i in range(len(path)-1)]

    reasoning_payload = {
        "source_station": source,
        "destination_station": destination,
        "path_sequence": path,
        "detailed_steps": steps,
        "total_stops": station_count,
        "total_duration_mins": optimized_duration,
        "fare_inr": fare,
        "live_anomalies": live_status,
        "preferences": user_preferences
    }

    final_synthesis_prompt = f"""
    You are the Delhi Metro Commute Agent. Using this computed optimal structural itinerary route:
    {json.dumps(reasoning_payload, indent=2)}

    Explain the path friendly like a transit buddy. Detail where interchanges occur, alert them of delays/crowds, reflect their habits ({user_preferences}), and provide clear guidance on first/last-mile transit options (rickshaws/autos).
    """

    synthesis_response = client.models.generate_content(
        model='gemini-2.5-pro',
        contents=final_synthesis_prompt,
        config=types.GenerateContentConfig(temperature=0.2)
    )

    return jsonify({
        "agent_response": synthesis_response.text,
        "route_computed": True,
        "metadata": {
            "path": path,
            "cost": fare,
            "duration": optimized_duration,
            "crowded_nodes": [n for n in path if live_status.get("crowding", {}).get(n) in ["High", "Extreme"]]
        }
    })

if __name__ == '__main__':
    app.run(port=5000)