import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

/**
 * Dashboard Header with Search and Theme Toggle
 */
export function DashboardHeader({
  searchQuery,
  searchResults,
  isSearchOpen,
  onSearch,
  onSearchResultClick,
  onCloseSearch
}) {
  const reduceMotion = useReducedMotion();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <motion.header
      className="dashboard-header"
      initial={!reduceMotion ? { opacity: 0, y: -12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-header-content">
        <div className="dashboard-branding">
          <h1 className="dashboard-title">NEXUS DASHBOARD</h1>
          <p className="dashboard-subtitle">Conversation Intelligence Platform</p>
        </div>

        {/* Search Bar */}
        <div className={`search-container ${isSearchFocused ? 'is-focused' : ''} ${isSearchOpen ? 'is-open' : ''}`}>
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search topics, entities, platforms..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="search-input"
            aria-label="Search dashboard"
            aria-expanded={isSearchOpen}
            aria-controls="search-results"
          />

          {searchQuery && (
            <motion.button
              className="search-clear"
              onClick={() => {
                onSearch('');
                onCloseSearch();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Clear search"
            >
              <X size={16} />
            </motion.button>
          )}

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {isSearchOpen && searchResults.length > 0 && (
              <motion.div
                id="search-results"
                className="search-results"
                initial={!reduceMotion ? { opacity: 0, y: -8 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={!reduceMotion ? { opacity: 0, y: -8 } : false}
                transition={{ duration: 0.2 }}
              >
                {searchResults.map((result, index) => (
                  <motion.button
                    key={`${result.type}-${result.name}`}
                    className="search-result-item"
                    onClick={() => onSearchResultClick(result)}
                    initial={!reduceMotion ? { opacity: 0, x: -8 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <span className="result-type">{result.type}</span>
                    <span className="result-name">{result.name}</span>
                    <span className="result-relevance">{Math.round(result.relevance * 100)}%</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Header Controls */}
        <div className="dashboard-controls">
          <motion.button
            className="control-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Dashboard settings"
          >
            ⚙️
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
