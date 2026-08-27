import { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Conversation Activity Chart
 * Fully functional SVG chart with hover, selection, crosshair, tooltip
 * Responsive and animated
 */
export function ConversationActivityChart({
  data,
  selectedPoint,
  hoveredPoint,
  onPointHover,
  onPointLeave,
  onPointClick,
  height = 280
}) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height });
  const [mousePos, setMousePos] = useState(null);
  const reduceMotion = useReducedMotion();

  // Responsive dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current?.parentElement) {
        const rect = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: height
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [height]);

  if (!data || data.length === 0) {
    return (
      <div className="chart-placeholder">
        <div className="chart-loading">Loading chart data...</div>
      </div>
    );
  }

  const { width, height: chartHeight } = dimensions;
  const margin = { top: 24, right: 32, bottom: 32, left: 56 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = chartHeight - margin.top - margin.bottom;

  // Find min/max for scaling
  const conversations = data.map(d => d.conversations);
  const maxConversations = Math.max(...conversations);
  const minConversations = Math.min(...conversations) * 0.95;

  // Scale functions
  const xScale = (index) => (index / (data.length - 1)) * innerWidth;
  const yScale = (value) => {
    const range = maxConversations - minConversations;
    return innerHeight - ((value - minConversations) / range) * innerHeight;
  };

  // Build path
  const pathData = data
    .map((point, i) => {
      const x = margin.left + xScale(i);
      const y = margin.top + yScale(point.conversations);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Build area path
  const areaPath = `${pathData} L ${margin.left + innerWidth} ${margin.top + innerHeight} L ${margin.left} ${margin.top + innerHeight} Z`;

  // Handle mouse move for tooltip
  const handleMouseMove = (e) => {
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left - margin.left;
    const xPercent = Math.max(0, Math.min(1, x / innerWidth));
    const index = Math.round(xPercent * (data.length - 1));

    if (index >= 0 && index < data.length) {
      onPointHover(data[index]);
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const handleMouseLeave = () => {
    onPointLeave();
    setMousePos(null);
  };

  const handleClick = (e) => {
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left - margin.left;
    const xPercent = Math.max(0, Math.min(1, x / innerWidth));
    const index = Math.round(xPercent * (data.length - 1));

    if (index >= 0 && index < data.length) {
      onPointClick(data[index]);
    }
  };

  // Find hovered/selected indices
  const hoveredIndex = hoveredPoint ? data.indexOf(hoveredPoint) : -1;
  const selectedIndex = selectedPoint ? data.indexOf(selectedPoint) : -1;

  // Get time format
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Grid lines
  const gridLines = Array.from({ length: 5 }).map((_, i) => {
    const y = margin.top + (i / 4) * innerHeight;
    const value = maxConversations - (i / 4) * (maxConversations - minConversations);
    return (
      <g key={`grid-${i}`}>
        <line
          x1={margin.left}
          y1={y}
          x2={margin.left + innerWidth}
          y2={y}
          stroke="var(--color-border-subtle)"
          strokeWidth="1"
        />
        <text
          x={margin.left - 12}
          y={y}
          textAnchor="end"
          dominantBaseline="middle"
          className="chart-label"
          fontSize="12"
          fill="var(--color-text-muted)"
        >
          {(value / 1000).toFixed(0)}K
        </text>
      </g>
    );
  });

  // X-axis labels
  const xLabels = Array.from({ length: 5 }).map((_, i) => {
    const index = Math.floor((i / 4) * (data.length - 1));
    const x = margin.left + xScale(index);
    return (
      <g key={`label-${i}`}>
        <text
          x={x}
          y={margin.top + innerHeight + 20}
          textAnchor="middle"
          dominantBaseline="hanging"
          className="chart-label"
          fontSize="12"
          fill="var(--color-text-muted)"
        >
          {formatTime(data[index].timestamp)}
        </text>
      </g>
    );
  });

  return (
    <motion.div
      className="conversation-activity-chart"
      initial={!reduceMotion ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height={chartHeight}
        className="chart-svg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        viewBox={`0 0 ${width} ${chartHeight}`}
        preserveAspectRatio="none"
      >
        {/* Grid */}
        {gridLines}

        {/* Area under curve */}
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-glow)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-accent-glow)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <path
          d={areaPath}
          fill="url(#chartGradient)"
          className="chart-area"
        />

        {/* Main line */}
        <path
          d={pathData}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="chart-line"
        />

        {/* Data points */}
        {data.map((point, i) => {
          const x = margin.left + xScale(i);
          const y = margin.top + yScale(point.conversations);
          const isHovered = i === hoveredIndex;
          const isSelected = i === selectedIndex;

          return (
            <g key={`point-${i}`}>
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 5 : isHovered ? 4.5 : 3}
                fill={isSelected ? 'var(--color-accent-light)' : isHovered ? 'var(--color-accent)' : 'var(--color-accent)'}
                opacity={isSelected ? 1 : isHovered ? 0.9 : 0.6}
                className="chart-point"
                style={{
                  transition: 'all 200ms ease-out',
                  cursor: 'pointer'
                }}
              />
            </g>
          );
        })}

        {/* Crosshair on hover */}
        {hoveredIndex >= 0 && (
          <>
            <line
              x1={margin.left + xScale(hoveredIndex)}
              y1={margin.top}
              x2={margin.left + xScale(hoveredIndex)}
              y2={margin.top + innerHeight}
              stroke="var(--color-accent)"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.4"
              className="chart-crosshair-vertical"
            />
            <line
              x1={margin.left}
              y1={margin.top + yScale(hoveredPoint.conversations)}
              x2={margin.left + innerWidth}
              y2={margin.top + yScale(hoveredPoint.conversations)}
              stroke="var(--color-accent)"
              strokeWidth="1"
              strokeDasharray="4,4"
              opacity="0.4"
              className="chart-crosshair-horizontal"
            />
          </>
        )}

        {/* X-axis labels */}
        {xLabels}
      </svg>

      {/* Tooltip */}
      {hoveredPoint && mousePos && (
        <motion.div
          className="chart-tooltip"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y - 120}px`
          }}
        >
          <div className="tooltip-time">
            {formatTime(hoveredPoint.timestamp)}
          </div>
          <div className="tooltip-row">
            <span className="tooltip-label">Conversations</span>
            <span className="tooltip-value">
              {(hoveredPoint.conversations / 1000).toFixed(1)}K
            </span>
          </div>
          <div className="tooltip-row">
            <span className="tooltip-label">Sentiment</span>
            <span className="tooltip-value">
              {hoveredPoint.sentiment}
            </span>
          </div>
          <div className="tooltip-row">
            <span className="tooltip-label">Change</span>
            <span className={`tooltip-value ${hoveredPoint.velocity >= 0 ? 'positive' : 'negative'}`}>
              {hoveredPoint.velocity >= 0 ? '+' : ''}{hoveredPoint.velocity.toFixed(1)}%
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
