🚇 Delhi Metro Commute AI Agent
An autonomous, full-stack transit optimization engine that transforms unstructured natural language travel requests into real-time, context-aware travel advisory strategies.

By separating deterministic path calculations from probabilistic linguistic parsing, the system couples static DMRC (Delhi Metro Rail Corporation) Graph Networks with dynamic environmental indices (live passenger crowding density streams, active system delays) through an advanced Large Language Model orchestration tier.

🏗️ Architectural Topology

                  [ NEXT.JS 15 FRONTEND DASHBOARD ]
                                 │
                         (POST /api/commute)
                                 ▼
                    [ FLASK CORE ROUTER ENGINE ]
                                 │
        ┌────────────────────────┴────────────────────────┐
        ▼                                                 ▼
[ LLM EXTRACTION LAYER ]                      [ GRAPH DATA MATRIX TIER ]
  - Gemini 2.5 Flash                            - NetworkX Modeling Layer
  - Semantic Disambiguation                     - Live Feeds Ingestion (Delays/Crowds)
  - String → Node Registry Mapping               - Dynamic Edge-Weight Recalculations
        │                                                 │
        └────────────────────────┬────────────────────────┘
                                 ▼
                     [ DIJKSTRA PATH SOLVER ]
                                 │
                       (Optimized Node Array)
                                 ▼
                    [ LLM SYNTHESIS LAYER ]
                      - Gemini 2.5 Conversational Engine
                      - First/Last-Mile Logic Integration
                                 │
                                 ▼
               [ HYDRATED REACT STATE DISPLAY SCREEN ]
    
⚡ Core Engineering Paradigms
1. Semantic Entity Disambiguation
Traditional routing engines crash when provided with typos or colloquial shortcuts (e.g., "Huda to Rajiv"). This system applies a high-speed inference pass using gemini-2.5-flash configured with a strict JSON Schema signature. It cross-references natural text strings against verified graph nodes, resolving anomalies and returning an explicit token map: {"source": "Node_A", "destination": "Node_B"}.

2. Reactive Cost-Weight Overrides
Instead of resolving static geographical coordinates, the backend mutates its graph edge metrics dynamically before each calculation cycle. The total weight metric (W 
opt
​
 ) across any line segment vector (u,v) is calculated as follows:

W 
opt
​
 (u,v)=W 
base
​
 (u,v)+D 
line
​
 +C 
u
​
 +C 
v
​
 
Where:

W 
base
​
  is the static standard runtime weight metric between stations.

D 
line
​
  represents the dynamic delay index (in minutes) pulled from the live status feed for that specific line.

C 
u
​
 ,C 
v
​
  are penalty modifiers applied if passenger volume levels at node boundaries hit High or Extreme thresholds.

3. Dijkstra Graph Node Search
Once the edge weight arrays are optimized, the system triggers a localized shortest-path search using the NetworkX library. This ensures that the system preserves mathematical determinism for path selection, entirely avoiding the hallucination risks common in pure-LLM routing layouts.

🛠️ Technological Footprint
Backend Microservice Engine (/api)
Core Framework: Flask with native Flask-CORS for cross-origin resource access management.

Graph Computations: networkx handling high-performance path layout matrices.

LLM Intelligence Layer: google-genai (Google AI Platform SDK) targeting low-latency models (gemini-2.5-flash).

Frontend Interface Dashboard (/src)
Core Infrastructure: Next.js 15 (App Router architecture) utilizing client-side state hydration loops ('use client').

Styling Architecture: Tailwind CSS configured with a dark-mode UI optimized for scanning transit details.

UI Assets: lucide-react tracking dynamic crowding indicators and transit status steps.

⚙️ Development Environment Set Up
Backend Configuration
Move into the backend microservice root directory:

Bash
cd api
Build your local isolated virtual environment block:

Bash
python -m venv venv
source venv/Scripts/activate  # On Windows: venv\Scripts\activate
Install the required dependency tree components:

Bash
pip install -r requirements.txt
Set up your authentication variable inside your current terminal session context:

PowerShell
# Windows PowerShell Format
$env:GEMINI_API_KEY="YOUR_GOOGLE_AI_STUDIO_API_KEY"
Boot up the Flask network listener process:

Bash
python index.py
The runtime layer will initialize the core network matrices and sit listening on port 5000.

Frontend Dashboard Configuration
Open a new separate terminal instance and return to the application project root folder:

Bash
cd delhi-metro-agent
Ingest the required package bundles:

Bash
npm install
Spin up the localized compiler engine:

Bash
npm run dev
Launch your browser window and navigate to http://localhost:3000 to test your localized execution pipeline.

📋 API Protocol Specification
Journey Calculation Route
Endpoint: POST [http://127.0.0.1:5000/api/commute](http://127.0.0.1:5000/api/commute)

Payload Signature (application/json):

JSON
{
  "query": "Fastest route from Millennium City Centre Gurugram to Rajiv Chowk right now",
  "preferences": "Prefer low crowding thresholds."
}
Response Matrix Layout (200 OK):

JSON
{
  "route_computed": true,
  "agent_response": "Hey there! I've mapped out your transit path... Avoid the central terminal platforms due to minor passenger line backups...",
  "metadata": {
    "path": ["Millennium City Centre Gurugram", "IFFCO Chowk", "...", "Rajiv Chowk"],
    "cost": 60,
    "duration": 42,
    "crowded_nodes": ["Rajiv Chowk"]
  }
}
💡 Key Design Takeaways
Algorithmic Guardrails: Pure LLM engines are inherently bad at complex graph pathfinding calculations. Delegating core path resolution to NetworkX and employing the LLM exclusively for linguistic translation and contextual advisory completely removes execution errors.

Decoupled State Hydration: Splitting client dashboard layouts from the heavy Python graph compilation matrices guarantees rapid UI updates and maintains a scalable microservice boundary footprint.
