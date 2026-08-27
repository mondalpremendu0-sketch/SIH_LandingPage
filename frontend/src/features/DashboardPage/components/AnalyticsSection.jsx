import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getDashboardData } from '../services/dashboard.service';
import { AudienceMomentumChart } from './AudienceMomentumChart';
import { ChannelMixChart } from './ChannelMixChart';

export function AnalyticsSection() {
  const reduceMotion = useReducedMotion();
  const [timeRange, setTimeRange] = useState('7d');
  const data = getDashboardData(timeRange);

  return (
    <motion.section
      className="analytics-section"
      initial={!reduceMotion ? { opacity: 0 } : false}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {/* Time Range Filters */}
      <div className="analytics-filters">
        {['7d', '30d', '90d'].map((range) => (
          <button
            key={range}
            className={`filter-btn ${timeRange === range ? 'is-active' : ''}`}
            onClick={() => setTimeRange(range)}
          >
            {range.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="analytics-grid">
        {/* Left: Audience Momentum (larger) */}
        <motion.div
          className="analytics-item audience-momentum"
          initial={!reduceMotion ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="chart-header">
            <h3>GROWTH TRAJECTORY</h3>
            <p>Audience momentum</p>
          </div>
          <AudienceMomentumChart data={data.audienceData} />
        </motion.div>

        {/* Right: Channel Mix */}
        <motion.div
          className="analytics-item channel-mix"
          initial={!reduceMotion ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="chart-header">
            <h3>SHARE OF ATTENTION</h3>
            <p>Channel mix</p>
          </div>
          <ChannelMixChart data={data.channelData} />
        </motion.div>
      </div>
    </motion.section>
  );
}
