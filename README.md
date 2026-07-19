🚇 MetroSage AI: 

Autonomous Delhi-NCR Commute Ingestion EngineTransform chaotic daily gridlock into mathematically optimized, context-aware travel transit strategies using generative intelligence and deterministic graph topology networks.



🧠 Core Engineering Paradigms

Linguistic Parsing vs. Deterministic Routing: Natural language inputs often contain regional slang or typos (e.g., "Rajiv to Huda avoiding crowd"). The AI tier isolates the source/destination entities using gemini-2.5-flash with structured JSON output schemas, while NetworkX manages the structural graph geometry.

Reactive Cost-Weight Edge Shifting: 

Before executing a path search, the edge array weights mutate mathematically according to live congestion telemetry and track infrastructure delays:

$$W_{opt}(u, v) = W_{base}(u, v) + D_{line} + C_u + C_v$$

Predictive First/Last Mile Hydration:

Generative synthesis automatically appends multi-modal contextual guidance for final transfers, calculating accurate localized transport vectors (E-Rickshaws, auto-rickshaws, feeder buses).

✨ Key Features

🗣️ Natural Language Intent Parsing: Submit complex, unstructured conversational requests containing contextual nuances directly.

🚦 Dynamic Path Congestion Overrides: Mathematically bypass highly congested hubs (like Rajiv Chowk or Kashmere Gate) during localized peak rushes.

🎨 Tailwind Dashboard Architecture: High-speed, dark-themed responsive user interface optimized to trace matching color-coded DMRC line indicators.

🤖 State-Preserving Interaction Storage: Persistent session memory provides rapid suggestions tailored around historical travel tracks.

🛠️ Technological Footprint

Backend Microservice (/api)

Core API Layer: Python Flask with isolated execution threads.

Graph Engine: NetworkX handling core Dijkstra matrices.

Data Pipelines: Pandas managing static node registry lookups.

AI Orchestration: Official google-genai SDK interface layer.

Frontend Dashboard (/src)

App Framework: Next.js 15 configured with App Router structure.

Styling Engine: Tailwind CSS providing low-friction UI components.

Icon Sets: Lucide React tracking state change indicators.

⚙️ Development Environment Setup

🐍 Backend Service ConfigurationEnsure you have Python 3.10+ available locally, then run the setup steps:

cd api
python -m venv venv

Activate the environment based on your current operating system platform:

Windows PowerShell:PowerShellSet-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.\venv\Scripts\activate

Linux / macOS:Bashsource venv/bin/activate

Install dependencies, provision your authorization token, and fire up the microservice listener layer:

Bash: pip install flask flask-cors google-genai networkx pandas


$env:GEMINI_API_KEY="AIzaSyYourActualStudioKeyGoesHere"
python index.py


⚛️ Frontend UI Configuration

Open a separate concurrent terminal shell window to install the Node bundles and launch the local compiler server:

Bash: cd delhi-metro-agent
npm install
npm run dev

Navigate your local web browser tool over to http://localhost:3000 to interact with the full-stack setup.


💡 Key Design Takeaways[!IMPORTANT]

Algorithmic Guardrails:

Large Language Models are structurally incapable of executing deterministic path matrix optimizations efficiently. Isolating the LLM layers exclusively to structural intent extraction and narrative summary generation provides maximum system reliability.

