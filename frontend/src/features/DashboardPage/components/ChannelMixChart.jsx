import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function ChannelMixChart({ data }) {
  const [hoveredChannel, setHoveredChannel] = useState(null);
  const reduceMotion = useReducedMotion();

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const size = 200;
  const radius = size / 2 - 20;
  const innerRadius = radius * 0.6;

  let currentAngle = -Math.PI / 2;
  const segments = [];

  data.forEach((item, index) => {
    const sliceAngle = (item.value / total) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    const startX = Math.cos(startAngle) * radius;
    const startY = Math.sin(startAngle) * radius;
    const endX = Math.cos(endAngle) * radius;
    const endY = Math.sin(endAngle) * radius;

    const innerStartX = Math.cos(startAngle) * innerRadius;
    const innerStartY = Math.sin(startAngle) * innerRadius;
    const innerEndX = Math.cos(endAngle) * innerRadius;
    const innerEndY = Math.sin(endAngle) * innerRadius;

    const largeArc = sliceAngle > Math.PI ? 1 : 0;

    const pathData = [
      `M ${innerStartX} ${innerStartY}`,
      `L ${startX} ${startY}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`,
      `L ${innerEndX} ${innerEndY}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStartX} ${innerStartY}`,
      'Z'
    ].join(' ');

    const percentage = ((item.value / total) * 100).toFixed(1);
    const isHovered = index === hoveredChannel;

    segments.push({
      index,
      path: pathData,
      channel: item.name,
      value: item.value,
      percentage,
      color: item.color,
      isHovered
    });

    currentAngle = endAngle;
  });

  return (
    <motion.div
      className="channel-mix-container"
      initial={!reduceMotion ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="channel-chart-wrapper">
        <svg width={size} height={size} viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`} className="donut-chart">
          <defs>
            <filter id="channelShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {segments.map((segment) => (
            <motion.g
              key={segment.index}
              onMouseEnter={() => setHoveredChannel(segment.index)}
              onMouseLeave={() => setHoveredChannel(null)}
              style={{ cursor: 'pointer' }}
            >
              <motion.path
                d={segment.path}
                fill={segment.color}
                opacity={segment.isHovered ? 1 : 0.8}
                filter="url(#channelShadow)"
                animate={{
                  opacity: segment.isHovered ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.g>
          ))}

          {/* Center circle with total reach */}
          <circle cx="0" cy="0" r={innerRadius} fill="var(--dash-bg-dark-elevated)" opacity="0.6" />
          <text
            x="0"
            y="-8"
            textAnchor="middle"
            dominantBaseline="middle"
            className="center-label"
            fontSize="11"
            fontWeight="600"
            fill="var(--dash-text-muted)"
            letterSpacing="0.08em"
            textTransform="uppercase"
          >
            TOTAL REACH
          </text>
          <text
            x="0"
            y="14"
            textAnchor="middle"
            dominantBaseline="middle"
            className="center-value"
            fontSize="22"
            fontWeight="900"
            fill="var(--dash-text-primary)"
          >
            1.1M
          </text>
        </svg>

        {/* Legend */}
        <div className="channel-legend">
          {data.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1);
            const isHovered = index === hoveredChannel;

            return (
              <motion.div
                key={item.name}
                className="legend-item"
                onMouseEnter={() => setHoveredChannel(index)}
                onMouseLeave={() => setHoveredChannel(null)}
                animate={{
                  opacity: hoveredChannel === null || isHovered ? 1 : 0.5,
                  scale: isHovered ? 1.02 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="legend-color"
                  style={{ backgroundColor: item.color }}
                />
                <span className="legend-name">{item.name}</span>
                <span className="legend-value">{percentage}%</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
