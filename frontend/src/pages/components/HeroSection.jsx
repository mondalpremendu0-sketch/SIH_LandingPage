import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const weekNumber = Math.ceil((now.getDate() - now.getDay() + 7) / 7);

  return (
    <motion.section
      className="hero-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="hero-tag">📡 SIGNAL BRIEFING</div>

      <h1 className="hero-title">
        Your insights are
        <br />
        <span className="gradient-text">coming alive</span>
      </h1>

      <p className="hero-subtitle">
        Real-time monitoring and analysis of your network signals. Track engagement patterns,
        identify emerging threats, and optimize your operational efficiency across all channels.
      </p>

      <div className="hero-meta">
        <div>
          <div className="hero-sync">Last Sync</div>
          <div className="sync-time">
            {hours}:{minutes} UTC • Week {weekNumber}
          </div>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          🔄 Auto-refreshing every 30s
        </div>
      </div>
    </motion.section>
  );
}
