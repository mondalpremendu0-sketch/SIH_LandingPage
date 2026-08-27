import { useState, useId } from "react";
import { Sliders, Sparkles, MessageSquare, Zap, Activity, BarChart3, AlertCircle } from "lucide-react";
import { TiltCard } from "../../../../components/TiltCard";
import { GlassBadge } from "../../../../components/GlassBadge";

const scenarioPresets = [
  { id: "organic", label: "Equilibrium Baseline", val: 50, stance: "Balanced (52% Positive)", quote: "Public sentiment is in constructive equilibrium with steady engagement." },
  { id: "wave", label: "Support Wave (+68%)", val: 78, stance: "Strong Support (84% Positive)", quote: "Community enthusiastically rallies behind the launch of decentralized inference." },
  { id: "viral", label: "Viral Surge (+34%)", val: 92, stance: "Hyper-Viral (94% Excitement)", quote: "Exponential cross-platform reposting with 418k mentions in under 45 minutes." },
  { id: "skeptic", label: "Skepticism Spike", val: 28, stance: "Critical Inquiry (62% Skepticism)", quote: "Technical audit debates surface regarding latency and edge privacy proofs." },
];

export function Sentiment3DView() {
  const [timelineVal, setTimelineVal] = useState(65);
  const [activePreset, setActivePreset] = useState("organic");
  const gradientId = useId();

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setTimelineVal(val);
    if (val > 85) setActivePreset("viral");
    else if (val > 70) setActivePreset("wave");
    else if (val < 40) setActivePreset("skeptic");
    else setActivePreset("organic");
  };

  const currentPresetData = scenarioPresets.find((p) => p.id === activePreset) || scenarioPresets[0];

  // Dynamic SVG Waveform Calculation based on timelineVal
  const p1y = 90 - (timelineVal - 50) * 0.4;
  const p2y = 120 - (timelineVal - 50) * 0.9;
  const p3y = 70 - (timelineVal - 50) * 1.1;
  const p4y = 95 - (timelineVal - 50) * 0.6;
  const p5y = 115 - (timelineVal - 50) * 0.8;
  const p6y = 65 - (timelineVal - 50) * 1.2;
  const p7y = 80 - (timelineVal - 50) * 0.7;

  const dynamicPath = `M 30,${p1y} C 80,${p2y} 130,${p3y} 180,${p4y} C 230,${p5y} 280,${p6y} 330,${p7y} C 380,${p2y} 430,${p3y} 480,${p6y} C 510,${p5y} 530,${p7y} 550,${p1y}`;
  const dynamicArea = `${dynamicPath} L 550,220 L 30,220 Z`;

  return (
    <div className="intelligence-3d-pillar-layout">
      {/* LEFT: 3D Topology Waveform Simulation */}
      <div className="intelligence-visual-column">
        <TiltCard maxTilt={6} scale={1.01} className="sentiment-3d-canvas-wrap">
          <div className="sentiment-canvas-header">
            <div className="canvas-header-left">
              <span className="canvas-pulse-indicator" />
              <span className="canvas-header-title">REAL-TIME SENTIMENT TOPOLOGY FIELD</span>
            </div>
            <GlassBadge variant="cyan" dot pulse>
              LIVE INFERENCE &middot; 99.4%
            </GlassBadge>
          </div>

          <div className="sentiment-canvas-body">
            <svg
              viewBox="0 0 580 240"
              className="sentiment-canvas"
              role="img"
              aria-label="Sentiment waveform graph"
            >
              <defs>
                <linearGradient id={`${gradientId}-waveFill`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(79, 70, 229, 0.28)" />
                  <stop offset="50%" stopColor="rgba(6, 182, 212, 0.1)" />
                  <stop offset="100%" stopColor="rgba(79, 70, 229, 0)" />
                </linearGradient>
                <linearGradient id={`${gradientId}-waveStroke`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>

              {/* Background Reference Grid */}
              <g className="sentiment-grid">
                <line x1="30" y1="40" x2="550" y2="40" />
                <line x1="30" y1="90" x2="550" y2="90" />
                <line x1="30" y1="140" x2="550" y2="140" />
                <line x1="30" y1="190" x2="550" y2="190" />
              </g>

              {/* Dynamic Waveform Area & Stroke */}
              <path d={dynamicArea} fill={`url(#${gradientId}-waveFill)`} />
              <path
                d={dynamicPath}
                fill="none"
                stroke={`url(#${gradientId}-waveStroke)`}
                className="sentiment-primary"
              />

              {/* Critical Signal Event Pins */}
              <g className="event-marker" transform="translate(180, 50)">
                <line x1="0" y1="0" x2="0" y2="140" className="event-line" />
                <g className="event-badge">
                  <rect x="-42" y="-24" width="84" height="22" rx="6" />
                  <text x="0" y="-9" textAnchor="middle">SURGE +34%</text>
                </g>
                <circle cx="0" cy="45" r="4.5" className="graph-point pulse-point" />
              </g>

              <g className="event-marker" transform="translate(330, 45)">
                <line x1="0" y1="0" x2="0" y2="145" className="event-line" />
                <g className="event-badge">
                  <rect x="-48" y="-24" width="96" height="22" rx="6" />
                  <text x="0" y="-9" textAnchor="middle">VIRAL SPILLOVER</text>
                </g>
                <circle cx="0" cy="20" r="4.5" className="graph-point pulse-point" />
              </g>

              {/* Timeline Axis Labels */}
              <g className="sentiment-timeline">
                <text x="35" y="215">09:00</text>
                <text x="140" y="215">12:00</text>
                <text x="250" y="215">15:00</text>
                <text x="360" y="215">18:00</text>
                <text x="470" y="215">21:00</text>
                <text x="540" y="215">NOW</text>
              </g>
            </svg>
          </div>

          {/* Interactive Simulation Controls Bar */}
          <div className="sentiment-interactive-bar">
            <div className="simulation-slider-wrap">
              <Sliders size={15} className="text-accent" />
              <span className="slider-label">Scrub Timeline Simulation:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={timelineVal}
                onChange={handleSliderChange}
                className="scenario-scrubber"
                aria-label="Timeline sentiment scrubber"
              />
              <span className="slider-value">{timelineVal}%</span>
            </div>

            <div className="simulation-presets">
              {scenarioPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={`preset-btn ${activePreset === preset.id ? "is-active" : ""}`}
                  onClick={() => {
                    setActivePreset(preset.id);
                    setTimelineVal(preset.val);
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </TiltCard>
      </div>

      {/* RIGHT: Dynamic Exemplar & Nuanced Spectrum Matrix */}
      <div className="intelligence-content-column">
        <div className="pillar-text-content">
          <p className="eyebrow">01 / SENTIMENT INTELLIGENCE</p>
          <h2 className="pillar-headline">
            MEASURE WHAT
            <br />
            PEOPLE TRULY FEEL.
          </h2>
          <p className="pillar-desc">
            Move beyond binary positive/negative sentiment. NEXUS maps fine-grained emotion vectors,
            sarcasm nuances, credibility anchors, and momentum shifts across 140+ global dialects.
          </p>

          {/* Dynamic Timeline Exemplar Card */}
          <div className="timeline-exemplar-card">
            <div className="exemplar-header">
              <MessageSquare size={13} className="text-accent" />
              <span className="exemplar-time">LIVE SNAPSHOT AT T-{timelineVal}M</span>
              <span className="exemplar-stance text-accent">{currentPresetData.stance}</span>
            </div>
            <p className="exemplar-quote">&ldquo;{currentPresetData.quote}&rdquo;</p>
          </div>

          {/* Nuanced Emotion Spectrum Matrix */}
          <div className="emotion-spectrum-matrix">
            <div className="spectrum-card">
              <div className="spectrum-header">
                <span className="spectrum-dot dot-positive" />
                <span className="spectrum-name">Support &amp; Excitement</span>
              </div>
              <span className="spectrum-pct">{timelineVal > 60 ? "74.8%" : "48.2%"}</span>
            </div>
            <div className="spectrum-card">
              <div className="spectrum-header">
                <span className="spectrum-dot dot-neutral" />
                <span className="spectrum-name">Inquiry &amp; Constructive Debate</span>
              </div>
              <span className="spectrum-pct">19.4%</span>
            </div>
            <div className="spectrum-card">
              <div className="spectrum-header">
                <span className="spectrum-dot dot-negative" />
                <span className="spectrum-name">Skepticism &amp; Concern</span>
              </div>
              <span className="spectrum-pct">{timelineVal < 40 ? "42.6%" : "5.8%"}</span>
            </div>
          </div>

          <div className="pillar-meta-grid">
            <div className="meta-cell">
              <span className="meta-title">LATENCY</span>
              <span className="meta-val">&lt; 14 MS / INFERENCE</span>
            </div>
            <div className="meta-cell">
              <span className="meta-title">CONFIDENCE</span>
              <span className="meta-val">99.4% CALIBRATED</span>
            </div>
            <div className="meta-cell">
              <span className="meta-title">GRANULARITY</span>
              <span className="meta-val">TOKEN &middot; SENTENCE &middot; TOPIC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
