import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export function BriefingHero() {
  const reduceMotion = useReducedMotion();
  const now = new Date();
  const weekNumber = Math.ceil((now.getDate() + new Date(now.getFullYear(), 0, 1).getDay()) / 7);
  const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.section
      className="briefing-hero"
      initial={!reduceMotion ? { opacity: 0, y: 20 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="briefing-content">
        <p className="briefing-meta">MONDAY BRIEFING</p>
        <p style={{ fontSize: '12px', color: 'var(--dash-text-muted)', fontFamily: 'var(--dash-font-mono)', fontWeight: 600, margin: 0, letterSpacing: '0.05em' }}>
          Week {weekNumber} · {timeString}
        </p>

        <h1 className="briefing-title">
          Your audience is <em>leaning in</em>.
        </h1>

        <p className="briefing-description">
          A focused read on what moved the room last week — and where the next signal is forming.
        </p>

        <motion.div
          className="briefing-sync-info"
          initial={!reduceMotion ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          viewport={{ once: true }}
        >
          <span className="sync-label">LAST SYNCED</span>
          <span className="sync-time">{timeString}</span>
          <TrendingUp size={16} className="sync-icon" />
        </motion.div>
      </div>
    </motion.section>
  );
}
