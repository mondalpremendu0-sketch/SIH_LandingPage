import { useState } from "react";
import { TrendingUp, Flame, Zap, ArrowUpRight, Compass, Activity, BarChart2, ShieldAlert } from "lucide-react";
import { TiltCard } from "../../../../components/TiltCard";
import { GlassBadge } from "../../../../components/GlassBadge";

const trendingTopics = [
  {
    id: "t1",
    tag: "#SpatialSocial2026",
    label: "Spatial Social & 3D Intelligence",
    velocity: "+418%/hr",
    phase: "SURGING",
    score: "98.4",
    volume: "1.42M mentions",
    reach: "18.6M impressions",
    color: "#4f46e5",
    sparkline: [12, 18, 25, 45, 68, 92, 140, 210, 320, 418],
    sentimentBias: "88% Positive Excitement",
  },
  {
    id: "t2",
    tag: "#AutonomousAgents",
    label: "Self-Reflective Agent Workflows",
    velocity: "+294%/hr",
    phase: "DOMINANT",
    score: "94.2",
    volume: "890K mentions",
    reach: "11.2M impressions",
    color: "#0284c7",
    sparkline: [30, 45, 70, 95, 130, 160, 200, 240, 270, 294],
    sentimentBias: "92% Technical Consensus",
  },
  {
    id: "t3",
    tag: "#DecentralizedGraph",
    label: "Cross-Platform Network Topology",
    velocity: "+182%/hr",
    phase: "EMERGING",
    score: "87.9",
    volume: "420K mentions",
    reach: "5.8M impressions",
    color: "#7c3aed",
    sparkline: [10, 15, 20, 35, 50, 75, 100, 125, 155, 182],
    sentimentBias: "76% Constructive Inquiry",
  },
  {
    id: "t4",
    tag: "#ZeroKnowledgeAudience",
    label: "Differential Privacy Aggregations",
    velocity: "+115%/hr",
    phase: "EARLY SIGNAL",
    score: "79.3",
    volume: "210K mentions",
    reach: "3.1M impressions",
    color: "#059669",
    sparkline: [5, 10, 18, 24, 38, 52, 68, 80, 98, 115],
    sentimentBias: "96% Strong Privacy Trust",
  },
];

