import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getIntelligenceGraph } from '../services/threat-intelligence.service';

const nodeTypeColors = {
  TARGET: '#ff6b5b',
  ENTITY: '#00d9ff',
  SOURCE: '#9d4edd',
  SIGNAL: '#06d6a0',
  LOCATION: '#fbbf24',
  ORGANIZATION: '#60a5fa',
  EVENT: '#f97316',
};

export function IntelligenceGraph() {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const graphData = getIntelligenceGraph();

  // Handle canvas resize
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current?.parentElement) {
        const rect = canvasRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width: rect.width, height: 500 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear
    ctx.fillStyle = 'var(--graph-bg)';
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Draw edges
    graphData.edges.forEach(edge => {
      const sourceNode = graphData.nodes.find(n => n.id === edge.source);
      const targetNode = graphData.nodes.find(n => n.id === edge.target);

      if (sourceNode && targetNode) {
        ctx.strokeStyle = `var(--edge-${edge.type})`;
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sourceNode.x + 400, sourceNode.y + 250);
        ctx.lineTo(targetNode.x + 400, targetNode.y + 250);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });

    // Draw nodes
    graphData.nodes.forEach(node => {
      const isHovered = hoveredNode?.id === node.id;
      const isSelected = selectedNode?.id === node.id;
      const size = isSelected ? 8 : isHovered ? 6 : 4;

      // Node glow
      if (isHovered || isSelected) {
        ctx.fillStyle = nodeTypeColors[node.type];
        ctx.globalAlpha = 0.2;
        ctx.beginPath();
        ctx.arc(node.x + 400, node.y + 250, size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Node circle
      ctx.fillStyle = nodeTypeColors[node.type];
      ctx.beginPath();
      ctx.arc(node.x + 400, node.y + 250, size, 0, Math.PI * 2);
      ctx.fill();

      // Node stroke
      if (isSelected) {
        ctx.strokeStyle = nodeTypeColors[node.type];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x + 400, node.y + 250, size + 2, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  }, [dimensions, hoveredNode, selectedNode, graphData.nodes, graphData.edges]);

  // Handle mouse interaction
  const handleCanvasInteraction = (e, isTouch = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = isTouch ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = isTouch ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    // Check collision with nodes
    let foundNode = null;
    for (const node of graphData.nodes) {
      const nodeX = node.x + 400;
      const nodeY = node.y + 250;
      const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);

      if (distance < 15) {
        foundNode = node;
        break;
      }
    }

    setHoveredNode(foundNode);
  };

  const handleNodeClick = (node) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  return (
    <motion.section
      className="intelligence-graph-section"
      initial={!reduceMotion ? { opacity: 0, y: 20 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="section-header">
        <h2>RECONNAISSANCE & INTELLIGENCE</h2>
        <p>Entity relationships and signal network</p>
      </div>

      <div className="graph-container">
        <div className="graph-canvas-wrapper">
          <canvas
            ref={canvasRef}
            className="intelligence-graph-canvas"
            onMouseMove={handleCanvasInteraction}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => {
              if (hoveredNode) handleNodeClick(hoveredNode);
            }}
            onTouchMove={(e) => handleCanvasInteraction(e, true)}
            style={{ cursor: hoveredNode ? 'pointer' : 'default' }}
          />
        </div>

        {/* Legend */}
        <div className="graph-legend">
          <div className="legend-title">Entity Types</div>
          {Object.entries(nodeTypeColors).map(([type, color]) => (
            <div key={type} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: color }}
              />
              <span>{type}</span>
            </div>
          ))}
        </div>

        {/* Details Panel */}
        {(hoveredNode || selectedNode) && (
          <motion.div
            className="graph-details-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="panel-node">
              {hoveredNode || selectedNode}
            </div>
            <div className="panel-label">{(hoveredNode || selectedNode)?.type}</div>
            <div className="panel-divider" />

            <div className="panel-metrics">
              <div className="metric">
                <span className="metric-label">Importance</span>
                <div className="metric-bar">
                  <motion.div
                    className="metric-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(hoveredNode || selectedNode)?.importance}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="metric-value">
                  {(hoveredNode || selectedNode)?.importance}%
                </span>
              </div>

              <div className="metric">
                <span className="metric-label">Confidence</span>
                <div className="metric-bar">
                  <motion.div
                    className="metric-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(hoveredNode || selectedNode)?.confidence}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="metric-value">
                  {(hoveredNode || selectedNode)?.confidence}%
                </span>
              </div>

              <div className="metric">
                <span className="metric-label">Risk Score</span>
                <div className="metric-bar">
                  <motion.div
                    className="metric-fill risk"
                    initial={{ width: 0 }}
                    animate={{ width: `${(hoveredNode || selectedNode)?.riskScore}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="metric-value">
                  {(hoveredNode || selectedNode)?.riskScore}
                </span>
              </div>
            </div>

            <button className="panel-action">Investigate</button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
