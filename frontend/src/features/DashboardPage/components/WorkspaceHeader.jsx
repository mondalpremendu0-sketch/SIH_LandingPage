import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Search, RotateCcw, Download } from 'lucide-react';
import { ThemeToggle } from '../../../components/ThemeToggle';

export function WorkspaceHeader({ onMenuClick, theme, onThemeChange }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState(new Date(Date.now() - 15 * 60000));
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastSynced(new Date());
      setIsRefreshing(false);
    }, 1200);
  };

  const syncTime = lastSynced.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.header
      className="workspace-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="header-content">
        {/* Left: Menu & Status */}
        <div className="header-left">
          <button
            className="header-menu-btn"
            onClick={onMenuClick}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="header-status">
            <span className="status-dot"></span>
            <span className="status-label">LAST SYNCED</span>
            <span className="status-time">{syncTime}</span>
          </div>
        </div>

        {/* Center: Period Indicator */}
        <div className="header-center">
          <span className="period-label">WEEK 35 · 08:42 AM</span>
        </div>

        {/* Right: Controls */}
        <div className="header-right">
          {/* Search */}
          <div className={`search-control ${searchOpen ? 'is-open' : ''}`}>
            <input
              type="text"
              className="search-input"
              placeholder="Search content, channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => {
                if (!searchQuery) setSearchOpen(false);
              }}
            />
            <Search size={18} className="search-icon" />
          </div>

          {/* Refresh */}
          <motion.button
            className={`header-button refresh-btn ${isRefreshing ? 'is-refreshing' : ''}`}
            onClick={handleRefresh}
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: isRefreshing ? 1 : 0.3 }}
            title="Refresh data"
          >
            <RotateCcw size={18} />
          </motion.button>

          {/* Export */}
          <button className="header-button export-btn" title="Export report">
            <Download size={18} />
          </button>

          {/* Theme Toggle */}
          <div className="theme-toggle-wrapper">
            <ThemeToggle theme={theme} onChange={onThemeChange} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
