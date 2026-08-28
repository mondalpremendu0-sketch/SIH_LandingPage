import { useState, useEffect } from "react";
import { Radio, Sparkles, Filter, CheckCircle2, MessageSquare, ArrowUpRight, Cpu, PlusCircle } from "lucide-react";
import { TiltCard } from "../../../../components/TiltCard";
import { GlassBadge } from "../../../../components/GlassBadge";

const initialSignals = [
  {
    id: "sig-1",
    author: "@tech_frontier",
    timestamp: "Just now",
    platform: "X / Twitter",
    text: "The new spatial intelligence architecture completely changes how we map emergent social dynamics in real time.",
    sentiment: "POSITIVE",
    score: "98.7%",
    emotion: "Excitement",
    stance: "Strong Support",
    dialect: "EN (US)",
    category: "technology",
  },
  {
    id: "sig-2",
    author: "@global_economist",
    timestamp: "12s ago",
    platform: "Bluesky",
    text: "Reviewing the cross-border demographic indices. Decentralized verification is keeping noise ratios exceptionally low.",
    sentiment: "NEUTRAL",
    score: "94.2%",
    emotion: "Analytical",
    stance: "Objective",
    dialect: "EN (UK)",
    category: "policy",
  },
  {
    id: "sig-3",
    author: "@design_systems",
    timestamp: "28s ago",
    platform: "Mastodon",
    text: "Does the sentiment graph account for rapid sarcastic shifts during live broadcast events without overfitting?",
    sentiment: "INQUIRY",
    score: "91.8%",
    emotion: "Skepticism",
    stance: "Constructive Query",
    dialect: "DE (Berlin)",
    category: "technology",
  },
  {
    id: "sig-4",
    author: "@social_pulse",
    timestamp: "45s ago",
    platform: "Reddit",
    text: "Massive organic surge detected across Asian developer communities regarding open weights spatial foundation models.",
    sentiment: "POSITIVE",
    score: "99.1%",
    emotion: "High Velocity",
    stance: "Viral Propagation",
    dialect: "HI (IN)",
    category: "breaking",
  },
];

const poolOfInjectedSignals = [
  {
    id: "sig-5",
    author: "@ai_investor",
    timestamp: "Just now",
    platform: "X / Twitter",
    text: "Decentralized consensus metrics just crossed the 90% confidence threshold across Tier-1 financial nodes.",
    sentiment: "POSITIVE",
    score: "99.6%",
    emotion: "High Conviction",
    stance: "Bullish Consensus",
    dialect: "EN (US)",
    category: "breaking",
  },
  {
    id: "sig-6",
    author: "@data_sovereignty",
    timestamp: "Just now",
    platform: "Farcaster",
    text: "Zero-knowledge differential privacy guarantees verified with cryptographic zero-leakage proofs.",
    sentiment: "POSITIVE",
    score: "97.9%",
    emotion: "Validation",
    stance: "Technical Approval",
    dialect: "FR (Paris)",
    category: "policy",
  },
];

