/**
 * Threat Intelligence Service
 * Deterministic mock data for intelligence platform
 * Never uses Math.random() - all data is seeded and predictable
 */

// Seeded pseudo-random
const hash = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

/**
 * Generate deterministic threat data
 */
export const getThreatOverview = () => {
  const baseTime = new Date('2026-08-27T08:00:00Z');

  return {
    activeThreatCount: 27,
    critical: 4,
    elevated: 9,
    monitored: 14,
    threatLevel: 'ELEVATED',
    riskScore: 78,
    trendDirection: 'up',
    lastUpdated: new Date(baseTime.getTime() + 2 * 60 * 60 * 1000),
    overTime: [
      { time: '00:00', threats: 18 },
      { time: '04:00', threats: 22 },
      { time: '08:00', threats: 24 },
      { time: '12:00', threats: 26 },
      { time: '16:00', threats: 27 },
      { time: '20:00', threats: 27 },
    ]
  };
};

/**
 * Generate threat timeline events
 */
export const getThreatTimeline = (limit = 12) => {
  const baseTime = new Date('2026-08-27T10:04:00Z');
  const events = [];

  const eventTemplates = [
    { type: 'NETWORK_ANOMALY', severity: 'elevated', description: 'Elevated network anomaly detected' },
    { type: 'ENTITY_RELATIONSHIP', severity: 'elevated', description: 'Suspicious entity relationship identified' },
    { type: 'RISK_SCORE_CHANGE', severity: 'critical', description: 'Risk score increased for target' },
    { type: 'SIGNAL_DETECTED', severity: 'moderate', description: 'New reconnaissance signal detected' },
    { type: 'CONNECTION_CHANGE', severity: 'moderate', description: 'Network topology change observed' },
    { type: 'THREAT_ACTOR', severity: 'critical', description: 'Known threat actor activity detected' },
    { type: 'VULNERABILITY', severity: 'elevated', description: 'Critical vulnerability identified' },
    { type: 'POLICY_VIOLATION', severity: 'moderate', description: 'Security policy violation logged' },
  ];

  for (let i = 0; i < limit; i++) {
    const seed = i * 17.3;
    const templateIdx = Math.floor(hash(seed + 100) * eventTemplates.length);
    const template = eventTemplates[templateIdx];

    const timeOffset = Math.floor(hash(seed) * 720) * 60000; // Random in past 12 hours
    const eventTime = new Date(baseTime.getTime() - timeOffset);

    events.push({
      id: `threat-${i}`,
      type: template.type,
      severity: template.severity,
      timestamp: eventTime,
      description: template.description,
      source: `Source-${Math.floor(hash(seed + 50) * 5) + 1}`,
      status: hash(seed + 200) > 0.3 ? 'Active' : 'Resolved',
      confidence: Math.round(hash(seed + 150) * 100) + 60,
    });
  }

  return events.sort((a, b) => b.timestamp - a.timestamp);
};

/**
 * Generate intelligence graph nodes and edges
 */
