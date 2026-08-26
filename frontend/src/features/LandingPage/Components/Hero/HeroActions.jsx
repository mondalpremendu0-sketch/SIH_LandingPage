import { ArrowUpRight, MoveRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

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
      <a className="hero-primary-action" href="#intelligence">
        EXPLORE NEXUS <ArrowUpRight aria-hidden="true" size={16} />
      </a>
      <a className="hero-secondary-action" href="#network">
        HOW IT WORKS <MoveRight aria-hidden="true" size={15} />
      </a>
    </motion.div>
  );
}
