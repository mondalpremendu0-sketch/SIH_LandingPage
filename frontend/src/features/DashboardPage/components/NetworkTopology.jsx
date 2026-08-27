import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getNetworkTopology } from '../services/threat-intelligence.service';

export function NetworkTopology() {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [animationProgress, setAnimationProgress] = useState(0);
  const networkData = getNetworkTopology();

  // Handle canvas resize
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current?.parentElement) {
        const rect = canvasRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width: rect.width, height: 600 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Animation progress
  useEffect(() => {
    if (reduceMotion) {
      setAnimationProgress(1);
      return;
    }

    let frame = 0;
    const animate = () => {
      frame++;
      setAnimationProgress(Math.min(frame / 60, 1));
      if (frame < 60) requestAnimationFrame(animate);
    };

    animate();
  }, [reduceMotion]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    // Clear with subtle gradient (using actual colors, not CSS variables)
    const gradient = ctx.createLinearGradient(0, 0, dimensions.width, dimensions.height);
    gradient.addColorStop(0, '#0f0f1f');
    gradient.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 0.5;
    const gridSize = 50;
    for (let x = 0; x < dimensions.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, dimensions.height);
      ctx.stroke();
    }
    for (let y = 0; y < dimensions.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(dimensions.width, y);
      ctx.stroke();
    }

    // Draw edges
    networkData.edges.forEach(edge => {
      const sourceNode = networkData.nodes.find(n => n.id === edge.source);
      const targetNode = networkData.nodes.find(n => n.id === edge.target);

      if (sourceNode && targetNode) {
        const sx = centerX + sourceNode.x * 8;
        const sy = centerY + sourceNode.y * 8;
        const tx = centerX + targetNode.x * 8;
        const ty = centerY + targetNode.y * 8;

        ctx.strokeStyle = `var(--edge-${edge.type})`;
        ctx.globalAlpha = 0.2 * animationProgress;
        ctx.lineWidth = edge.strength / 50;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });

    // Draw nodes
    networkData.nodes.forEach((node, index) => {
      const x = centerX + node.x * 8;
      const y = centerY + node.y * 8;
      const isHovered = hoveredNode?.id === node.id;
      const isSelected = selectedNode?.id === node.id;

      // Apply animation progress
      const nodeOpacity = Math.min(animationProgress * 1.5, 1);
      ctx.globalAlpha = nodeOpacity;

      const nodeSize = isSelected ? 8 : isHovered ? 6 : 4;

      // Node type color mapping
      const typeColors = {
        gateway: '#ff6b5b',
        server: '#00d9ff',
        client: '#9d4edd',
        router: '#06d6a0',
        firewall: '#fbbf24',
      };

      const color = typeColors[node.type] || '#60a5fa';

      // Glow effect for hovered/selected
      if (isHovered || isSelected) {
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.15 * nodeOpacity;
        ctx.beginPath();
        ctx.arc(x, y, nodeSize * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = nodeOpacity;
      }

      // Main node
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
      ctx.fill();

      // Risk indicator ring
      if (node.risk > 70) {
        ctx.strokeStyle = '#ff6b5b';
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.6 * nodeOpacity;
        ctx.beginPath();
        ctx.arc(x, y, nodeSize + 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = nodeOpacity;
      }

      // Selection ring
      if (isSelected) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, nodeSize + 2.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    });
  }, [dimensions, hoveredNode, selectedNode, networkData.nodes, networkData.edges, animationProgress]);

  // Handle interaction
  const handleCanvasInteraction = (e, isTouch = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = isTouch ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = isTouch ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    let foundNode = null;
    for (const node of networkData.nodes) {
      const nodeX = centerX + node.x * 8;
      const nodeY = centerY + node.y * 8;
      const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);

      if (distance < 20) {
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
      className="network-topology-section"
      initial={!reduceMotion ? { opacity: 0, y: 20 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="section-header">
        <h2>NETWORK TOPOLOGY</h2>
        <p>Connected entities and communication patterns</p>
      </div>

      <div className="network-container">
        <div className="network-canvas-wrapper">
          <canvas
            ref={canvasRef}
            className="network-topology-canvas"
            onMouseMove={handleCanvasInteraction}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => {
              if (hoveredNode) handleNodeClick(hoveredNode);
            }}
            onTouchMove={(e) => handleCanvasInteraction(e, true)}
            style={{ cursor: hoveredNode ? 'pointer' : 'grab' }}
          />
        </div>

        {/* Node Details Panel */}
        {(hoveredNode || selectedNode) && (
          <motion.div
            className="network-details-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="panel-header">
              <div className="panel-label">{(hoveredNode || selectedNode)?.label}</div>
              <div className="panel-type">{(hoveredNode || selectedNode)?.type}</div>
            </div>

            <div className="panel-divider" />

            <div className="panel-stats">
              <div className="stat-item">
                <span className="stat-label">Risk Level</span>
                <div className="stat-bar">
                  <motion.div
                    className={`stat-fill risk-${(hoveredNode || selectedNode)?.risk > 70 ? 'high' : 'medium'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(hoveredNode || selectedNode)?.risk}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="stat-value">{(hoveredNode || selectedNode)?.risk}</span>
              </div>

              <div className="stat-item">
                <span className="stat-label">Confidence</span>
                <div className="stat-bar">
                  <motion.div
                    className="stat-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(hoveredNode || selectedNode)?.confidence}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="stat-value">{(hoveredNode || selectedNode)?.confidence}%</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Signals</span>
                <span className="stat-value">{(hoveredNode || selectedNode)?.signals}</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Connections</span>
                <span className="stat-value">{(hoveredNode || selectedNode)?.connections}</span>
              </div>
            </div>

            <button className="panel-action">Analyze Node</button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