export const getIntelligenceGraph = () => {
  const nodeTypes = ['TARGET', 'ENTITY', 'SOURCE', 'SIGNAL', 'LOCATION', 'ORGANIZATION', 'EVENT'];
  const relTypes = ['associated_with', 'observed_by', 'connected_to', 'influences', 'originates_from'];

  // Generate deterministic nodes
  const nodes = [
    { id: 'tgt-alpha', type: 'TARGET', label: 'Target Alpha', importance: 95, confidence: 92, riskScore: 92 },
    { id: 'tgt-beta', type: 'TARGET', label: 'Target Beta', importance: 88, confidence: 94, riskScore: 81 },
    { id: 'tgt-gamma', type: 'TARGET', label: 'Target Gamma', importance: 72, confidence: 79, riskScore: 67 },

    { id: 'ent-001', type: 'ENTITY', label: 'Entity-001', importance: 75, confidence: 85, riskScore: 64 },
    { id: 'ent-002', type: 'ENTITY', label: 'Entity-002', importance: 68, confidence: 88, riskScore: 71 },
    { id: 'ent-003', type: 'ENTITY', label: 'Entity-003', importance: 62, confidence: 82, riskScore: 58 },

    { id: 'src-recon', type: 'SOURCE', label: 'Recon Network', importance: 80, confidence: 91, riskScore: 76 },
    { id: 'src-signals', type: 'SOURCE', label: 'Signal Source', importance: 71, confidence: 84, riskScore: 69 },

    { id: 'sig-001', type: 'SIGNAL', label: 'Signal-001', importance: 65, confidence: 79, riskScore: 62 },
    { id: 'sig-002', type: 'SIGNAL', label: 'Signal-002', importance: 58, confidence: 76, riskScore: 55 },

    { id: 'loc-001', type: 'LOCATION', label: 'Location-A', importance: 55, confidence: 88, riskScore: 52 },
    { id: 'loc-002', type: 'LOCATION', label: 'Location-B', importance: 48, confidence: 81, riskScore: 45 },

    { id: 'org-001', type: 'ORGANIZATION', label: 'Organization X', importance: 72, confidence: 86, riskScore: 68 },
  ];

  // Generate deterministic edges
  const edges = [
    { source: 'tgt-alpha', target: 'ent-001', type: 'associated_with', strength: 0.95 },
    { source: 'tgt-alpha', target: 'ent-002', type: 'influences', strength: 0.87 },
    { source: 'tgt-alpha', target: 'src-recon', type: 'observed_by', strength: 0.92 },
    { source: 'tgt-alpha', target: 'sig-001', type: 'connected_to', strength: 0.88 },

    { source: 'tgt-beta', target: 'ent-002', type: 'associated_with', strength: 0.91 },
    { source: 'tgt-beta', target: 'ent-003', type: 'connected_to', strength: 0.84 },
    { source: 'tgt-beta', target: 'src-signals', type: 'observed_by', strength: 0.89 },
    { source: 'tgt-beta', target: 'sig-002', type: 'originates_from', strength: 0.85 },

    { source: 'tgt-gamma', target: 'ent-001', type: 'connected_to', strength: 0.76 },
    { source: 'tgt-gamma', target: 'loc-001', type: 'associated_with', strength: 0.72 },

    { source: 'ent-001', target: 'src-recon', type: 'observed_by', strength: 0.88 },
    { source: 'ent-002', target: 'org-001', type: 'associated_with', strength: 0.82 },

    { source: 'src-recon', target: 'sig-001', type: 'originates_from', strength: 0.91 },
    { source: 'src-signals', target: 'sig-002', type: 'originates_from', strength: 0.89 },

    { source: 'sig-001', target: 'loc-001', type: 'connected_to', strength: 0.79 },
    { source: 'sig-002', target: 'loc-002', type: 'connected_to', strength: 0.76 },

    { source: 'loc-001', target: 'org-001', type: 'associated_with', strength: 0.81 },
  ];

  return {
    nodes,
    edges,
    clusters: generateClusters(nodes, edges),
  };
};

/**
 * Generate network clusters
 */
function generateClusters(nodes, edges) {
  const clusters = [];
  const visited = new Set();

  // Simple clustering based on node connections
  nodes.forEach(node => {
    if (!visited.has(node.id)) {
      const cluster = [node];
      visited.add(node.id);

      // Find connected nodes
      edges.forEach(edge => {
        if (edge.source === node.id && !visited.has(edge.target)) {
          const targetNode = nodes.find(n => n.id === edge.target);
          if (targetNode) {
            cluster.push(targetNode);
            visited.add(edge.target);
          }
        }
      });

      clusters.push({
        id: `cluster-${clusters.length}`,
        nodes: cluster,
        riskLevel: Math.round((cluster.reduce((sum, n) => sum + n.riskScore, 0) / cluster.length)),
      });
    }
  });

  return clusters;
}

/**
 * Generate network topology nodes
 */
export const getNetworkTopology = () => {
  const nodes = [];
  const edges = [];

  // Create network nodes with positions
  const positions = generateNetworkPositions(15);

  for (let i = 0; i < 15; i++) {
    const seed = i * 13.7;
    nodes.push({
      id: `node-${i}`,
      label: `Node-${String(i + 1).padStart(2, '0')}`,
      type: ['gateway', 'server', 'client', 'router', 'firewall'][Math.floor(hash(seed) * 5)],
      risk: Math.round(hash(seed + 50) * 100),
      confidence: Math.round(hash(seed + 100) * 100) + 40,
      x: positions[i].x,
      y: positions[i].y,
      z: Math.floor(hash(seed + 150) * 20),
      signals: Math.floor(hash(seed + 200) * 10) + 1,
      connections: Math.floor(hash(seed + 250) * 8) + 2,
    });
  }

  // Create edges
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (hash(i * 100 + j * 50) > 0.7) {
        edges.push({
          source: nodes[i].id,
          target: nodes[j].id,
          strength: hash(i * 50 + j * 100) * 100,
          type: hash(i + j) > 0.5 ? 'communication' : 'data_flow',
        });
      }
    }
  }

  return { nodes, edges };
};

