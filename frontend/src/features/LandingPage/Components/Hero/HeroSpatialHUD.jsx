import { motion, useReducedMotion } from "framer-motion";
import { Activity, Cpu, Network, ShieldCheck, Zap, Radio, Globe } from "lucide-react";
import { TiltCard } from "../../../../components/TiltCard";

export function HeroSpatialHUD() {
  const reduceMotion = useReducedMotion();

  const floatingVariants = {
    animate: (custom) => ({
      y: reduceMotion ? 0 : [0, custom.y, 0],
      rotateZ: reduceMotion ? 0 : [0, custom.r, 0],
      rotateX: reduceMotion ? 0 : [custom.rx || 0, (custom.rx || 0) + 2, custom.rx || 0],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="hero-spatial-hud-wrapper" aria-hidden="true">
      {/* HUD Chip 1: Neural Signal Strength */}
      <motion.div
        className="hud-chip-position hud-pos-top"
        custom={{ y: -10, r: 1.4, rx: 6, duration: 5.2 }}
        animate="animate"
        variants={floatingVariants}
      >
        <TiltCard maxTilt={15} scale={1.05} className="hud-glass-chip hud-chip-glow-cyan">
          <div className="hud-chip-header">
            <div className="hud-icon-label-wrap">
              <span className="hud-chip-pulse-dot dot-emerald" />
              <span className="hud-chip-label">REAL-TIME INFERENCE</span>
            </div>
            <span className="hud-chip-badge badge-emerald">ACTIVE &middot; 99.4%</span>
          </div>
          <div className="hud-chip-body">
            <div className="hud-metric-row">
              <span className="hud-metric-title">Signal Confidence</span>
              <span className="hud-metric-value text-cyan">99.4%</span>
            </div>
            <div className="hud-progress-bar">
              <div className="hud-progress-fill" style={{ width: "94%" }} />
            </div>
            <div className="hud-chip-subtext">
              <Activity size={12} className="text-cyan" />
              <span>Latency &lt; 14ms across 48 edge nodes</span>
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* HUD Chip 2: Active Graph Cluster */}
      <motion.div
        className="hud-chip-position hud-pos-bottom"
        custom={{ y: 9, r: -1.8, rx: -5, duration: 5.8 }}
        animate="animate"
        variants={floatingVariants}
      >
        <TiltCard maxTilt={15} scale={1.05} className="hud-glass-chip hud-chip-glow-indigo">
          <div className="hud-chip-header">
            <div className="hud-icon-label-wrap">
              <Network size={14} className="text-accent" />
              <span className="hud-chip-label">GRAPH TOPOLOGY</span>
            </div>
            <span className="hud-chip-badge-neutral">LIVE STREAM</span>
          </div>
          <div className="hud-chip-body">
            <div className="hud-metric-row">
              <span className="hud-metric-title">Active Social Nodes</span>
              <span className="hud-metric-value text-accent">2,481,902</span>
            </div>
            <div className="hud-cluster-tags">
              <span className="hud-tag tag-accent">VIRALITY +84%</span>
              <span className="hud-tag">ENTROPY 0.04</span>
              <span className="hud-tag">140+ DIALECTS</span>
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* HUD Chip 3: Stance Detection */}
      <motion.div
        className="hud-chip-position hud-pos-mid"
        custom={{ y: -8, r: 1.0, rx: 4, duration: 6.4 }}
        animate="animate"
        variants={floatingVariants}
      >
        <TiltCard maxTilt={14} scale={1.04} className="hud-glass-chip hud-chip-compact hud-chip-glow-amber">
          <div className="hud-compact-row">
            <Zap size={15} className="text-amber" />
            <div className="hud-compact-col">
              <span className="hud-compact-text">Narrative Shift in Tier 1 Cluster</span>
              <span className="hud-compact-sub">Vector alignment &gt; 0.92</span>
            </div>
            <span className="hud-compact-delta">+18.4%</span>
          </div>
        </TiltCard>
      </motion.div>
    </div>
  );
}
