import React from 'react';
import { motion } from 'framer-motion';
import { Search, Moon, Sun, RefreshCw, Download } from 'lucide-react';

export default function TopHeader({ theme, onThemeToggle }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="top-header">
      {/* Left Section */}
      <div className="header-left">
        <div className="live-indicator">
          <div className="live-dot" />
          <span>LIVE WORKSPACE</span>
        </div>
        <div className="date-chip">{currentDate}</div>
      </div>

      {/* Right Section */}
      <div className="header-right">
        {/* Search Bar */}
        <div className="search-bar">
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search signals..." />
        </div>

        {/* Refresh Button */}
        <motion.button
          className="icon-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Trigger refresh animation
            document.querySelectorAll('.kpi-card').forEach((card) => {
              card.style.animation = 'none';
              setTimeout(() => {
                card.style.animation = '';
              }, 10);
            });
          }}
          title="Refresh data"
        >
          <RefreshCw size={16} />
        </motion.button>

        {/* PDF Export Button */}
        <motion.button
          className="icon-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Export as PDF"
        >
          <Download size={16} />
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          className={`theme-toggle ${theme === 'light' ? 'light' : ''}`}
          onClick={onThemeToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
        >
          <div className="toggle-circle">
            {theme === 'dark' ? (
              <Moon size={14} style={{ margin: 'auto' }} />
            ) : (
              <Sun size={14} style={{ margin: 'auto' }} />
            )}
          </div>
        </motion.button>
      </div>
    </header>
  );
}
