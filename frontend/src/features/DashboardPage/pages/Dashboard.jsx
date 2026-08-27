import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Settings, LogOut, X, Home, Shield, Radar, AlertCircle } from 'lucide-react';
import { WorkspaceHeader } from '../components/WorkspaceHeader';
import { ThreatOverview } from '../components/ThreatOverview';
import { ThreatTimeline } from '../components/ThreatTimeline';
import { IntelligenceGraph } from '../components/IntelligenceGraph';
import { NetworkTopology } from '../components/NetworkTopology';
import { TargetedRisk } from '../components/TargetedRisk';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('nexus-theme');
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
  });
  const [activeNav, setActiveNav] = useState('overview');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const reduceMotion = useReducedMotion();

  // Sync theme
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('nexus-theme', theme);
  }, [theme]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'threats', label: 'Threats', icon: AlertCircle },
    { id: 'intel', label: 'Intelligence', icon: Radar },
    { id: 'network', label: 'Network', icon: Shield }
  ];

  const toolItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="dashboard-shell">
      {/* Sidebar */}
      <motion.aside
        className={`dashboard-sidebar ${sidebarOpen ? 'is-open' : 'is-closed'}`}
        initial={!reduceMotion && !isMobile ? { x: -280 } : false}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="nexus-brand">
            <span className="brand-icon">⬟</span>
            <span className="brand-text">TRINITY</span>
          </div>
          {isMobile && (
            <button
              className="sidebar-close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="sidebar-section">
          <span className="section-label">INTELLIGENCE</span>
          <div className="nav-items">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeNav === item.id ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveNav(item.id);
                  if (isMobile) setSidebarOpen(false);
                }}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Tools Section */}
        <nav className="sidebar-section">
          <span className="section-label">TOOLS</span>
          <div className="nav-items">
            {toolItems.map((item) => (
              <button
                key={item.id}
                className="nav-item"
                onClick={() => {
                  if (isMobile) setSidebarOpen(false);
                }}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* System Status */}
        <div className="sidebar-status">
          <div className="status-title">SYSTEM STATUS</div>
          <div className="status-items">
            <div className="status-indicator">
              <span className="status-dot active"></span>
              <span className="status-text">All systems operational</span>
            </div>
            <p className="status-message">
              Threat intelligence feeds active and synchronized.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <button className="sidebar-logout" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="dashboard-main-wrapper">
        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Header */}
        <WorkspaceHeader
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          theme={theme}
          onThemeChange={handleThemeChange}
        />

        {/* Main Content Scrollable */}
        <main className="dashboard-main">
          <div className="workspace-grid-bg" />

          {/* Threat Overview */}
          <ThreatOverview />

          {/* Threat Timeline */}
          <ThreatTimeline />

          {/* Intelligence Graph */}
          <IntelligenceGraph />

          {/* Network Topology */}
          <NetworkTopology />

          {/* Targeted Risk */}
          <TargetedRisk />
        </main>
      </div>
    </div>
  );
}
