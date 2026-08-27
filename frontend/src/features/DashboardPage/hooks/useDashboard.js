import { useState, useCallback, useEffect } from 'react';
import { getDashboardData, searchDashboard } from '../data/dashboard.mock';

/**
 * Custom hook for dashboard state management
 * Handles filters, data updates, and interactions
 */
export function useDashboard() {
  const [dateRange, setDateRange] = useState('24h');
  const [platform, setPlatform] = useState('all');
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Update dashboard data when filters change
  useEffect(() => {
    const newData = getDashboardData(dateRange, platform);
    setDashboardData(newData);
    setSelectedPoint(null);
    setHoveredPoint(null);
  }, [dateRange, platform]);

  // Handle search
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results = searchDashboard(query);
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, []);

  // Handle search result selection
  const handleSearchResultClick = useCallback((result) => {
    if (result.type === 'platform') {
      setPlatform(result.name.toLowerCase().replace(' ', ''));
    }
    setIsSearchOpen(false);
    setSearchQuery('');
  }, []);

  // Update filters
  const updateDateRange = useCallback((newRange) => {
    setDateRange(newRange);
  }, []);

  const updatePlatform = useCallback((newPlatform) => {
    setPlatform(newPlatform);
  }, []);

  // Point interactions
  const selectPoint = useCallback((point) => {
    setSelectedPoint(point);
  }, []);

  const hoverPoint = useCallback((point) => {
    setHoveredPoint(point);
  }, []);

  const clearHover = useCallback(() => {
    setHoveredPoint(null);
  }, []);

  return {
    // State
    dateRange,
    platform,
    dashboardData,
    selectedPoint,
    hoveredPoint,
    searchQuery,
    searchResults,
    isSearchOpen,

    // Filters
    updateDateRange,
    updatePlatform,

    // Interactions
    selectPoint,
    hoverPoint,
    clearHover,
    handleSearch,
    handleSearchResultClick,
    setIsSearchOpen
  };
}
