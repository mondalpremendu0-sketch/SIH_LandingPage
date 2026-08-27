/**
 * Deterministic mock data generation
 * Uses seeded data to ensure consistent, reproducible results
 * No Math.random() - all values are deterministically calculated
 */

// Seeded random number generator for consistent data
// Used throughout deterministic data generation
// (Direct Math.sin used inline for performance)

// Generate a deterministic value within a range
// Note: getValue is a utility function for potential future data generation
// function getValue(seed, min, max) {
//   return min + seededRandom(seed) * (max - min);
// }

// Generate baseline with realistic patterns
function generateBaselineData() {
  const data = [];
  const baseTime = new Date('2024-08-27T00:00:00Z');

  for (let i = 0; i < 96; i++) { // 96 15-minute intervals = 24 hours
    const timestamp = new Date(baseTime.getTime() + i * 15 * 60 * 1000);

    // Create realistic patterns:
    // - Lower traffic during night hours (0-6)
    // - Peak traffic during business hours (9-17)
    // - Recovery hours (18-23)
    const hour = timestamp.getHours();
    let baseMultiplier = 1;

    if (hour < 6) baseMultiplier = 0.3;
    else if (hour < 9) baseMultiplier = 0.6;
    else if (hour < 12) baseMultiplier = 1.2;
    else if (hour < 14) baseMultiplier = 1.1;
    else if (hour < 17) baseMultiplier = 1.3;
    else if (hour < 20) baseMultiplier = 0.9;
    else baseMultiplier = 0.7;

    // Add deterministic variation based on time seed
    const variation = Math.sin(i * 0.3) * 0.2 + 0.8;

    // Base conversation count
    const conversations = Math.floor(60000 * baseMultiplier * variation);

    // Add realistic spikes at specific times (signal events)
    let spikeMultiplier = 1;
    if (i === 28 || i === 52) spikeMultiplier = 1.8; // 2 signal events
    if (i === 65) spikeMultiplier = 1.5;

    const finalConversations = Math.floor(conversations * spikeMultiplier);

    // Calculate sentiment (0-100) with slight variation
    const baseSentiment = 65 + Math.sin(i * 0.2) * 8 - Math.cos(i * 0.1) * 5;
    const sentiment = Math.max(45, Math.min(85, baseSentiment));

    // Calculate velocity (change percentage)
    const velocity = i === 0 ? 0 : (finalConversations - data[i - 1].conversations) / data[i - 1].conversations * 100;

    data.push({
      timestamp,
      conversations: finalConversations,
      sentiment: Math.round(sentiment),
      velocity: Math.round(velocity * 10) / 10,
      platforms: {
        x: Math.floor(finalConversations * 0.35),
        telegram: Math.floor(finalConversations * 0.25),
        instagram: Math.floor(finalConversations * 0.15),
        facebook: Math.floor(finalConversations * 0.12),
        reddit: Math.floor(finalConversations * 0.08),
        youtube: Math.floor(finalConversations * 0.05),
      }
    });
  }

  return data;
}

// Generate 7-day, 30-day, 90-day aggregates
// Note: Function kept for potential future use in data aggregation
// function generateAggregateData(dataPoints, intervalHours) {
//   // Aggregation logic here
// }

// Filter data by time range
// Note: Function kept for potential future use
// function getDataByRange(allData, days) {
//   if (days === 1) return allData; // 24H
//   const hoursToTake = days * 24;
//   return allData.slice(0, Math.min(hoursToTake * 4, allData.length));
// }

// Filter data by platform
function filterByPlatform(dataPoints, platform) {
  if (platform === 'all') return dataPoints;

  return dataPoints.map(point => {
    const platformConversations = point.platforms[platform] || 0;

    return {
      ...point,
      conversations: platformConversations,
      sentiment: point.sentiment + (platform === 'x' ? 3 : platform === 'telegram' ? -2 : 0)
    };
  });
}

