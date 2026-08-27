import { motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

export function ThreatOverview() {
  const reduceMotion = useReducedMotion();
  const threatLevel = 'ELEVATED';
  const riskScore = 78;
  const activeThreatCount = 27;
  const critical = 4;
  const elevated = 9;
  const monitored = 14;

  const threatMetrics = [
    { label: 'CRITICAL', value: critical, color: 'critical' },
    { label: 'ELEVATED', value: elevated, color: 'elevated' },
    { label: 'MONITORED', value: monitored, color: 'monitored' },
  ];

  return (
    <motion.section
      className="threat-overview-section"
      initial={!reduceMotion ? { opacity: 0, y: 20 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="section-header">
        <h2>THREAT OVERVIEW</h2>
        <p>Current threat landscape</p>
      </div>

      <div className="threat-grid">
        {/* Main Threat Meter */}
        <motion.div
          className="threat-meter-card"
          initial={!reduceMotion ? { opacity: 0, scale: 0.95 } : false}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="threat-meter-container">
            <svg viewBox="0 0 200 200" className="threat-meter-svg">
              <defs>
                <linearGradient id="threatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--threat-low)" />
                  <stop offset="33%" stopColor="var(--threat-moderate)" />
                  <stop offset="66%" stopColor="var(--threat-elevated)" />
                  <stop offset="100%" stopColor="var(--threat-critical)" />
                </linearGradient>
              </defs>

              {/* Background circle */}
              <circle cx="100" cy="100" r="90" fill="none" stroke="var(--threat-bg)" strokeWidth="2" />

              {/* Threat level indicator - arc */}
              <motion.path
                d={getArcPath(riskScore / 100)}
                fill="none"
                stroke="url(#threatGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                initial={!reduceMotion ? { strokeDashoffset: 565 } : false}
                whileInView={{ strokeDashoffset: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
                strokeDasharray="565"
                viewport={{ once: true }}
              />

              {/* Center value */}
              <motion.text
                x="100"
                y="95"
                textAnchor="middle"
                className="threat-meter-value"
                initial={!reduceMotion ? { opacity: 0 } : false}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {riskScore}
              </motion.text>
              <text
                x="100"
                y="115"
                textAnchor="middle"
                className="threat-meter-label"
              >
                RISK SCORE
              </text>
            </svg>

            {/* Level label */}
            <div className={`threat-level-badge threat-${threatLevel.toLowerCase()}`}>
              {threatLevel}
            </div>
          </div>

          <div className="threat-summary">
            <h3>Active Threats</h3>
            <div className="threat-count">{activeThreatCount}</div>
            <div className="threat-subtext">Currently being monitored</div>
          </div>
        </motion.div>

        {/* Threat Metrics Cards */}
        {threatMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className={`threat-metric-card threat-${metric.color}`}
            initial={!reduceMotion ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="metric-label">{metric.label}</div>
            <motion.div
              className="metric-value"
              initial={!reduceMotion ? { scale: 0.5 } : false}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              {metric.value}
            </motion.div>
            <div className="metric-bar">
              <motion.div
                className="metric-bar-fill"
                initial={!reduceMotion ? { width: 0 } : false}
                whileInView={{ width: `${(metric.value / activeThreatCount) * 100}%` }}
                transition={{ delay: 0.25 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/**
 * Generate SVG arc path for threat meter
 */
function getArcPath(percentage) {
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * percentage;
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (2 * Math.PI * percentage);

  const startX = 100 + radius * Math.cos(startAngle);
  const startY = 100 + radius * Math.sin(startAngle);
  const endX = 100 + radius * Math.cos(endAngle);
  const endY = 100 + radius * Math.sin(endAngle);

  const largeArc = percentage > 0.5 ? 1 : 0;

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`;
}
