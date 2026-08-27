import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function KPICards() {
  const [tiltCards, setTiltCards] = useState({});
  const cardsRef = useRef({});

  const kpis = [
    {
      id: 'followers',
      label: 'Active Signals',
      value: '2,847',
      badge: '+12.5%',
      color: 'var(--accent-secondary)',
      description: 'Real-time network nodes',
    },
    {
      id: 'engagement',
      label: 'Detection Rate',
      value: '94.2%',
      badge: '+3.2%',
      color: 'var(--accent-primary)',
      description: 'Threat identification accuracy',
    },
    {
      id: 'impressions',
      label: 'Risk Score',
      value: '7.3/10',
      badge: '-1.8%',
      color: 'var(--accent-tertiary)',
      description: 'Network vulnerability index',
    },
    {
      id: 'clicks',
      label: 'Response Time',
      value: '240ms',
      badge: '-45ms',
      color: '#06d6a0',
      description: 'Average incident response',
    },
  ];

  const handleMouseMove = (cardId, e) => {
    const card = cardsRef.current[cardId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation
    const rotateX = ((y - rect.height / 2) / rect.height) * 15;
    const rotateY = ((x - rect.width / 2) / rect.width) * -15;

    setTiltCards((prev) => ({
      ...prev,
      [cardId]: { rotateX, rotateY },
    }));
  };

  const handleMouseLeave = (cardId) => {
    setTiltCards((prev) => ({
      ...prev,
      [cardId]: { rotateX: 0, rotateY: 0 },
    }));
  };

  return (
    <motion.section
      className="kpi-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.id}
          ref={(el) => (cardsRef.current[kpi.id] = el)}
          className="kpi-card card-3d-interactive"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          onMouseMove={(e) => handleMouseMove(kpi.id, e)}
          onMouseLeave={() => handleMouseLeave(kpi.id)}
          style={{
            '--rotate-x': `${tiltCards[kpi.id]?.rotateX || 0}deg`,
            '--rotate-y': `${tiltCards[kpi.id]?.rotateY || 0}deg`,
          }}
        >
          {/* Shine effect overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(255,255,255,0.15) 0%, transparent 70%)',
              borderRadius: '12px',
              pointerEvents: 'none',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
            className="shine-overlay"
          />

          <div className="kpi-label">{kpi.label}</div>

          <div className="kpi-value" style={{ color: kpi.color }}>
            {kpi.value}
          </div>

          <div className="kpi-badge" style={{ background: `${kpi.color}20`, color: kpi.color }}>
            {kpi.badge}
          </div>

          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>
            {kpi.description}
          </p>

          {/* Sparkline chart placeholder */}
          <svg className="kpi-chart" viewBox="0 0 100 40" preserveAspectRatio="none">
            <polyline
              points={`0,${30 + Math.sin(0) * 10} ${25},${20 + Math.sin(1) * 10} ${50},${25 + Math.sin(2) * 10} ${75},${15 + Math.sin(3) * 10} ${100},${10}`}
              fill="none"
              stroke={kpi.color}
              strokeWidth="1.5"
              opacity="0.6"
            />
          </svg>
        </motion.div>
      ))}
    </motion.section>
  );
}
