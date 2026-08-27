import { motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, TrendingUp, Zap } from 'lucide-react';

/**
 * Signal Severity Color Map
 */
const getSeverityColor = (severity) => {
  switch (severity) {
    case 'critical':
      return '#ef4444';
    case 'high':
      return '#f97316';
    case 'positive':
      return '#22c55e';
    case 'info':
      return '#3b82f6';
    default:
      return '#64748b';
  }
};

const getSeverityIcon = (severity) => {
  switch (severity) {
    case 'critical':
    case 'high':
      return <AlertCircle size={16} />;
    case 'positive':
      return <TrendingUp size={16} />;
    default:
      return <Zap size={16} />;
  }
};

/**
 * Individual Signal Card
 */
function SignalCard({ signal, index, onSignalClick, isSelected }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`signal-card ${isSelected ? 'is-selected' : ''} severity-${signal.severity}`}
      initial={!reduceMotion ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: reduceMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1]
      }}
      onClick={() => onSignalClick(signal)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSignalClick(signal)}
    >
      {/* Severity indicator */}
      <div className="signal-marker">
        <motion.div
          className="signal-dot"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ backgroundColor: getSeverityColor(signal.severity) }}
        />
      </div>

      {/* Signal content */}
      <div className="signal-content">
        <div className="signal-header">
          <div className="signal-icon-label">
            {getSeverityIcon(signal.severity)}
            <span className="signal-title">{signal.title}</span>
          </div>
          <span className="signal-change">{signal.change}</span>
        </div>

        <p className="signal-description">{signal.description}</p>

        <div className="signal-metadata">
          <span className="signal-platform">{signal.platform.toUpperCase()}</span>
          <span className="signal-impact">Impact: {signal.impact}</span>
          <span className="signal-time">
            {signal.timestamp.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Signals List Component
 */
export function SignalList({ signals, selectedSignal, onSignalClick }) {
  const reduceMotion = useReducedMotion();

  if (!signals || signals.length === 0) {
    return (
      <motion.section
        className="signal-list-section"
        initial={!reduceMotion ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="signals-title">ACTIVE SIGNALS</h3>
        <div className="signals-empty">
          <p>No active signals at this time</p>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="signal-list-section"
      initial={!reduceMotion ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="signals-title">ACTIVE SIGNALS</h3>
      <div className="signals-container">
        {signals.map((signal, index) => (
          <SignalCard
            key={signal.id}
            signal={signal}
            index={index}
            onSignalClick={onSignalClick}
            isSelected={selectedSignal?.id === signal.id}
          />
        ))}
      </div>
    </motion.section>
  );
}
