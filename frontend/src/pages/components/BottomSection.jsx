import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, TrendingUp } from 'lucide-react';

export default function BottomSection() {
  const [expandedRow, setExpandedRow] = useState(null);

  const contentWinners = [
    {
      id: 1,
      title: 'Critical Vulnerability CVE-2024-1847',
      type: 'THREAT',
      severity: 'critical',
      engagement: '94.2%',
      clicks: '12.4K',
      trend: '+23%',
    },
    {
      id: 2,
      title: 'Anomalous Network Traffic Pattern',
      type: 'ANOMALY',
      severity: 'elevated',
      engagement: '87.1%',
      clicks: '8.7K',
      trend: '+15%',
    },
    {
      id: 3,
      title: 'Unauthorized Access Attempt Blocked',
      type: 'BLOCKED',
      severity: 'moderate',
      engagement: '76.3%',
      clicks: '5.2K',
      trend: '+8%',
    },
  ];

  const strategistInsights = [
    {
      title: 'Network Health',
      value: '94%',
      description: 'Systems operating within normal parameters',
    },
    {
      title: 'Threat Response',
      value: '2.3s',
      description: 'Average incident response time',
    },
    {
      title: 'Detection Accuracy',
      value: '98.7%',
      description: 'False positive rate: 0.3%',
    },
  ];

  return (
    <motion.section
      className="charts-grid"
      style={{ gridTemplateColumns: '1fr 1fr' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Content Winners Table */}
      <motion.div
        className="chart-card card-3d"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="chart-header">
          <h3 className="chart-title">Threat Monitor</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="content-table">
            <thead>
              <tr>
                <th>Incident</th>
                <th>Severity</th>
                <th>Response</th>
                <th style={{ textAlign: 'right' }}>Trend</th>
              </tr>
            </thead>
            <tbody>
              {contentWinners.map((item) => (
                <React.Fragment key={item.id}>
                  <motion.tr
                    onClick={() => setExpandedRow(expandedRow === item.id ? null : item.id)}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    style={{ cursor: 'pointer' }}
                  >
                    <td style={{ maxWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: '3px',
                            height: '20px',
                            background:
                              item.severity === 'critical'
                                ? '#ff6b5b'
                                : item.severity === 'elevated'
                                  ? '#fbbf24'
                                  : '#f97316',
                          }}
                        />
                        <span className="truncate">{item.title}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          background:
                            item.severity === 'critical'
                              ? 'rgba(255, 107, 91, 0.2)'
                              : item.severity === 'elevated'
                                ? 'rgba(251, 191, 36, 0.2)'
                                : 'rgba(249, 115, 22, 0.2)',
                          color:
                            item.severity === 'critical'
                              ? '#ff6b5b'
                              : item.severity === 'elevated'
                                ? '#fbbf24'
                                : '#f97316',
                        }}
                      >
                        {item.severity}
                      </span>
                    </td>
                    <td>{item.engagement}</td>
                    <td style={{ textAlign: 'right', color: '#10b981' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                        <TrendingUp size={14} />
                        {item.trend}
                      </div>
                    </td>
                  </motion.tr>

                  {/* Expandable Detail Row */}
                  <AnimatePresence>
                    {expandedRow === item.id && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <td colSpan="4">
                          <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
                              <div>
                                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                  TYPE
                                </div>
                                <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '600' }}>
                                  {item.type}
                                </div>
                              </div>
                              <div>
                                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                  ENGAGEMENT RATE
                                </div>
                                <div style={{ fontSize: '13px', color: '#00d9ff', fontWeight: '600' }}>
                                  {item.engagement}
                                </div>
                              </div>
                            </div>
                            <button
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                background: 'var(--accent-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 20px rgba(255, 107, 91, 0.3)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                              }}
                            >
                              INVESTIGATE INCIDENT
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Strategist Readout */}
      <motion.div
        className="chart-card card-3d"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <div className="chart-header">
          <h3 className="chart-title">System Status</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {strategistInsights.map((insight, idx) => (
            <motion.div
              key={insight.title}
              style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.45 + idx * 0.05 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    {insight.title}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                    {insight.value}
                  </div>
                </div>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'var(--accent-primary)',
                    opacity: 0.1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronRight size={20} style={{ color: 'var(--accent-primary)' }} />
                </div>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.4' }}>
                {insight.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '20px' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          VIEW DETAILED REPORT
        </motion.button>
      </motion.div>
    </motion.section>
  );
}
