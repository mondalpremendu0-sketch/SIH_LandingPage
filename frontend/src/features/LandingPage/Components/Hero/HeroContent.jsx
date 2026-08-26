import { motion, useReducedMotion } from "framer-motion";

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
      <motion.p className="hero-eyebrow" {...reveal(0.18)}>
        NEXUS / SOCIAL INTELLIGENCE
      </motion.p>
      <h1 className="hero-title" id="hero-title">
        <motion.span
          className="hero-title-line hero-title-solid"
          {...reveal(0.28)}
        >
          UNDERSTAND THE
          <br />
          CONVERSATION
        </motion.span>
        <motion.span
          className="hero-title-line hero-title-outline"
          {...reveal(0.42)}
        >
          BEFORE IT SHAPES
          <br />
          THE NARRATIVE
        </motion.span>
      </h1>
    </div>
  );
}
