🚇 Delhi Metro Commute AI Agent
An autonomous, full-stack transit optimization engine that transforms unstructured natural language travel requests into real-time, context-aware travel advisory strategies.

By separating deterministic path calculations from probabilistic linguistic parsing, the system couples static DMRC (Delhi Metro Rail Corporation) Graph Networks with dynamic environmental indices (live passenger crowding density streams, active system delays) through an advanced Large Language Model orchestration tier.

🏗️ Architectural Topology

[Phase 1: Input Ingestion]
Next.js 15 Client (page.tsx) captures the user text input and passenger preferences.

Dispatches an async JSON payload via POST /api/commute to the backend.

[Phase 2: Backend API Gateway]
Flask API Server (index.py) receives the payload on Port 5000.

Handles security protocol checks using configured cross-origin CORS policies.

[Phase 3: Parallel Processing Engines]

A. LLM Semantic Parser (Gemini 2.5 Flash): Translates conversational language, typos, or slang into exact, validated DMRC station node tokens.

B. Graph Matrix Modifier (NetworkX): Ingests the core transit system graph and applies mathematical weight penalties for active corridor delays or crowded station boundaries.

[Phase 4: Algorithmic Optimization]
Dijkstra Path Solver Engine: Executes an absolute shortest-path node search using the dynamically adjusted weights to route around crowd bottlenecks.

[Phase 5: Strategy Advisory Synthesis]
Gemini 2.5 Conversational Engine: Packages the raw path sequence array, fare rates, and durations into a natural, friendly narrative outlining platform transfers and last-mile connectivity.

[Phase 6: Reactive UI Hydration]
The Next.js client renders the descriptive advisory text alongside a color-coded, interactive station path workflow tracking high-congestion alerts.

⚡ Core Engineering Paradigms

1. Semantic Entity Disambiguation

Traditional routing engines crash when provided with typos or colloquial shortcuts (e.g., "Huda to Rajiv"). This system applies a high-speed inference pass using gemini-2.5-flash configured with a strict JSON Schema signature. It cross-references natural text strings against verified graph nodes, resolving anomalies and returning an explicit token map: {"source": "Node_A", "destination": "Node_B"}.

2. Reactive Cost-Weight Overrides

Instead of resolving static geographical coordinates, the backend mutates its graph edge metrics dynamically before each calculation cycle. The total weight metric ($W_{opt}$) across any line segment vector ($u, v$) is calculated as follows:

$$W_{opt}(u, v) = W_{base}(u, v) + D_{line} + C_u + C_v$$

Where:

$W_{base}$ is the static standard runtime weight metric between stations.$D_{line}$ represents the dynamic delay index (in minutes) pulled from the live status feed for that specific line.$C_u, C_v$ are penalty modifiers applied if passenger volume levels at node boundaries hit High or Extreme thresholds.

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

UI Assets: lucide-react tracking dynamic crowding indicators and transit status steps

⚙️ Development Environment Set Up

Backend Configuration

Backend Setup Commands

Go into the backend folder:

cd api

Create your virtual environment:

python -m venv venv

Activate the virtual environment:

venv\Scripts\activate

Install the backend dependencies:

pip install -r requirements.txt

Run the backend script:

python index.py

Frontend Setup Commands

(Open a separate terminal window first, then run these)

Go into the main project folder:

cd delhi-metro-agent

Install the frontend packages:

npm install

Start the frontend server:

npm run dev

Launch your browser window and navigate to  http://localhost:3000 to test your localized execution pipeline.


💡 Key Design Takeaways


Algorithmic Guardrails: 

Pure LLM engines are inherently bad at complex graph pathfinding calculations. Delegating core path resolution to NetworkX and employing the LLM exclusively for linguistic translation and contextual advisory completely removes execution errors.

Decoupled State Hydration: 

Splitting client dashboard layouts from the heavy Python graph compilation matrices guarantees rapid UI updates and maintains a scalable microservice boundary footprint.


