import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Sliders } from 'lucide-react';
import { DateRanges, Platforms, PlatformLabels } from '../types/dashboard.types';

/**
 * Dashboard Filter Controls
 * Date range, platform selection, and other filters
 */
export function IntelligenceFilters({
  dateRange,
  platform,
  onDateRangeChange,
  onPlatformChange
}) {
  const reduceMotion = useReducedMotion();

  const dateOptions = [
    { value: DateRanges['24H'], label: '24H' },
    { value: DateRanges['7D'], label: '7D' },
    { value: DateRanges['30D'], label: '30D' },
    { value: DateRanges['90D'], label: '90D' }
  ];

  const platformOptions = [
    { value: Platforms.ALL, label: PlatformLabels[Platforms.ALL] },
    { value: Platforms.X, label: PlatformLabels[Platforms.X] },
    { value: Platforms.TELEGRAM, label: PlatformLabels[Platforms.TELEGRAM] },
    { value: Platforms.INSTAGRAM, label: PlatformLabels[Platforms.INSTAGRAM] },
    { value: Platforms.FACEBOOK, label: PlatformLabels[Platforms.FACEBOOK] },
    { value: Platforms.REDDIT, label: PlatformLabels[Platforms.REDDIT] },
    { value: Platforms.YOUTUBE, label: PlatformLabels[Platforms.YOUTUBE] }
  ];

  return (
    <motion.div
      className="intelligence-filters"
      initial={!reduceMotion ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Date Range Filter */}
      <div className="filter-group">
        <label className="filter-label">
          <Calendar size={16} />
          TIME RANGE
        </label>
        <div className="filter-buttons">
          {dateOptions.map(option => (
            <motion.button
              key={option.value}
              className={`filter-button ${dateRange === option.value ? 'is-active' : ''}`}
              onClick={() => onDateRangeChange(option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Platform Filter */}
      <div className="filter-group">
        <label className="filter-label">
          <Sliders size={16} />
          PLATFORM
        </label>
        <div className="filter-buttons platforms">
          {platformOptions.map(option => (
            <motion.button
              key={option.value}
              className={`filter-button ${platform === option.value ? 'is-active' : ''}`}
              onClick={() => onPlatformChange(option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
