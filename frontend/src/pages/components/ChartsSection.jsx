import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ChartsSection() {
  const [activeTimeRange, setActiveTimeRange] = useState('30d');
  const canvasRef = useRef(null);

  // Draw line chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = 500;
    const height = 200;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Generate deterministic data
    const dataPoints = 12;
    const data = Array.from({ length: dataPoints }, (_, i) => {
      const base = 45 + i * 5;
      const variance = Math.sin(i * 0.5) * 15;
      return base + variance;
    });

    // Draw line chart
    ctx.strokeStyle = 'var(--accent-secondary)';
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((value, i) => {
      const x = (i / (dataPoints - 1)) * width;
      const y = height - (value / 100) * height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Fill area under curve
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 217, 255, 0.1)';
    ctx.fill();

    // Draw data points
    ctx.fillStyle = '#00d9ff';
    data.forEach((value, i) => {
      const x = (i / (dataPoints - 1)) * width;
      const y = height - (value / 100) * height;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [activeTimeRange]);

  const timeRanges = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
  ];

  return (
    <motion.section
      className="charts-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Audience Momentum Chart */}
      <motion.div
        className="chart-card card-3d"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="chart-header">
          <h3 className="chart-title">Signal Momentum</h3>
          <div className="time-toggle">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                className={`time-btn ${activeTimeRange === range.id ? 'active' : ''}`}
                onClick={() => setActiveTimeRange(range.id)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', height: '200px' }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-color)',
            fontSize: '11px',
            color: 'var(--text-muted)',
          }}
        >
          <span>Peak: 87.3 signals/sec</span>
          <span>Avg: 64.2 signals/sec</span>
          <span>Min: 42.1 signals/sec</span>
        </div>
      </motion.div>

      {/* Channel Mix Donut Chart */}
      <motion.div
        className="chart-card card-3d"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="chart-header">
          <h3 className="chart-title">Threat Distribution</h3>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '160px' }}>
          <svg width="140" height="140" viewBox="0 0 140 140">
            {/* Critical - Red */}
            <circle
              cx="70"
              cy="70"
              r="50"
              fill="none"
              stroke="#ff6b5b"
              strokeWidth="20"
              strokeDasharray="78.5 314"
              strokeDashoffset="0"
              transform="rotate(-90 70 70)"
            />
            {/* Elevated - Amber */}
            <circle
              cx="70"
              cy="70"
              r="50"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="20"
              strokeDasharray="47.1 314"
              strokeDashoffset="-78.5"
              transform="rotate(-90 70 70)"
            />
            {/* Moderate - Orange */}
            <circle
              cx="70"
              cy="70"
              r="50"
              fill="none"
              stroke="#f97316"
              strokeWidth="20"
              strokeDasharray="62.8 314"
              strokeDashoffset="-125.6"
              transform="rotate(-90 70 70)"
            />
            {/* Low - Green */}
            <circle
              cx="70"
              cy="70"
              r="50"
              fill="none"
              stroke="#10b981"
              strokeWidth="20"
              strokeDasharray="125.6 314"
              strokeDashoffset="-188.4"
              transform="rotate(-90 70 70)"
            />

            {/* Center text */}
            <circle cx="70" cy="70" r="30" fill="var(--bg-secondary)" />
            <text
              x="70"
              y="65"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill="var(--text-primary)"
            >
              847
            </text>
            <text
              x="70"
              y="82"
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-muted)"
            >
              Threats
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
          {[
            { label: 'Critical', color: '#ff6b5b', value: '25%' },
            { label: 'Elevated', color: '#fbbf24', value: '15%' },
            { label: 'Moderate', color: '#f97316', value: '20%' },
            { label: 'Low', color: '#10b981', value: '40%' },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: item.color,
                }}
              />
              <span style={{ color: 'var(--text-secondary)' }}>
                {item.label}
                <span style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>{item.value}</span>
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
