import { useState } from "react";
import { Network, GitFork, Play, Zap, Share2, Radio, CheckCircle2 } from "lucide-react";
import { TiltCard } from "../../../../components/TiltCard";
import { GlassBadge } from "../../../../components/GlassBadge";

const networkNodes = [
  { id: "hub-1", x: 270, y: 135, r: 15, label: "Core Synthesizer", type: "hub", color: "#4f46e5", reach: "2.4M nodes" },
  { id: "node-2", x: 125, y: 75, r: 10, label: "Tech Researchers", type: "cluster", color: "#0284c7", reach: "890k nodes" },
  { id: "node-3", x: 415, y: 75, r: 11, label: "Global Media", type: "cluster", color: "#7c3aed", reach: "1.2M nodes" },
  { id: "node-4", x: 95, y: 225, r: 9, label: "Policy Groups", type: "cluster", color: "#059669", reach: "410k nodes" },
  { id: "node-5", x: 445, y: 225, r: 10, label: "Developer Guilds", type: "cluster", color: "#d97706", reach: "680k nodes" },
  { id: "node-6", x: 270, y: 270, r: 9, label: "Industry Analysts", type: "cluster", color: "#db2777", reach: "320k nodes" },
  { id: "leaf-1", x: 65, y: 45, r: 5, label: "Sub-node A", type: "leaf", color: "#94a3b8", reach: "45k nodes" },
  { id: "leaf-2", x: 180, y: 35, r: 4.5, label: "Sub-node B", type: "leaf", color: "#94a3b8", reach: "32k nodes" },
  { id: "leaf-3", x: 490, y: 55, r: 5, label: "Sub-node C", type: "leaf", color: "#94a3b8", reach: "58k nodes" },
  { id: "leaf-4", x: 500, y: 255, r: 4.5, label: "Sub-node D", type: "leaf", color: "#94a3b8", reach: "29k nodes" },
];

const networkEdges = [
  { from: "hub-1", to: "node-2" },
  { from: "hub-1", to: "node-3" },
  { from: "hub-1", to: "node-4" },
  { from: "hub-1", to: "node-5" },
  { from: "hub-1", to: "node-6" },
  { from: "node-2", to: "leaf-1" },
  { from: "node-2", to: "leaf-2" },
  { from: "node-3", to: "leaf-3" },
  { from: "node-5", to: "leaf-4" },
  { from: "node-2", to: "node-4" },
  { from: "node-3", to: "node-5" },
];

