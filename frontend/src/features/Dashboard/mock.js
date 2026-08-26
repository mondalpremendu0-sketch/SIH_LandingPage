export const overviewMock = {
  metrics: [
    { id: "conversations", label: "Conversations", value: "12.4M", change: "+18.4%", direction: "positive", note: "vs. previous period" },
    { id: "sentiment", label: "Sentiment index", value: "68.4", change: "+6.2%", direction: "positive", note: "weighted across sources" },
    { id: "velocity", label: "Trend velocity", value: "+42%", change: "Rising", direction: "positive", note: "narrative acceleration" },
    { id: "influence", label: "Influence nodes", value: "8.7K", change: "+12.8%", direction: "positive", note: "active network clusters" },
  ],
  activity: [18, 22, 20, 28, 31, 26, 34, 39, 36, 44, 48, 42, 52, 49, 58, 63, 55, 69, 74, 68, 79, 86, 78, 92],
  activityLabels: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
  narratives: [
    { rank: "01", topic: "AI regulation", velocity: "184%", sentiment: "mixed", platforms: ["X", "Telegram"] },
    { rank: "02", topic: "Digital privacy", velocity: "121%", sentiment: "positive", platforms: ["Reddit", "X"] },
    { rank: "03", topic: "Open-source AI", velocity: "96%", sentiment: "positive", platforms: ["YouTube", "X"] },
    { rank: "04", topic: "Platform governance", velocity: "74%", sentiment: "mixed", platforms: ["Telegram", "Reddit"] },
  ],
  audience: [
    { label: "18-24", value: 28 },
    { label: "25-34", value: 41 },
    { label: "35-44", value: 18 },
    { label: "45-54", value: 9 },
    { label: "55+", value: 4 },
  ],
  signals: [
    { id: "signal-1", type: "SIGNAL DETECTED", title: "AI regulation", description: "Conversation volume accelerated 184%.", timestamp: "12 sec ago", severity: "high", platforms: ["X", "Telegram"] },
    { id: "signal-2", type: "SENTIMENT SHIFT", title: "Positive sentiment", description: "Increased 8.4% in the last hour.", timestamp: "28 sec ago", severity: "medium", platforms: ["Reddit", "X"] },
    { id: "signal-3", type: "NETWORK CLUSTER", title: "New influence cluster", description: "Detected across X and Telegram.", timestamp: "43 sec ago", severity: "low", platforms: ["X", "Telegram"] },
  ],
};

const platformMultiplier = { ALL: 1, X: 0.62, TELEGRAM: 0.34, INSTAGRAM: 0.22, FACEBOOK: 0.18, REDDIT: 0.29, YOUTUBE: 0.25 };
const rangeMultiplier = { "24H": 1, "7D": 1.18, "30D": 1.42, "90D": 1.7 };

export function getFilteredOverview({ platform = "ALL", dateRange = "24H" } = {}) {
  const scale = platformMultiplier[platform] * rangeMultiplier[dateRange];
  const visible = (item) => platform === "ALL" || item.platforms.includes(platform);
  const metricScale = (value) => `${(Number.parseFloat(value) * scale).toFixed(value.includes("M") ? 1 : 0)}${value.includes("M") ? "M" : value.includes("K") ? "K" : ""}`;
  return {
    ...overviewMock,
    metrics: overviewMock.metrics.map((metric) => ({ ...metric, value: metric.id === "velocity" ? `+${Math.round(42 * scale)}%` : metricScale(metric.value), change: metric.id === "velocity" ? "Rising" : `+${Math.round(Number.parseFloat(metric.change) * scale)}%` })),
    activity: overviewMock.activity.map((value) => Math.max(4, Math.round(value * scale))),
    narratives: overviewMock.narratives.filter(visible).map((item, index) => ({ ...item, rank: String(index + 1).padStart(2, "0"), velocity: `${Math.round(Number.parseFloat(item.velocity) * scale)}%` })).sort((a, b) => Number.parseFloat(b.velocity) - Number.parseFloat(a.velocity)),
    audience: overviewMock.audience.map((item) => ({ ...item, value: Math.max(2, Math.round(item.value * (platform === "ALL" ? 1 : 0.88) * (dateRange === "24H" ? 1 : 1.03))) })),
    signals: overviewMock.signals.filter(visible),
  };
}
