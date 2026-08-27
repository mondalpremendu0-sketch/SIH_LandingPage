import { Activity, Clock, ShieldCheck, Globe, Zap, Database } from "lucide-react";
import { TiltCard } from "../../../../components/TiltCard";

const metrics = [
  {
    id: "m1",
    value: "2.4B+",
    label: "Conversations Ingested",
    subtext: "Indexed across 30+ major platforms",
    icon: Database,
    glow: "rgba(99, 102, 241, 0.18)",
  },
  {
    id: "m2",
    value: "< 45ms",
    label: "Inference Latency",
    subtext: "Real-time edge neural classification",
    icon: Clock,
    glow: "rgba(6, 182, 212, 0.18)",
  },
  {
    id: "m3",
    value: "99.4%",
    label: "Model Precision",
    subtext: "Stance & nuanced emotion detection",
    icon: ShieldCheck,
    glow: "rgba(139, 92, 246, 0.18)",
  },
  {
    id: "m4",
    value: "140+",
    label: "Global Dialects",
    subtext: "Zero-shot cross-lingual NLP models",
    icon: Globe,
    glow: "rgba(16, 185, 129, 0.18)",
  },
];

export function GlobalMetricsBand() {
  return (
    <section className="global-metrics-section" aria-label="Platform scale and benchmarks">
      <div className="container">
        <div className="metrics-grid">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <TiltCard
                key={metric.id}
                maxTilt={10}
                scale={1.03}
                glowColor={metric.glow}
                className="metric-glass-card"
              >
                <div className="metric-card-inner">
                  <div className="metric-icon-wrap">
                    <Icon size={20} className="metric-icon" />
                  </div>
                  <div className="metric-val-wrap">
                    <span className="metric-large-number">{metric.value}</span>
                    <span className="metric-card-label">{metric.label}</span>
                  </div>
                  <p className="metric-card-sub">{metric.subtext}</p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
