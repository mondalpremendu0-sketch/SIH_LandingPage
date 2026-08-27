import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertCircle, ChevronRight } from 'lucide-react';
import { getTargetedRisks, getRiskProgression } from '../services/threat-intelligence.service';

export function TargetedRisk() {
  const reduceMotion = useReducedMotion();
  const [selectedTargetId, setSelectedTargetId] = useState(null);
  const targets = getTargetedRisks();

  const selectedTarget = targets.find(t => t.id === selectedTargetId);
  const riskProgression = selectedTargetId ? getRiskProgression(selectedTargetId) : null;

  return (
    <motion.section
      className="targeted-risk-section"
      initial={!reduceMotion ? { opacity: 0, y: 20 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="section-header">
        <h2>TARGETED RISK ASSESSMENT</h2>
        <p>High-priority targets ranked by risk score</p>
      </div>

      <div className="risk-grid">
        {/* Risk Targets List */}
        <div className="risk-targets-list">
          {targets.map((target, index) => {
            const isSelected = selectedTargetId === target.id;
            const TrendIcon = target.trend === 'increasing' ? TrendingUp : TrendingDown;

            return (
              <motion.button
                key={target.id}
                className={`risk-target-card ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setSelectedTargetId(isSelected ? null : target.id)}
                initial={!reduceMotion ? { opacity: 0, x: -20 } : false}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ x: 4 }}
              >
                <div className="card-header">
                  <h3>{target.name}</h3>
                  <ChevronRight
                    size={18}
                    className={`card-arrow ${isSelected ? 'open' : ''}`}
                  />
                </div>

                <div className="card-metrics">
                  <div className="metric-box">
                    <span className="metric-label">Risk Score</span>
                    <motion.div
                      className="metric-value"
                      initial={!reduceMotion ? { scale: 0.5, opacity: 0 } : false}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {target.riskScore}
                    </motion.div>
                  </div>

                  <div className="metric-box">
                    <span className="metric-label">Confidence</span>
                    <div className="metric-value">{target.confidence}%</div>
                  </div>

                  <div className="metric-box">
                    <span className="metric-label">Signals</span>
                    <div className="metric-value">{target.signals}</div>
                  </div>

                  <div className="metric-box">
                    <span className="metric-label">Connections</span>
                    <div className="metric-value">{target.connections}</div>
                  </div>
                </div>

                <div className="card-status">
                  <div className="status-trend">
                    <TrendIcon size={14} />
                    <span className={`trend-${target.trend}`}>
                      {target.trend === 'increasing' ? 'Increasing' : 'Decreasing'}
                    </span>
                  </div>
                  <div className="status-time">
                    {target.lastActivity.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {/* Risk Bar */}
                <div className="risk-bar-container">
                  <motion.div
                    className="risk-bar"
                    initial={!reduceMotion ? { width: 0 } : false}
                    whileInView={{ width: `${target.riskScore}%` }}
                    transition={{ delay: index * 0.05 + 0.15, duration: 0.6 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Risk Details Panel */}
        <AnimatePresence>
          {selectedTarget && riskProgression && (
            <motion.div
              className="risk-details-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="panel-header">
                <h3>{selectedTarget.name}</h3>
                <div className={`risk-badge risk-${selectedTarget.likelihood.toLowerCase()}`}>
                  {selectedTarget.likelihood}
                </div>
              </div>

              <div className="panel-divider" />

              {/* Risk Matrix */}
              <div className="risk-matrix">
                <div className="matrix-cell">
                  <span className="cell-label">Likelihood</span>
                  <span className="cell-value">{selectedTarget.likelihood}</span>
                </div>
                <div className="matrix-cell">
                  <span className="cell-label">Impact</span>
                  <span className="cell-value">{selectedTarget.impact}</span>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="risk-factors">
                <h4>Risk Factors</h4>
                <ul>
                  {selectedTarget.riskFactors.map((factor, idx) => (
                    <motion.li
                      key={idx}
                      initial={!reduceMotion ? { opacity: 0, x: -10 } : false}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                    >
                      <AlertCircle size={14} />
                      <span>{factor}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Risk Progression Chart */}
              <div className="progression-chart">
                <h4>Risk Progression</h4>
                <div className="chart-container">
                  {riskProgression.map((point, idx) => (
                    <motion.div
                      key={idx}
                      className="chart-bar"
                      initial={!reduceMotion ? { height: 0 } : false}
                      whileInView={{ height: `${(point.risk / 100) * 120}px` }}
                      transition={{
                        delay: idx * 0.05,
                        duration: 0.4,
                      }}
                      viewport={{ once: true }}
                      title={`${point.date.toLocaleDateString()}: ${point.risk}`}
                    >
                      <div className="bar-tooltip">
                        <span className="tooltip-date">
                          {point.date.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="tooltip-value">{point.risk}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="panel-actions">
                <button className="action-btn primary">
                  Open Investigation
                </button>
                <button className="action-btn secondary">
                  View Details
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