// Generate signals based on data
function generateSignals(dataPoints) {
  const signals = [];

  let maxConversations = 0;
  let maxIndex = 0;

  for (let i = 0; i < dataPoints.length; i++) {
    if (dataPoints[i].conversations > maxConversations) {
      maxConversations = dataPoints[i].conversations;
      maxIndex = i;
    }
  }

  // Signal 1: Activity Spike
  if (maxConversations > 80000) {
    signals.push({
      id: 'spike-1',
      title: 'ACTIVITY SPIKE',
      description: 'AI Regulation Discussions',
      severity: 'critical',
      change: '+184%',
      timestamp: dataPoints[maxIndex].timestamp,
      platform: 'x',
      impact: 'high'
    });
  }

  // Signal 2: Sentiment Trend
  const avgSentiment = Math.round(
    dataPoints.reduce((sum, p) => sum + p.sentiment, 0) / dataPoints.length
  );

  if (avgSentiment > 70) {
    signals.push({
      id: 'sentiment-1',
      title: 'POSITIVE SENTIMENT',
      description: 'Product Launch Reception',
      severity: 'positive',
      change: '+12.4%',
      timestamp: dataPoints[dataPoints.length - 1].timestamp,
      platform: 'instagram',
      impact: 'medium'
    });
  }

  // Signal 3: Platform Shift
  signals.push({
    id: 'platform-1',
    title: 'PLATFORM SHIFT',
    description: 'X Engagement Growth',
    severity: 'info',
    change: '+8.7%',
    timestamp: dataPoints[Math.floor(dataPoints.length * 0.7)].timestamp,
    platform: 'x',
    impact: 'medium'
  });

  return signals;
}

// Calculate metrics from data
function calculateMetrics(dataPoints) {
  const total = dataPoints.reduce((sum, p) => sum + p.conversations, 0);
  const avgSentiment = Math.round(
    dataPoints.reduce((sum, p) => sum + p.sentiment, 0) / dataPoints.length
  );

  const velocity = dataPoints.length > 1
    ? ((dataPoints[dataPoints.length - 1].conversations - dataPoints[0].conversations) / dataPoints[0].conversations * 100)
    : 0;

  return {
    totalConversations: total,
    avgSentiment: avgSentiment,
    velocity: Math.round(velocity * 10) / 10,
    activeSignals: generateSignals(dataPoints).length
  };
}

// Main data generation
const BASE_24H_DATA = generateBaselineData();

export const getDashboardData = (dateRange = '24h', platform = 'all') => {
  let data = BASE_24H_DATA;

  // Get data based on date range
  switch (dateRange) {
    case '24h':
      data = BASE_24H_DATA;
      break;
    case '7d':
      // For 7 days, we'd have more data; simulating with repeated pattern
      data = [...BASE_24H_DATA, ...BASE_24H_DATA.map(d => ({
        ...d,
        timestamp: new Date(d.timestamp.getTime() + 24 * 60 * 60 * 1000),
        conversations: Math.floor(d.conversations * (0.9 + Math.sin(d.timestamp.getDate() * 0.5) * 0.2))
      }))].slice(0, 336); // 7 days of 15-min intervals
      break;
    case '30d':
      data = BASE_24H_DATA.map((d, idx) => ({
        ...d,
        conversations: Math.floor(d.conversations * (0.8 + Math.sin(idx * 0.2) * 0.4)),
        sentiment: Math.max(40, Math.min(90, d.sentiment + Math.sin(idx * 0.3) * 10))
      }));
      break;
    case '90d':
      data = BASE_24H_DATA.map((d, idx) => ({
        ...d,
        conversations: Math.floor(d.conversations * (0.6 + Math.sin(idx * 0.1) * 0.6)),
        sentiment: Math.max(35, Math.min(95, d.sentiment + Math.sin(idx * 0.2) * 15))
      }));
      break;
    default:
      data = BASE_24H_DATA;
  }

  // Filter by platform
  const filteredData = filterByPlatform(data, platform);

  return {
    data: filteredData,
    signals: generateSignals(filteredData),
    metrics: calculateMetrics(filteredData)
  };
};

// Get historical data for context
export const getHistoricalContext = () => {
  return {
    previousPeriod: {
      conversations: 8200000,
      sentiment: 62,
      velocity: -8.5
    },
    trend: 'up'
  };
};

// Search through data
export const searchDashboard = (query) => {
  const lowerQuery = query.toLowerCase();

  const topics = [
    { type: 'topic', name: 'AI Regulation', relevance: 0.95 },
    { type: 'topic', name: 'Product Launch', relevance: 0.87 },
    { type: 'topic', name: 'Market Trends', relevance: 0.76 },
    { type: 'entity', name: 'TechCorp', relevance: 0.92 },
    { type: 'entity', name: 'Innovation Labs', relevance: 0.68 },
    { type: 'platform', name: 'X', relevance: 0.98 },
    { type: 'platform', name: 'Telegram', relevance: 0.72 },
  ];

  return topics.filter(item =>
    item.name.toLowerCase().includes(lowerQuery)
  ).sort((a, b) => b.relevance - a.relevance);
};