export function Network3DView() {
  const [isDiffusing, setIsDiffusing] = useState(false);
  const [selectedNode, setSelectedNode] = useState(networkNodes[0]);

  const triggerDiffusion = () => {
    setIsDiffusing(true);
    setTimeout(() => setIsDiffusing(false), 2400);
  };

  return (
    <div className="intelligence-3d-pillar-layout">
      {/* LEFT: 3D Force Graph Simulation Canvas */}
      <div className="intelligence-visual-column">
        <TiltCard maxTilt={6} scale={1.01} className="sentiment-3d-canvas-wrap">
          <div className="sentiment-canvas-header">
            <div className="canvas-header-left">
              <Network size={16} className="text-accent" />
              <span className="canvas-header-title">INFLUENCE CASCADE TOPOLOGY</span>
            </div>
            <GlassBadge variant="purple" dot pulse>
              LOUVAIN CLUSTER &middot; 0.842
            </GlassBadge>
          </div>

          <div className="network-visual-body">
            <svg viewBox="0 0 560 320" className="network-graph-svg" role="img">
              <defs>
                <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Edges */}
              <g className="network-edges">
                {networkEdges.map((edge, idx) => {
                  const source = networkNodes.find((n) => n.id === edge.from);
                  const target = networkNodes.find((n) => n.id === edge.to);
                  if (!source || !target) return null;

                  const isConnectedToSelected =
                    selectedNode.id === edge.from || selectedNode.id === edge.to;

                  return (
                    <g key={idx}>
                      <line
                        x1={source.x}
                        y1={source.y}
                        x2={target.x}
                        y2={target.y}
                        className={`network-edge-line ${isDiffusing ? "is-diffusing" : ""} ${isConnectedToSelected ? "is-highlighted" : ""}`}
                      />
                    </g>
                  );
                })}
              </g>

              {/* Diffusion Pulse Packets */}
              {isDiffusing && (
                <g className="diffusion-pulses">
                  {networkEdges.slice(0, 6).map((edge, idx) => {
                    const source = networkNodes.find((n) => n.id === edge.from);
                    const target = networkNodes.find((n) => n.id === edge.to);
                    if (!source || !target) return null;
                    return (
                      <circle
                        key={`pulse-${idx}`}
                        r="4.5"
                        className="pulse-packet"
                        filter="url(#glowEffect)"
                      >
                        <animate
                          attributeName="cx"
                          from={source.x}
                          to={target.x}
                          dur="1.2s"
                          repeatCount="2"
                        />
                        <animate
                          attributeName="cy"
                          from={source.y}
                          to={target.y}
                          dur="1.2s"
                          repeatCount="2"
                        />
                      </circle>
                    );
                  })}
                </g>
              )}

              {/* Nodes */}
              <g className="network-nodes">
                {networkNodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <g
                      key={node.id}
                      className={`network-node-group ${isSelected ? "is-selected" : ""}`}
                      onClick={() => setSelectedNode(node)}
                      style={{ cursor: "pointer" }}
                    >
                      {isSelected && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={node.r + 8}
                          className="node-selection-ring"
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.r}
                        fill={node.color}
                        className="network-node-circle"
                      />
                      <text
                        x={node.x}
                        y={node.y + node.r + 14}
                        textAnchor="middle"
                        className="network-node-label"
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Interactive Simulation Controls */}
          <div className="network-controls-bar">
            <button
              type="button"
              className={`diffusion-trigger-btn ${isDiffusing ? "is-animating" : ""}`}
              onClick={triggerDiffusion}
              disabled={isDiffusing}
            >
              <Zap size={14} />
              <span>{isDiffusing ? "SIMULATING CASCADE..." : "SIMULATE SIGNAL DIFFUSION"}</span>
            </button>

            <div className="network-quick-telemetry">
              <span className="net-label">Selected Node:</span>
              <span className="net-val">{selectedNode.label}</span>
              <span className="net-pill">{selectedNode.reach}</span>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* RIGHT: Content & Influence Flow Philosophy */}
      <div className="intelligence-content-column">
        <div className="pillar-text-content">
          <p className="eyebrow">04 / NETWORK INTELLIGENCE</p>
          <h2 className="pillar-headline">
            FOLLOW THE
            <br />
            FLOW OF INFLUENCE.
          </h2>
          <p className="pillar-desc">
            Map relationships between communities, identify influential nodes, and understand how
            information and sentiment move through the network.
          </p>

          <div className="network-metrics-grid">
            <div className="net-metric-card">
              <span className="net-metric-title">Eigenvector Centrality</span>
              <span className="net-metric-number">0.942</span>
              <span className="net-metric-sub">Highest transmission potential</span>
            </div>
            <div className="net-metric-card">
              <span className="net-metric-title">Diffusion Velocity</span>
              <span className="net-metric-number">480 hops/s</span>
              <span className="net-metric-sub">Across 18 isolated sub-graphs</span>
            </div>
          </div>

          <div className="pillar-meta-grid">
            <div className="meta-cell">
              <span className="meta-title">TOPOLOGY</span>
              <span className="meta-val">DIRECTED ACYCLIC GRAPH (DAG)</span>
            </div>
            <div className="meta-cell">
              <span className="meta-title">INFLUENCE</span>
              <span className="meta-val">MULTI-HOP CASCADE TRACING</span>
            </div>
            <div className="meta-cell">
              <span className="meta-title">COMMUNITIES</span>
              <span className="meta-val">LOUVAIN MODULARITY &gt; 0.82</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
