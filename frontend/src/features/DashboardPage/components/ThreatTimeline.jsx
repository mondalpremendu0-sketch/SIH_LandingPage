import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle, Shield, Zap, Lock } from 'lucide-react';
import { getThreatTimeline } from '../services/threat-intelligence.service';

const severityIcons = {
  CRITICAL: AlertTriangle,
  ELEVATED: AlertTriangle,
  MODERATE: Shield,
  LOW: Zap,
};

export function ThreatTimeline() {
  const reduceMotion = useReducedMotion();
  const [expandedId, setExpandedId] = useState(null);
  const events = getThreatTimeline(12);

  return (
    <motion.section
      className="threat-timeline-section"
      initial={!reduceMotion ? { opacity: 0, y: 20 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="section-header">
        <h2>THREAT ACTIVITY TIMELINE</h2>
        <p>Event timeline and detection history</p>
      </div>

      <div className="timeline-container">
        {events.map((event, index) => {
          const IconComponent = severityIcons[event.severity] || AlertTriangle;
          const isExpanded = expandedId === event.id;

          return (
            <motion.div
              key={event.id}
              className={`timeline-event severity-${event.severity.toLowerCase()}`}
              initial={!reduceMotion ? { opacity: 0, x: -20 } : false}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              {/* Timeline marker and line */}
              <div className="timeline-marker">
                <motion.div
                  className="marker-dot"
                  initial={!reduceMotion ? { scale: 0 } : false}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <IconComponent size={16} />
                </motion.div>
                {index < events.length - 1 && <div className="timeline-line" />}
              </div>

              {/* Event content */}
              <motion.button
                className="timeline-content"
                onClick={() => setExpandedId(isExpanded ? null : event.id)}
                whileHover={{ backgroundColor: 'var(--timeline-hover)' }}
              >
                <div className="event-header">
                  <div className="event-time">
                    {event.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div className="event-severity-badge">
                    {event.severity}
                  </div>
                </div>

                <div className="event-title">{event.description}</div>

                <div className="event-meta">
                  <span className="meta-item">
                    <span className="label">Source:</span>
                    <span>{event.source}</span>
                  </span>
                  <span className="meta-item">
                    <span className="label">Status:</span>
                    <span className={`status-${event.status.toLowerCase()}`}>
                      {event.status}
                    </span>
                  </span>
                  <span className="meta-item">
                    <span className="label">Confidence:</span>
                    <span>{event.confidence}%</span>
                  </span>
                </div>

                <motion.div
                  className="expand-icon"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </motion.button>

              {/* Expanded details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="timeline-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Event Type</span>
                        <span className="detail-value">{event.type}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Full Timestamp</span>
                        <span className="detail-value">
                          {event.timestamp.toLocaleString('en-US')}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Threat Source</span>
                        <span className="detail-value">{event.source}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Confidence Level</span>
                        <span className="detail-value">{event.confidence}%</span>
                      </div>
                    </div>

                    <div className="details-description">
                      <p>{event.description}</p>
                      <div className="details-actions">
                        <button className="action-btn investigate">
                          Investigate
                        </button>
                        <button className="action-btn details">
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
