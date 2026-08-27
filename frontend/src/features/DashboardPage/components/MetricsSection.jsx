import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { getDashboardData } from '../services/dashboard.service';

function MetricCard({ label, value, change, unit = '', delay = 0 }) {
  const reduceMotion = useReducedMotion();

  const formatValue = (val) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return (val / 1000).toFixed(1) + 'K';
    return val.toString();
  };

  return (
    <motion.div
      className="metric-card"
      initial={!reduceMotion ? { opacity: 0, y: 16 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="metric-label">{label}</div>

      <motion.div
        className="metric-value"
        key={value}
        initial={!reduceMotion ? { opacity: 0, scale: 0.9 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {formatValue(value)}
      </motion.div>

      {unit && <span className="metric-unit">{unit}</span>}

      {change !== undefined && (
        <div className="metric-change">
          <TrendingUp size={14} />
          <span>+{change}%</span>
        </div>
      )}

      {/* Gradient bars */}
      <div className="metric-bars">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="metric-bar"
            initial={!reduceMotion ? { opacity: 0.3, height: '2px' } : false}
            animate={{ opacity: 1, height: '4px' }}
            transition={{ delay: delay + i * 0.05, duration: 0.4 }}
            style={{ '--bar-opacity': 0.3 + i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function MetricsSection() {
  const reduceMotion = useReducedMotion();
  const data = getDashboardData();
  const { metrics } = data;

  return (
    <motion.section
      className="metrics-section"
      initial={!reduceMotion ? { opacity: 0 } : false}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="metrics-grid">
        <MetricCard
          label={metrics.followers.label}
          value={metrics.followers.value}
          change={metrics.followers.change}
          delay={0}
        />
        <MetricCard
          label={metrics.engagement.label}
          value={metrics.engagement.value}
          unit="%"
          change={metrics.engagement.change}
          delay={0.1}
        />
        <MetricCard
          label={metrics.impressions.label}
          value={metrics.impressions.value}
          change={metrics.impressions.change}
          delay={0.2}
        />
        <MetricCard
          label={metrics.clicks.label}
          value={metrics.clicks.value}
          change={metrics.clicks.change}
          delay={0.3}
        />
      </div>
    </motion.section>
  );
}
