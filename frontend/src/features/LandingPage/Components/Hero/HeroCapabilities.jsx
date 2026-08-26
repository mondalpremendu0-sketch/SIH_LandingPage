import { motion, useReducedMotion } from "framer-motion";

const capabilities = ["SENTIMENT", "TRENDS", "AUDIENCE", "NETWORK"];

export function HeroCapabilities() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.p
      className="hero-capabilities"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.62,
        delay: reduceMotion ? 0 : 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {capabilities.map((capability, index) => (
        <span key={capability}>
          {index > 0 && (
            <span className="capability-separator" aria-hidden="true">
              ·
            </span>
          )}
          {capability}
        </span>
      ))}
    </motion.p>
  );
}
