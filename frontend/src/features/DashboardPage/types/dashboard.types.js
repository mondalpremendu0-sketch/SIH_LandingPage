/**
 * Dashboard type definitions for better code documentation
 */

export const DateRanges = {
  '24H': '24h',
  '7D': '7d',
  '30D': '30d',
  '90D': '90d'
};

export const Platforms = {
  ALL: 'all',
  X: 'x',
  TELEGRAM: 'telegram',
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  REDDIT: 'reddit',
  YOUTUBE: 'youtube'
};

export const PlatformLabels = {
  [Platforms.ALL]: 'All',
  [Platforms.X]: 'X',
  [Platforms.TELEGRAM]: 'Telegram',
  [Platforms.INSTAGRAM]: 'Instagram',
  [Platforms.FACEBOOK]: 'Facebook',
  [Platforms.REDDIT]: 'Reddit',
  [Platforms.YOUTUBE]: 'YouTube'
};

export const SignalSeverity = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  INFO: 'info',
  POSITIVE: 'positive'
};
