import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Dashboard3D.css';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import HeroSection from './components/HeroSection';
import KPICards from './components/KPICards';
import ChartsSection from './components/ChartsSection';
import BottomSection from './components/BottomSection';
import CursorSpotlight from './components/CursorSpotlight';

export default function Dashboard3D() {
  const [theme, setTheme] = useState('dark');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    // Load saved theme
    const saved = localStorage.getItem('dashboard-theme');
    if (saved) setTheme(saved);
    else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });

    // Set CSS variables for cursor position
    document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="dashboard-3d" ref={containerRef}>
      <CursorSpotlight cursorPos={cursorPos} />

      <Sidebar theme={theme} />

      <div className="main-content">
        <TopHeader theme={theme} onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />

        <motion.div
          className="content-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <HeroSection />
          <KPICards />
          <ChartsSection />
          <BottomSection />
        </motion.div>
      </div>
    </div>
  );
}
