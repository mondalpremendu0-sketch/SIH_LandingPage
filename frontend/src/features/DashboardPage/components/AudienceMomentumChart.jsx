import { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function AudienceMomentumChart({ data }) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 300 });
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const reduceMotion = useReducedMotion();

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current?.parentElement) {
        const rect = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width: rect.width, height: 300 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (!data || data.length === 0) {
    return <div className="chart-empty">Loading chart...</div>;
  }

  const { width, height } = dimensions;
  const margin = { top: 20, right: 30, bottom: 30, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Find min/max
  const followers = data.map(d => d.followers);
  const maxFollowers = Math.max(...followers);
  const minFollowers = Math.min(...followers) * 0.98;

  // Scale functions
  const xScale = (index) => (index / (data.length - 1)) * innerWidth;
  const yScale = (value) => {
    const range = maxFollowers - minFollowers;
    return innerHeight - ((value - minFollowers) / range) * innerHeight;
  };

  // Build path
  const pathData = data
    .map((point, i) => {
      const x = margin.left + xScale(i);
      const y = margin.top + yScale(point.followers);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Area path
  const areaPath = `${pathData} L ${margin.left + innerWidth} ${margin.top + innerHeight} L ${margin.left} ${margin.top + innerHeight} Z`;

  // Mouse move
  const handleMouseMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left - margin.left;
    const xPercent = Math.max(0, Math.min(1, x / innerWidth));
    const index = Math.round(xPercent * (data.length - 1));

    if (index >= 0 && index < data.length) {
      setHoveredPoint(index);
    }
  };

  const handleClick = () => {
    if (hoveredPoint !== null) {
      setSelectedPoint(hoveredPoint);
    }
  };

  // Grid lines - dashed style
  const gridLines = [];
  for (let i = 0; i <= 4; i++) {
    const y = margin.top + (i / 4) * innerHeight;
    const value = maxFollowers - (i / 4) * (maxFollowers - minFollowers);
    gridLines.push(
      <g key={`grid-${i}`}>
        <line
          x1={margin.left}
          y1={y}
          x2={margin.left + innerWidth}
          y2={y}
          stroke="var(--dash-accent-cyan)"
          strokeWidth="1"
          opacity="0.15"
          strokeDasharray="3,3"
        />
        <text
          x={margin.left - 12}
          y={y}
          textAnchor="end"
          dominantBaseline="middle"
          className="chart-label"
          fontSize="11"
          fill="var(--dash-text-muted)"
          fontFamily="var(--dash-font-mono)"
        >
          {(value / 1000).toFixed(0)}K
        </text>
      </g>
    );
  }

  // X-axis labels
  const xLabels = [];
  for (let i = 0; i <= 4; i++) {
    const index = Math.floor((i / 4) * (data.length - 1));
    const x = margin.left + xScale(index);
    const date = data[index].date;
    xLabels.push(
      <text
        key={`label-${i}`}
        x={x}
        y={margin.top + innerHeight + 20}
        textAnchor="middle"
        dominantBaseline="hanging"
        className="chart-label"
        fontSize="11"
        fill="var(--dash-text-muted)"
        fontFamily="var(--dash-font-mono)"
      >
        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </text>
    );
  }

  return (
    <motion.div
      className="chart-container"
      initial={!reduceMotion ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="audience-chart"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredPoint(null)}
        onClick={handleClick}
      >
        {/* Gradient */}
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--dash-accent-cyan)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--dash-accent-cyan)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {gridLines}

        {/* Area */}
        <path d={areaPath} fill="url(#chartGradient)" />

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="var(--dash-accent-cyan)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {data.map((point, i) => {
          const x = margin.left + xScale(i);
          const y = margin.top + yScale(point.followers);
          const isHovered = i === hoveredPoint;
          const isSelected = i === selectedPoint;

          return (
            <g key={`point-${i}`}>
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 5 : isHovered ? 4 : 3}
                fill="var(--dash-accent-cyan)"
                opacity={isSelected ? 1 : isHovered ? 0.9 : 0.6}
                style={{ transition: 'all 200ms ease', cursor: 'pointer' }}
              />
            </g>
          );
        })}

        {/* Crosshair */}
        {hoveredPoint !== null && (
          <>
            <line
              x1={margin.left + xScale(hoveredPoint)}
              y1={margin.top}
              x2={margin.left + xScale(hoveredPoint)}
              y2={margin.top + innerHeight}
              stroke="var(--dash-accent-cyan)"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.3"
            />
            <line
              x1={margin.left}
              y1={margin.top + yScale(data[hoveredPoint].followers)}
              x2={margin.left + innerWidth}
              y2={margin.top + yScale(data[hoveredPoint].followers)}
              stroke="var(--dash-accent-cyan)"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.3"
            />
          </>
        )}

        {/* X-axis labels */}
        {xLabels}
      </svg>

      {/* Tooltip */}
      {hoveredPoint !== null && (
        <motion.div
          className="chart-tooltip"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            left: `${margin.left + xScale(hoveredPoint)}px`,
            top: `${margin.top + yScale(data[hoveredPoint].followers) - 80}px`
          }}
        >
          <div className="tooltip-date">
            {data[hoveredPoint].date.toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}
          </div>
          <div className="tooltip-row">
            <span>Followers</span>
            <span>{(data[hoveredPoint].followers / 1000).toFixed(0)}K</span>
          </div>
          <div className="tooltip-row">
            <span>Impressions</span>
            <span>{(data[hoveredPoint].impressions / 1000).toFixed(0)}K</span>
          </div>
          <div className="tooltip-row">
            <span>Engagement</span>
            <span>{data[hoveredPoint].engagementRate}%</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
