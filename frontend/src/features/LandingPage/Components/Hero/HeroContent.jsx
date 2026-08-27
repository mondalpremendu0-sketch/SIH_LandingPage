import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Shield, Cpu } from "lucide-react";

export function HeroContent() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0.01 : 0.72,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  });

  return (
    <div className="hero-content">
      {/* Top Telemetry Beacon Tag */}
      <motion.div className="hero-eyebrow-badge" {...reveal(0.12)}>
        <span className="eyebrow-beacon-dot" />
        <span className="hero-eyebrow-text">NEXUS &middot; SPATIAL SOCIAL INTELLIGENCE</span>
        <span className="eyebrow-version-tag">V3.4 CORE</span>
      </motion.div>

      {/* Massive Display Headline */}
      <h1 className="hero-title" id="hero-title">
        <motion.span
          className="hero-title-line hero-title-solid"
          {...reveal(0.24)}
        >
          UNDERSTAND THE
          <br />
          <span className="hero-title-gradient">CONVERSATION</span>
        </motion.span>
        <motion.span
          className="hero-title-line hero-title-sculptural"
          {...reveal(0.38)}
        >
          BEFORE IT SHAPES
          <br />
          <span className="hero-title-glow-text">THE NARRATIVE</span>
        </motion.span>
      </h1>
    </div>
  );
}
