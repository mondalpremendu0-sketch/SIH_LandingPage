import { ArrowUpRight, MoveRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "../../../../components/MagneticButton";

export function HeroActions() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="hero-actions"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.68,
        delay: reduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <MagneticButton as="div" strength={0.2}>
        <a className="hero-primary-action" href="/dashboard">
          <span>EXPLORE TRINERT</span>
          <ArrowUpRight aria-hidden="true" size={16} />
        </a>
      </MagneticButton>
      <MagneticButton as="div" strength={0.15}>
        <a className="hero-secondary-action" href="#network">
          <span>HOW IT WORKS</span>
          <MoveRight aria-hidden="true" size={15} />
        </a>
      </MagneticButton>
    </motion.div>
  );
}