export function SocialPulseLiveFeed() {
  const [signals, setSignals] = useState(initialSignals);
  const [filter, setFilter] = useState("all");
  const [activeSignal, setActiveSignal] = useState(initialSignals[0]);
  const [injectIndex, setInjectIndex] = useState(0);

  const handleInjectSignal = () => {
    const nextSig = {
      ...poolOfInjectedSignals[injectIndex % poolOfInjectedSignals.length],
      id: `sig-injected-${Date.now()}`,
    };
    setInjectIndex((i) => i + 1);
    setSignals((prev) => [nextSig, ...prev.slice(0, 5)]);
    setActiveSignal(nextSig);
  };

  const filteredSignals =
    filter === "all"
      ? signals
      : signals.filter((s) => s.category === filter);

  return (
    <section className="social-pulse-section" id="network" aria-labelledby="pulse-heading">
      <div className="container">
        <div className="section-header-block">
          <div className="flex-header-row">
            <div>
              <p className="section-eyebrow">TRINERT / LIVE RADAR</p>
              <h2 id="pulse-heading" className="section-main-title">
                REAL-TIME SOCIAL PULSE
                <br />
                &amp; NEURAL INSPECTOR.
              </h2>
            </div>
            <div className="header-action-right">
              <button
                type="button"
                className="inject-signal-btn"
                onClick={handleInjectSignal}
              >
                <PlusCircle size={14} />
                <span>INJECT LIVE SIGNAL</span>
              </button>
            </div>
          </div>
          <p className="section-main-desc">
            Inspect live streaming social signals passing through our distributed edge ingestion pipeline.
            See multi-dimensional NLP inference, emotion classification, and stance recognition in action.
          </p>
        </div>

        <div className="pulse-interactive-layout">
          {/* LEFT: Live Stream List */}
          <div className="pulse-stream-column">
            <div className="stream-filter-tabs">
              <button
                type="button"
                className={`stream-tab-btn ${filter === "all" ? "is-active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All Signals ({signals.length})
              </button>
              <button
                type="button"
                className={`stream-tab-btn ${filter === "technology" ? "is-active" : ""}`}
                onClick={() => setFilter("technology")}
              >
                Technology
              </button>
              <button
                type="button"
                className={`stream-tab-btn ${filter === "breaking" ? "is-active" : ""}`}
                onClick={() => setFilter("breaking")}
              >
                Breaking Spikes
              </button>
              <button
                type="button"
                className={`stream-tab-btn ${filter === "policy" ? "is-active" : ""}`}
                onClick={() => setFilter("policy")}
              >
                Policy &amp; Research
              </button>
            </div>

            <div className="stream-cards-list">
              {filteredSignals.map((signal) => (
                <div
                  key={signal.id}
                  className={`stream-card-item ${activeSignal.id === signal.id ? "is-active" : ""}`}
                  onClick={() => setActiveSignal(signal)}
                >
                  <div className="stream-card-meta">
                    <span className="stream-card-author">{signal.author}</span>
                    <span className="stream-card-platform">{signal.platform}</span>
                    <span className="stream-card-time">{signal.timestamp}</span>
                  </div>
                  <p className="stream-card-text">{signal.text}</p>
                  <div className="stream-card-tags">
                    <span className={`signal-badge badge-${signal.sentiment.toLowerCase()}`}>
                      {signal.sentiment}
                    </span>
                    <span className="signal-badge-neutral">{signal.emotion}</span>
                    <span className="signal-badge-score">Conf: {signal.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: 3D Neural Inspector Card */}
          <div className="pulse-inspector-column">
            <TiltCard maxTilt={8} scale={1.02} className="neural-inspector-card">
              <div className="inspector-card-header">
                <div className="inspector-title-wrap">
                  <Cpu size={16} className="text-accent" />
                  <span className="inspector-title">NEURAL DECODER TELEMETRY</span>
                </div>
                <GlassBadge variant="accent" dot pulse>
                  ACTIVE INFERENCE
                </GlassBadge>
              </div>

              <div className="inspector-card-body">
                <div className="inspector-selected-text">
                  <MessageSquare size={15} className="quote-icon" />
                  <span>"{activeSignal.text}"</span>
                </div>

                <div className="telemetry-breakdown-matrix">
                  <div className="telemetry-box">
                    <span className="box-label">PRIMARY SENTIMENT</span>
                    <span className="box-val text-accent">{activeSignal.sentiment}</span>
                    <span className="box-sub">Polarity Index: +0.92</span>
                  </div>
                  <div className="telemetry-box">
                    <span className="box-label">EMOTIONAL STANCE</span>
                    <span className="box-val">{activeSignal.stance}</span>
                    <span className="box-sub">Tone: {activeSignal.emotion}</span>
                  </div>
                  <div className="telemetry-box">
                    <span className="box-label">DIALECT &amp; LANG</span>
                    <span className="box-val">{activeSignal.dialect}</span>
                    <span className="box-sub">Cross-lingual vector #42</span>
                  </div>
                  <div className="telemetry-box">
                    <span className="box-label">NEURAL CONFIDENCE</span>
                    <span className="box-val text-emerald">{activeSignal.score}</span>
                    <span className="box-sub">Error Margin: &plusmn;0.04%</span>
                  </div>
                </div>

                <div className="inspector-pipeline-steps">
                  <div className="step-item is-complete">
                    <CheckCircle2 size={13} className="step-check" />
                    <span>Raw Stream Tokenization (Zero-Drop Queue)</span>
                  </div>
                  <div className="step-item is-complete">
                    <CheckCircle2 size={13} className="step-check" />
                    <span>768-D Vector Embedding Computed</span>
                  </div>
                  <div className="step-item is-complete">
                    <CheckCircle2 size={13} className="step-check" />
                    <span>Multi-Stance Attention Weights Applied</span>
                  </div>
                  <div className="step-item is-complete">
                    <CheckCircle2 size={13} className="step-check" />
                    <span>Topological Graph Routing Active</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
