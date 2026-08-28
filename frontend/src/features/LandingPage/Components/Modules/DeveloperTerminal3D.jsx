import { useState } from "react";
import confetti from "canvas-confetti";
import { Terminal, Copy, Check, Play, Sparkles, Code2, Database } from "lucide-react";
import { TiltCard } from "../../../../components/TiltCard";
import { GlassBadge } from "../../../../components/GlassBadge";

const queryPresets = [
  {
    id: "spatial",
    label: "Spatial Computing",
    query: "spatial computing OR agentic AI",
    latency: "11.4ms",
    response: {
      status: "success",
      query_id: "qry_88329_spatial",
      latency_ms: 11.4,
      data: {
        dominant_sentiment: "POSITIVE_SUPPORT",
        confidence_score: 0.994,
        narrative_velocity: "+342%/hr",
        active_communities: 18,
        key_influencers_mapped: 142,
        top_dialects: ["en-US", "hi-IN", "de-DE"],
      },
    },
  },
  {
    id: "climate",
    label: "Climate Resilience",
    query: "clean energy transition OR carbon capture",
    latency: "9.8ms",
    response: {
      status: "success",
      query_id: "qry_94102_climate",
      latency_ms: 9.8,
      data: {
        dominant_sentiment: "OPTIMISTIC_ENGAGED",
        confidence_score: 0.988,
        narrative_velocity: "+218%/hr",
        active_communities: 24,
        key_influencers_mapped: 89,
        top_dialects: ["en-UK", "fr-FR", "es-ES"],
      },
    },
  },
  {
    id: "finance",
    label: "Macro Economics",
    query: "central bank liquidity OR sovereign bonds",
    latency: "12.1ms",
    response: {
      status: "success",
      query_id: "qry_51208_macro",
      latency_ms: 12.1,
      data: {
        dominant_sentiment: "ANALYTICAL_CAUTION",
        confidence_score: 0.991,
        narrative_velocity: "+185%/hr",
        active_communities: 31,
        key_influencers_mapped: 210,
        top_dialects: ["en-US", "ja-JP", "de-DE"],
      },
    },
  },
];

export function DeveloperTerminal3D() {
  const [lang, setLang] = useState("curl");
  const [selectedPreset, setSelectedPreset] = useState(queryPresets[0]);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(true);

  const getCodeSnippet = () => {
    const q = selectedPreset.query;
    if (lang === "curl") {
      return `curl -X POST https://api.trinert.intelligence/v1/sentiment/stream \\
  -H "Authorization: Bearer nx_live_8f39b209a1" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "${q}",
    "timeframe": "24h",
    "metrics": ["sentiment", "velocity", "network_diffusion"],
    "granularity": "15m"
  }'`;
    }
    if (lang === "python") {
      return `from trinert_intelligence import TrinertClient

client = TrinertClient(api_key="tn_live_8f39b209a1")

# Stream live sentiment and narrative velocity
stream = client.sentiment.stream(
    query="${q}",
    timeframe="24h",
    detect_shifts=True,
    min_confidence=0.95
)

for signal in stream:
    print(f"[{signal.timestamp}] Shift: {signal.stance} | Velocity: +{signal.velocity}%")`;
    }
    return `import { Trinert } from "@trinert/sdk";

const trinert = new Trinert({ apiKey: "tn_live_8f39b209a1" });

// Subscribe to real-time narrative emergence
const subscription = trinert.narratives.subscribe({
  query: "${q}",
  onShift: (event) => {
    console.log(\`Emergence in \${event.community}: \${event.sentimentScore}%\`);
  }
});`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.8 },
        colors: ["#6366f1", "#06b6d4", "#8b5cf6", "#10b981"],
      });
    }, 500);
  };

  return (
    <section className="developer-section" id="developers" aria-labelledby="dev-heading">
      <div className="container">
        <div className="section-header-block">
          <p className="section-eyebrow">TRINERT / DEVELOPER API</p>
          <h2 id="dev-heading" className="section-main-title">
            BUILD ON THE
            <br />
            INTELLIGENCE LAYER.
          </h2>
          <p className="section-main-desc">
            Integrate real-time social sentiment, emerging narrative tracking, and community graph
            topologies directly into your applications with our sub-15ms SDKs.
          </p>
        </div>

        {/* Query Preset Selector Pills */}
        <div className="terminal-presets-row">
          <span className="preset-label">Preset Query:</span>
          {queryPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`preset-pill ${selectedPreset.id === preset.id ? "is-active" : ""}`}
              onClick={() => setSelectedPreset(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="terminal-container-outer">
          <TiltCard maxTilt={5} scale={1.01} className="developer-3d-terminal">
            {/* Terminal Header */}
            <div className="terminal-header-bar">
              <div className="terminal-traffic-lights">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>

              {/* Language Switcher Tabs */}
              <div className="terminal-lang-tabs">
                <button
                  type="button"
                  className={`lang-tab ${lang === "curl" ? "is-active" : ""}`}
                  onClick={() => setLang("curl")}
                >
                  cURL
                </button>
                <button
                  type="button"
                  className={`lang-tab ${lang === "python" ? "is-active" : ""}`}
                  onClick={() => setLang("python")}
                >
                  Python SDK
                </button>
                <button
                  type="button"
                  className={`lang-tab ${lang === "typescript" ? "is-active" : ""}`}
                  onClick={() => setLang("typescript")}
                >
                  TypeScript
                </button>
              </div>

              <div className="terminal-actions">
                <button
                  type="button"
                  className="terminal-action-btn"
                  onClick={handleCopy}
                  aria-label="Copy snippet"
                >
                  {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="terminal-code-body">
              <pre className="code-pre">
                <code>{getCodeSnippet()}</code>
              </pre>
            </div>

            {/* Terminal Footer Bar with Run Simulation */}
            <div className="terminal-footer-bar">
              <button
                type="button"
                className={`terminal-run-btn ${isRunning ? "is-loading" : ""}`}
                onClick={handleRun}
                disabled={isRunning}
              >
                <Play size={13} />
                <span>{isRunning ? "EXECUTING QUERY..." : "TEST RUN API QUERY"}</span>
              </button>

              <span className="terminal-telemetry-badge">
                ENDPOINT: api.trinert.intelligence/v1 &middot; TLS 1.3
              </span>
            </div>

            {/* Output Panel */}
            {showOutput && (
              <div className="terminal-output-panel">
                <div className="output-header">
                  <span className="output-dot" />
                  <span className="output-title">
                    HTTP 200 OK &middot; {selectedPreset.latency} (Simulated Response)
                  </span>
                </div>
                <pre className="output-pre">
                  <code>{JSON.stringify(selectedPreset.response, null, 2)}</code>
                </pre>
              </div>
            )}
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
