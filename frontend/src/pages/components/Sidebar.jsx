import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Sidebar({ theme }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'workspace', label: 'Workspace', icon: '◆' },
    { id: 'tools', label: 'Tools', icon: '⚙' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'reports', label: 'Reports', icon: '📄' },
  ];

  const toolItems = [
    { id: 'goals', label: 'Goals' },
    { id: 'settings', label: 'Settings' },
    { id: 'integrations', label: 'Integrations' },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-250 p-2 rounded-lg bg-bg-secondary border border-border-color hover:bg-white/10 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <motion.div
          className="md:hidden fixed inset-0 bg-black/50 z-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`sidebar ${isOpen ? 'open' : ''}`}
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="sidebar-header">
          <h2 className="sidebar-title">SIGNAL ROOM</h2>
          <p className="sidebar-subtitle">Command Center</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          {/* Workspace Section */}
          <div className="nav-section">
            <label className="nav-label">Workspace</label>
            <div className="nav-items">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`nav-item ${item.id === 'workspace' ? 'active' : ''}`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div className="nav-section">
            <label className="nav-label">Tools</label>
            <div className="nav-items">
              {toolItems.map((item) => (
                <motion.button
                  key={item.id}
                  className="nav-item"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>→</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          {/* Pulse Status */}
          <div className="pulse-status">
            <div className="pulse-indicator">
              <div className="pulse-dot" />
              <span className="pulse-text">SYSTEM ACTIVE</span>
            </div>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
              All signals monitoring
            </p>
          </div>

          {/* User Profile */}
          <div className="user-profile">
            <div className="user-avatar">SN</div>
            <div className="user-info">
              <div className="user-name">Signal</div>
              <div className="user-role">Operator</div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
