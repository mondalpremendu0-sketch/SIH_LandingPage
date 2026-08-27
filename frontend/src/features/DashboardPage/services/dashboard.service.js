/**
 * Dashboard Mock Data Service
 * Deterministic, editorial-focused social intelligence data
 *
 * No Math.random() - all data is seeded and predictable
 */

// Seeded pseudo-random for consistent data
const hash = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

/**
 * Generate deterministic follower growth data
 */
function generateFollowerData(days = 7) {
  const data = [];
  const baseTime = new Date('2024-08-20');
  const baseFollowers = 650000;

  for (let i = 0; i < days; i++) {
    const date = new Date(baseTime);
    date.setDate(date.getDate() + i);

    // Deterministic growth with weekly pattern
    const dayOfWeek = date.getDay();
    const weekMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 1.3 : 1.0; // Weekend boost
    const growth = Math.floor(hash(i * 7.3) * 5000 * weekMultiplier);
    const followers = baseFollowers + (i * 3000) + growth;

    // Impressions derived from followers
    const impressions = Math.floor(followers * (hash(i * 11.1) * 0.6 + 0.8));

    // Engagement derived
    const engagement = Math.floor(hash(i * 13.7) * followers * 0.15);
    const engagementRate = (engagement / impressions * 100).toFixed(2);

    data.push({
      date,
      followers,
      impressions,
      engagement,
      engagementRate: parseFloat(engagementRate),
      reach: Math.floor(impressions * (hash(i * 17.2) * 0.4 + 0.6)),
      linkClicks: Math.floor(engagement * (hash(i * 19.5) * 0.3 + 0.2))
    });
  }

  return data;
}

/**
 * Generate channel distribution data
 */
function generateChannelData() {
  const channels = [
    { name: 'Instagram', value: 1100000 * 0.35, color: '#E1306C' },
    { name: 'TikTok', value: 1100000 * 0.28, color: '#000000' },
    { name: 'LinkedIn', value: 1100000 * 0.22, color: '#0A66C2' },
    { name: 'YouTube', value: 1100000 * 0.10, color: '#FF0000' },
    { name: 'Other', value: 1100000 * 0.05, color: '#9CA3AF' }
  ];
  return channels;
}

/**
 * Generate content performance data
 */
function generateContentData() {
  const contents = [
    {
      id: 1,
      title: 'The 15-second rule for better hooks',
      channel: 'TikTok',
      reach: 168400,
      engagement: 21400,
      rate: 12.7,
      type: 'Short-form video',
      date: '2024-08-27',
      views: 384000
    },
    {
      id: 2,
      title: 'Three ways to make your next launch feel bigger',
      channel: 'Instagram',
      reach: 124800,
      engagement: 13100,
      rate: 10.5,
      type: 'Carousel',
      date: '2024-08-26',
      views: 289000
    },
    {
      id: 3,
      title: 'Why your audience is asking for more',
      channel: 'LinkedIn',
      reach: 98300,
      engagement: 8900,
      rate: 9.1,
      type: 'Article',
      date: '2024-08-25',
      views: 156000
    },
    {
      id: 4,
      title: 'Behind the scenes: Content strategy for growth',
      channel: 'YouTube',
      reach: 156000,
      engagement: 12300,
      rate: 7.9,
      type: 'Video',
      date: '2024-08-24',
      views: 234000
    },
    {
      id: 5,
      title: 'What we learned from 50K+ interactions this month',
      channel: 'Instagram',
      reach: 112400,
      engagement: 9800,
      rate: 8.7,
      type: 'Reel',
      date: '2024-08-23',
      views: 201000
    }
  ];

  return contents;
}

/**
 * Get dashboard data by time range
 */
export const getDashboardData = (timeRange = '7d') => {
  let days = 7;
  if (timeRange === '30d') days = 30;
  if (timeRange === '90d') days = 90;

  const audienceData = generateFollowerData(days);
  const channelData = generateChannelData();
  const contentData = generateContentData();

  // Calculate summary metrics
  const latestData = audienceData[audienceData.length - 1];
  const previousData = audienceData[0];
  const followerGrowth = ((latestData.followers - previousData.followers) / previousData.followers * 100).toFixed(1);
  const avgEngagementRate = (audienceData.reduce((sum, d) => sum + d.engagementRate, 0) / audienceData.length).toFixed(1);
  const totalImpressions = audienceData.reduce((sum, d) => sum + d.impressions, 0);
  const totalEngagement = audienceData.reduce((sum, d) => sum + d.engagement, 0);

  return {
    timeRange,
    metrics: {
      followers: {
        value: latestData.followers,
        change: parseFloat(followerGrowth),
        label: 'TOTAL FOLLOWERS'
      },
      engagement: {
        value: parseFloat(avgEngagementRate),
        change: 1.2,
        label: 'ENGAGEMENT RATE'
      },
      impressions: {
        value: totalImpressions,
        change: 8.5,
        label: 'IMPRESSIONS'
      },
      clicks: {
        value: audienceData.reduce((sum, d) => sum + d.linkClicks, 0),
        change: 15.3,
        label: 'LINK CLICKS'
      }
    },
    audienceData,
    channelData,
    contentData,
    lastSynced: new Date(Date.now() - 15 * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  };
};

/**
 * Search across content and channels
 */
export const searchDashboard = (query) => {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  const { contentData, channelData } = getDashboardData();

  const results = [];

  // Search content
  contentData.forEach(content => {
    if (content.title.toLowerCase().includes(lowerQuery)) {
      results.push({
        type: 'content',
        id: content.id,
        title: content.title,
        subtitle: content.channel,
        relevance: 0.95
      });
    }
  });

  // Search channels
  channelData.forEach(channel => {
    if (channel.name.toLowerCase().includes(lowerQuery)) {
      results.push({
        type: 'channel',
        id: channel.name,
        title: channel.name,
        subtitle: `${(channel.value / 1000000).toFixed(1)}M reach`,
        relevance: 0.9
      });
    }
  });

  return results.slice(0, 5);
};

/**
 * Get strategist insights based on data
 */
export const getStrategistInsights = () => {
  const { audienceData, contentData, channelData } = getDashboardData();

  // Find best performing channel
  const bestChannel = channelData.reduce((prev, current) =>
    prev.value > current.value ? prev : current
  );

  // Find top content
  const topContent = contentData.reduce((prev, current) =>
    prev.reach > current.reach ? prev : current
  );

  return {
    momentum: 'Short-form video is carrying the week.',
    actionable: 'Double down on the format before the signal cools. The strongest post is outperforming the median by a meaningful margin.',
    bestChannel: bestChannel.name,
    bestChannelEngagement: '6.8%',
    nextReview: 'Thursday',
    nextReviewDesc: 'Content pulse check',
    topPerformer: topContent.title,
    topPerformerChannel: topContent.channel
  };
};