export function Trends3DView() {
  const [activeTopic, setActiveTopic] = useState(trendingTopics[0]);

  // Build SVG Sparkline path
  const maxVal = Math.max(...activeTopic.sparkline);
  const sparklinePoints = activeTopic.sparkline
    .map((val, idx) => {
      const x = 20 + (idx / (activeTopic.sparkline.length - 1)) * 480;
      const y = 80 - (val / maxVal) * 60;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="intelligence-3d-pillar-layout">
      {/* LEFT: 3D Narrative Velocity Visualizer */}
      <div className="intelligence-visual-column">
        <TiltCard maxTilt={7} scale={1.01} className="sentiment-3d-canvas-wrap">
          <div className="sentiment-canvas-header">
            <div className="canvas-header-left">
              <TrendingUp size={16} className="text-accent" />
              <span className="canvas-header-title">HOLOGRAPHIC NARRATIVE VELOCITY RADAR</span>
            </div>
            <GlassBadge variant="cyan" dot pulse>
              REAL-TIME SCANNER &middot; 480k msg/s
            </GlassBadge>
          </div>

          <div className="trends-visual-body">
            {/* SVG 3D Radar Vector Simulation */}
            <div className="trends-radar-container">
              <svg viewBox="0 0 540 260" className="trends-radar-svg" role="img">
                <defs>
                  <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(79,70,229,0.18)" />
                    <stop offset="100%" stopColor="rgba(79,70,229,0)" />
                  </radialGradient>
                </defs>

                {/* Concentric orbital rings */}
                <circle cx="270" cy="130" r="110" className="radar-ring" />
                <circle cx="270" cy="130" r="75" className="radar-ring" />
                <circle cx="270" cy="130" r="40" className="radar-ring" />
                <circle cx="270" cy="130" r="110" fill="url(#radarGlow)" />

                {/* Crosshairs */}
                <line x1="270" y1="20" x2="270" y2="240" className="radar-axis" />
                <line x1="150" y1="130" x2="390" y2="130" className="radar-axis" />

                {/* Rotating scanner beam */}
                <line x1="270" y1="130" x2="360" y2="55" className="radar-beam" />

                {/* Active Trend Nodes on Radar */}
                <g className="radar-nodes">
                  <circle cx="340" cy="80" r="7.5" className="radar-node node-active" />
                  <text x="354" y="84" className="radar-label">{activeTopic.tag}</text>

                  <circle cx="205" cy="95" r="5.5" className="radar-node" />
                  <text x="135" y="98" className="radar-label-dim">#AutonomousAgents</text>

                  <circle cx="295" cy="195" r="5" className="radar-node" />
                  <text x="307" y="199" className="radar-label-dim">#DecentralizedGraph</text>

                  <circle cx="190" cy="170" r="4.5" className="radar-node" />
                  <text x="120" y="174" className="radar-label-dim">#ZeroKnowledge</text>
                </g>
              </svg>
            </div>

            {/* Sparkline Velocity Curve */}
            <div className="trends-sparkline-box">
              <div className="sparkline-header">
                <span className="sparkline-title">Momentum Velocity Acceleration Curve (Last 24h)</span>
                <span className="sparkline-bias">{activeTopic.sentimentBias}</span>
              </div>
              <svg viewBox="0 0 520 90" className="sparkline-svg">
                <polyline
                  fill="none"
                  stroke={activeTopic.color}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  points={sparklinePoints}
                  className="sparkline-path"
                />
              </svg>
            </div>

            {/* Selected Topic Detailed Telemetry */}
            <div className="trends-topic-telemetry">
              <div className="telemetry-item">
                <span className="telemetry-label">VIRAL VELOCITY</span>
                <span className="telemetry-value velocity-glow">{activeTopic.velocity}</span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">LIFECYCLE PHASE</span>
                <span className="telemetry-value text-accent">{activeTopic.phase}</span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">BREAKOUT CONFIDENCE</span>
                <span className="telemetry-value">{activeTopic.score}%</span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">ESTIMATED REACH</span>
                <span className="telemetry-value">{activeTopic.reach}</span>
              </div>
            </div>
          </div>

          {/* Interactive Topic Selector Cards */}
          <div className="trends-interactive-cards">
            {trendingTopics.map((topic) => (
              <button
                key={topic.id}
                type="button"
                className={`trend-chip ${activeTopic.id === topic.id ? "is-active" : ""}`}
                onClick={() => setActiveTopic(topic)}
              >
                <div className="trend-chip-top">
                  <span className="trend-chip-tag">{topic.tag}</span>
                  <span className="trend-chip-vel">{topic.velocity}</span>
                </div>
                <div className="trend-chip-bottom">
                  <span className="trend-chip-desc">{topic.label}</span>
                  <ArrowUpRight size={13} className="trend-chip-arrow" />
                </div>
              </button>
            ))}
          </div>
        </TiltCard>
      </div>

      {/* RIGHT: Content & Narrative Mechanics */}
      <div className="intelligence-content-column">
        <div className="pillar-text-content">
          <p className="eyebrow">02 / TRENDS &amp; NARRATIVES</p>
          <h2 className="pillar-headline">
            SPOT THE
            <br />
            NEXT NARRATIVE.
          </h2>
          <p className="pillar-desc">
            Detect emerging topics as they gain momentum, track how conversations evolve, and surface
            narratives before they become dominant across platforms.
          </p>

          <div className="narrative-stages-grid">
            <div className="stage-card">
              <div className="stage-num">01</div>
              <div className="stage-title">Emerging Signal</div>
              <div className="stage-desc">Subtle micro-clusters forming across technical communities</div>
            </div>
            <div className="stage-card is-highlight">
              <div className="stage-num">02</div>
              <div className="stage-title">Momentum Surge</div>
              <div className="stage-desc">Accelerating velocity with exponential multi-platform cross-posting</div>
            </div>
            <div className="stage-card">
              <div className="stage-num">03</div>
              <div className="stage-title">Mainstream Consensus</div>
              <div className="stage-desc">Dominant narrative saturation and audience stabilization</div>
            </div>
          </div>

          <div className="pillar-meta-grid">
            <div className="meta-cell">
              <span className="meta-title">DETECTION</span>
              <span className="meta-val">VECTOR CLUSTER INFERENCE</span>
            </div>
            <div className="meta-cell">
              <span className="meta-title">ACCELERATION</span>
              <span className="meta-val">REAL-TIME DERIVATIVE</span>
            </div>
            <div className="meta-cell">
              <span className="meta-title">HORIZON</span>
              <span className="meta-val">LEAD TIME 4–12 HOURS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
