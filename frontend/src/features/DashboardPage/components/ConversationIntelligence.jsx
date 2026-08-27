import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Animated metric card with smooth transitions
 */
function MetricCard({ label, value, change, unit = '', isPositive = true, delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="metric-card"
      initial={!reduceMotion ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <div className="metric-header">
        <span className="metric-label">{label}</span>
      </div>

      <motion.div className="metric-value">
        {/* Animated number counter */}
        <AnimatedNumber value={value} />
        {unit && <span className="metric-unit">{unit}</span>}
      </motion.div>

      {change !== undefined && (
        <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}
          <span>{isPositive ? '+' : ''}{change.toFixed(1)}%</span>
        </div>
      )}
    </motion.div>
  );
}

/**
 * Animated number component
 */
function AnimatedNumber({ value }) {
  const reduceMotion = useReducedMotion();
  const displayValue = useMemo(() => {
    if (typeof value !== 'number') return value;
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
    return value.toString();
  }, [value]);

  return (
    <motion.span
      key={displayValue}
      initial={!reduceMotion ? { opacity: 0, y: 4 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={!reduceMotion ? { opacity: 0, y: -4 } : false}
      transition={{ duration: 0.3 }}
    >
      {displayValue}
    </motion.span>
  );
}

/**
 * Intelligence Metrics Panel
 */
export function ConversationIntelligence({ metrics, selectedPoint }) {
  const reduceMotion = useReducedMotion();

  if (!metrics) {
    return <div>Loading metrics...</div>;
  }

  const displayMetrics = selectedPoint
    ? {
      totalConversations: selectedPoint.conversations,
      avgSentiment: selectedPoint.sentiment,
      velocity: selectedPoint.velocity,
      activeSignals: 0
    }
    : metrics;

  return (
    <motion.section
      className="conversation-intelligence"
      initial={!reduceMotion ? { opacity: 0 } : false}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="intelligence-header">
        <h2 className="intelligence-title">CONVERSATION INTELLIGENCE</h2>
        <p className="intelligence-description">
          Track conversation volume and identify meaningful changes across the selected social ecosystem.
        </p>
      </div>

      <div className="metrics-grid">
        <MetricCard
          label="TOTAL CONVERSATIONS"
          value={displayMetrics.totalConversations}
          change={displayMetrics.velocity}
          isPositive={displayMetrics.velocity >= 0}
          delay={0}
        />
        <MetricCard
          label="VELOCITY"
          value={displayMetrics.velocity}
          unit="%"
          isPositive={displayMetrics.velocity >= 0}
          delay={0.08}
        />
        <MetricCard
          label="SENTIMENT"
          value={displayMetrics.avgSentiment}
          isPositive={displayMetrics.avgSentiment > 50}
          delay={0.16}
        />
        <MetricCard
          label="ACTIVE SIGNALS"
          value={displayMetrics.activeSignals}
          delay={0.24}
        />
      </div>
    </motion.section>
  );
}
