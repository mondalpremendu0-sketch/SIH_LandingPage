import { useState } from "react";
import { Server, Cpu, GitMerge, BarChart3, Radio, ArrowRight, ShieldCheck } from "lucide-react";
import { TiltCard } from "../../../../components/TiltCard";

const pipelineTiers = [
  {
    tier: "01",
    name: "Edge Ingestion Core",
    throughput: "500,000 events/sec",
    desc: "Low-latency distributed global edge nodes collecting public conversations across networks with deduplication.",
    icon: Radio,
    color: "#6366f1",
  },
  {
    tier: "02",
    name: "Neural Vector Embeddings",
    throughput: "768-D dense vectors",
    desc: "Transformer-based cross-lingual tokenization mapping semantic meaning, dialect nuances, and cultural idioms.",
    icon: Cpu,
    color: "#06b6d4",
  },
  {
    tier: "03",
    name: "Stance & Emotion Classifier",
    throughput: "< 14ms inference",
    desc: "Multi-task neural networks detecting nuanced emotional polarity, sarcasm, anxiety, support, and conviction.",
    icon: BarChart3,
    color: "#8b5cf6",
  },
  {
    tier: "04",
    name: "Graph Topology Engine",
    throughput: "10M+ active vertices",
    desc: "Dynamic Louvain modularity clustering mapping information propagation, viral nodes, and community diffusion.",
    icon: GitMerge,
    color: "#10b981",
  },
  {
    tier: "05",
    name: "Real-Time Query & Stream API",
    throughput: "Sub-second streaming",
    desc: "Instant GraphQL, REST, and gRPC endpoints delivering actionable social intelligence directly to dashboards and workflows.",
    icon: Server,
    color: "#f59e0b",
  },
];

export function ArchitecturePipeline3D() {
  const [activeTier, setActiveTier] = useState(0);

  return (
    <section className="architecture-pipeline-section" id="platform-architecture" aria-labelledby="arch-heading">
      <div className="container">
        <div className="section-header-block">
          <p className="section-eyebrow">NEXUS / SYSTEM ARCHITECTURE</p>
          <h2 id="arch-heading" className="section-main-title">
            HIGH-VELOCITY
            <br />
            INTELLIGENCE PIPELINE.
          </h2>
          <p className="section-main-desc">
            Engineered from the ground up for massive scale, zero-shot accuracy, and sub-second latency.
            Explore how raw social noise is synthesized into pure spatial intelligence.
          </p>
        </div>

        {/* 3D Tier Flow Cards */}
        <div className="pipeline-tiers-flow">
          {pipelineTiers.map((tier, idx) => {
            const Icon = tier.icon;
            const isSelected = activeTier === idx;
            return (
              <TiltCard
                key={tier.tier}
                maxTilt={8}
                scale={1.02}
                className={`pipeline-tier-card ${isSelected ? "is-active" : ""}`}
                onClick={() => setActiveTier(idx)}
              >
                <div className="tier-card-top">
                  <span className="tier-number">{tier.tier}</span>
                  <div className="tier-icon-wrap" style={{ color: tier.color }}>
                    <Icon size={18} />
                  </div>
                </div>

                <h3 className="tier-name">{tier.name}</h3>
                <span className="tier-throughput">{tier.throughput}</span>
                <p className="tier-desc">{tier.desc}</p>

                {idx < pipelineTiers.length - 1 && (
                  <div className="tier-flow-arrow" aria-hidden="true">
                    <ArrowRight size={14} />
                  </div>
                )}
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
