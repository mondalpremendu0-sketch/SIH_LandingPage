import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, FileText, Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import OverviewTab from '../components/OverviewTab';
import ThreatsTab from '../components/ThreatsTab';
import ReconnaissanceTab from '../components/ReconnaissanceTab';
import IntelligenceNetworkTab from '../components/IntelligenceNetworkTab';
import RiskEvolutionTab from '../components/RiskEvolutionTab';

export default function Dashboard3D() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('signal_room_theme');
    return saved ? JSON.parse(saved) : false;
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('signal_room_theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const momentumData = [
    { name: 'W1', followers: 200, impressions: 300 },
    { name: 'W4', followers: 300, impressions: 450 },
    { name: 'W8', followers: 400, impressions: 600 },
    { name: 'W12', followers: 521, impressions: 818 },
    { name: 'W14', followers: 600, impressions: 900 },
  ];

  const mixData = [
    { name: 'Instagram', value: 42.1, color: '#FF477E' },
    { name: 'TikTok', value: 29.0, color: '#00D8F0' },
    { name: 'LinkedIn', value: 18.0, color: '#2589FF' },
    { name: 'YouTube', value: 10.9, color: '#FF3B14' },
  ];

  const winnersData = [
    { post: 'The 15-second rule for better hooks', format: 'SHORT-FORM VIDEO', date: 'OCT 20, 2024', channel: 'TikTok', reach: '180.4K', eng: '21.4K', rate: '12.7%' },
  ];

  const activeIncidents = [
    { id: 'INC-8821', vector: 'CVE-2026-2144 (Zero-Day RCE)', target: 'Edge API Gateway-04', source: '185.220.101.5 (Tor Exit)', severity: 'CRITICAL', status: 'Mitigating', timestamp: '14 mins ago' },
  ];

  const backdoorSignatures = [
    { hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', family: 'Mirai.Variant.Krypton', detectionRate: '42 / 64 AV Engines', status: 'Isolated', firstSeen: '2026-08-24' }
  ];

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-[#050608]' : 'bg-gray-100'} transition-colors duration-500`}>
      <div 
        className="pointer-events-none fixed inset-0 z-50 transition-all duration-300 hidden lg:block"
        style={{
          mixBlendMode: isDarkMode ? 'screen' : 'multiply',
          background: isDarkMode
            ? `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.12), transparent 70%)`
            : `radial-gradient(450px circle at var(--mouse-x) var(--mouse-y), rgba(0, 0, 0, 0.08), transparent 70%)`
        }}
      />

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen} 
      />

      <main className="flex-1 flex flex-col h-screen overflow-y-auto text-gray-900 dark:text-gray-100 w-full">
        <header className={`flex justify-between items-center p-4 sm:p-6 border-b backdrop-blur-md sticky top-0 z-40 transition-colors duration-300 ${
          isDarkMode ? 'bg-[#050608]/90 border-gray-800' : 'bg-white/90 border-gray-300'
        }`}>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center text-sm px-3 py-1.5 rounded-full border font-semibold shadow-sm border-gray-700 bg-[#14171E] text-gray-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
              Live workspace
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">Aug 28</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search telemetry..." className={`pl-9 pr-4 py-1.5 rounded-full border text-sm font-medium focus:outline-none ${
                isDarkMode ? 'border-gray-700 bg-[#14171E] text-white' : 'border-gray-300 bg-white text-gray-950'
              }`} />
            </div>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className={`p-2 rounded-full border shadow-sm ${
                isDarkMode ? 'border-gray-700 bg-[#14171E] text-amber-400' : 'border-gray-300 bg-white text-amber-600'
              }`}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            
            <button className={`hidden sm:flex items-center px-3 py-1.5 rounded-md border text-sm font-semibold shadow-sm ${
              isDarkMode ? 'border-gray-700 bg-[#14171E] text-gray-200' : 'border-gray-300 bg-white text-gray-800'
            }`}>
              <FileText size={16} className="mr-2 text-gray-500" /> Export PDF
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <OverviewTab isDarkMode={isDarkMode} momentumData={momentumData} mixData={mixData} winnersData={winnersData} />
        )}
        {activeTab === 'threats' && (
          <ThreatsTab isDarkMode={isDarkMode} activeIncidents={activeIncidents} backdoorSignatures={backdoorSignatures} />
        )}
        {activeTab === 'recon' && (
          <ReconnaissanceTab isDarkMode={isDarkMode} />
        )}
        {activeTab === 'network' && (
          <IntelligenceNetworkTab isDarkMode={isDarkMode} />
        )}
        {activeTab === 'evolution' && (
          <RiskEvolutionTab isDarkMode={isDarkMode} />
        )}
      </main>
    </div>
  );
}