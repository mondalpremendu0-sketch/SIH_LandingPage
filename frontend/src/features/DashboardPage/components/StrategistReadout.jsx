import { motion, useReducedMotion } from 'framer-motion';
import { getStrategistInsights } from '../services/dashboard.service';

export function StrategistReadout() {
  const reduceMotion = useReducedMotion();
  const insights = getStrategistInsights();

  return (
    <motion.section
      className="strategist-readout-section"
      initial={!reduceMotion ? { opacity: 0 } : false}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="readout-container">
        {/* Left: Main Insight */}
        <motion.div
          className="readout-main"
          initial={!reduceMotion ? { opacity: 0, x: -20 } : false}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="section-label">SIGNAL NOTES</div>
          <h3 className="readout-title">STRATEGIST READOUT</h3>

          <div className="readout-cue">
            <span className="cue-label">MOMENTUM CUE</span>
            <p className="cue-text">{insights.momentum}</p>
          </div>

          <p className="readout-insight">
            {insights.actionable}
          </p>

          <motion.button
            className="readout-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            VIEW FULL READOUT
            <span className="button-arrow">→</span>
          </motion.button>
        </motion.div>

        {/* Right: Details */}
        <motion.div
          className="readout-details"
          initial={!reduceMotion ? { opacity: 0, x: 20 } : false}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="detail-card">
            <div className="detail-label">BEST CHANNEL</div>
            <div className="detail-value">{insights.bestChannel}</div>
            <div className="detail-subtext">{insights.bestChannelEngagement} engagement</div>
          </div>

          <div className="detail-card">
            <div className="detail-label">NEXT REVIEW</div>
            <div className="detail-value">{insights.nextReview}</div>
            <div className="detail-subtext">{insights.nextReviewDesc}</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