/**
 * Generate deterministic network positions
 */
function generateNetworkPositions(count) {
  const positions = [];
  const centerX = 0;
  const centerY = 0;
  const radius = 40;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const r = radius * (0.5 + hash(i * 11) * 0.5);
    positions.push({
      x: centerX + Math.cos(angle) * r,
      y: centerY + Math.sin(angle) * r,
    });
  }

  return positions;
}

/**
 * Generate targeted risks
 */
export const getTargetedRisks = () => {
  const targets = [
    {
      id: 'tgt-001',
      name: 'Target Alpha',
      riskScore: 92,
      confidence: 88,
      signals: 12,
      connections: 24,
      likelihood: 'CRITICAL',
      impact: 'CRITICAL',
      trend: 'increasing',
      lastActivity: new Date('2026-08-27T10:04:00Z'),
      riskFactors: ['Multiple signals', 'Active reconnaissance', 'Known threat actor'],
    },
    {
      id: 'tgt-002',
      name: 'Target Beta',
      riskScore: 81,
      confidence: 94,
      signals: 8,
      connections: 17,
      likelihood: 'ELEVATED',
      impact: 'CRITICAL',
      trend: 'stable',
      lastActivity: new Date('2026-08-27T09:42:00Z'),
      riskFactors: ['Entity relationship', 'Signal pattern'],
    },
    {
      id: 'tgt-003',
      name: 'Target Gamma',
      riskScore: 67,
      confidence: 79,
      signals: 6,
      connections: 13,
      likelihood: 'ELEVATED',
      impact: 'HIGH',
      trend: 'decreasing',
      lastActivity: new Date('2026-08-27T08:17:00Z'),
      riskFactors: ['Observable connection'],
    },
    {
      id: 'tgt-004',
      name: 'Target Delta',
      riskScore: 54,
      confidence: 71,
      signals: 4,
      connections: 9,
      likelihood: 'MODERATE',
      impact: 'HIGH',
      trend: 'stable',
      lastActivity: new Date('2026-08-27T07:33:00Z'),
      riskFactors: ['Weak signal'],
    },
  ];

  return targets.sort((a, b) => b.riskScore - a.riskScore);
};

/**
 * Generate risk progression over time
 */
export const getRiskProgression = (targetId, days = 7) => {
  const data = [];
  const baseTime = new Date('2026-08-20T00:00:00Z');

  for (let i = 0; i < days; i++) {
    const seed = `${targetId}-${i}` * 1;
    const baseRisk = 50 + hash(seed) * 40;
    const variance = hash(seed + 1000) * 10;

    data.push({
      date: new Date(baseTime.getTime() + i * 24 * 60 * 60 * 1000),
      risk: Math.round(baseRisk + (i * 2) + variance),
      signals: Math.floor(hash(seed + 500) * 8) + 2,
      confidence: Math.round(hash(seed + 1500) * 30 + 65),
    });
  }

  return data;
};

/**
 * Search threats
 */
export const searchThreats = (query) => {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  const { nodes } = getIntelligenceGraph();
  const targets = getTargetedRisks();

  const results = [];

  // Search targets
  targets.forEach(target => {
    if (target.name.toLowerCase().includes(lowerQuery)) {
      results.push({
        type: 'target',
        id: target.id,
        title: target.name,
        subtitle: `Risk: ${target.riskScore}`,
        relevance: 0.95,
      });
    }
  });

  // Search nodes
  nodes.forEach(node => {
    if (node.label.toLowerCase().includes(lowerQuery)) {
      results.push({
        type: 'entity',
        id: node.id,
        title: node.label,
        subtitle: `Risk: ${node.riskScore}`,
        relevance: 0.9,
      });
    }
  });

  return results.slice(0, 5);
};
