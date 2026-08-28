import React from 'react';
import { Activity, ShieldAlert, TrendingUp, BarChart3, AlertTriangle, Layers } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import TiltCard from './TiltCard';

export default function RiskEvolutionTab({ isDarkMode }) {
  const evolutionTimeSeries = [
    { period: 'Jan', baselineRisk: 14.2, activeThreats: 8.1, mitigationRate: 92.4 },
    { period: 'Feb', baselineRisk: 16.8, activeThreats: 11.4, mitigationRate: 89.1 },
    { period: 'Mar', baselineRisk: 22.4, activeThreats: 19.8, mitigationRate: 84.5 },
    { period: 'Apr', baselineRisk: 19.1, activeThreats: 14.2, mitigationRate: 88.2 },
    { period: 'May', baselineRisk: 25.6, activeThreats: 22.9, mitigationRate: 81.0 },
    { period: 'Jun', baselineRisk: 31.2, activeThreats: 28.4, mitigationRate: 78.6 },
  ];

  const vulnerabilityVectors = [
    { id: 'VEC-101', vectorName: 'Unauthenticated API Endpoint Enumeration', category: 'Access Control', severity: 'High', trajectory: '+14% MoM' },
    { id: 'VEC-102', vectorName: 'Container Escape via Shared Kernel Namespace', category: 'Infrastructure', severity: 'Critical', trajectory: '+28% MoM' },
    { id: 'VEC-103', vectorName: 'Credential Stuffing on Legacy SSO Gateway', category: 'Authentication', severity: 'Medium', trajectory: '-5% MoM' },
    { id: 'VEC-104', vectorName: 'Server-Side Request Forgery (SSRF) in Webhooks', category: 'Injection', severity: 'Critical', trajectory: '+19% MoM' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-orange-600 dark:text-orange-400 mb-2 uppercase flex items-center">
            <Activity size={14} className="mr-2" /> Longitudinal Threat Analytics & Exposure Dynamics
          </p>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
            Risk <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500 dark:from-orange-400 dark:to-red-400">Evolution</span>
          </h2>
          <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
            Historical threat trajectory mapping, velocity acceleration patterns, and multi-vector baseline drift analysis.
          </p>
        </div>
        <div className={`flex rounded-lg p-1 border shadow-inner ${isDarkMode ? 'bg-[#0B0D12] border-gray-700' : 'bg-gray-200 border-gray-300'}`}>
          <button className="px-3 py-1 text-xs rounded-md font-bold text-gray-700 dark:text-gray-300">Monthly</button>
          <button className={`px-3 py-1 text-xs rounded-md font-extrabold shadow-sm ${isDarkMode ? 'bg-[#1F2430] text-white border border-gray-600' : 'bg-white text-gray-950 border border-gray-300'}`}>Quarterly</button>
          <button className="px-3 py-1 text-xs rounded-md font-bold text-gray-700 dark:text-gray-300">YTD</button>
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Risk Drift Slope</p>
            <TrendingUp size={16} className="text-orange-500" />
          </div>
          <div className="text-3xl font-black text-orange-600 dark:text-orange-400 mb-1">+18.4%</div>
          <p className="text-xs text-gray-500 font-medium">Escalation velocity vs. baseline</p>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mitigation Efficiency</p>
            <ShieldAlert size={16} className="text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">78.6%</div>
          <p className="text-xs text-gray-500 font-medium">Automated response closure rate</p>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Peak Exposure Index</p>
            <AlertTriangle size={16} className="text-red-500" />
          </div>
          <div className="text-3xl font-black text-red-600 dark:text-red-500 mb-1">31.2 / 50</div>
          <p className="text-xs text-gray-500 font-medium">Recorded during W24 surge</p>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Analyzed Vectors</p>
            <Layers size={16} className="text-blue-500" />
          </div>
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">142 Types</div>
          <p className="text-xs text-gray-500 font-medium">Categorized threat signatures</p>
        </TiltCard>
      </div>

      {/* CHART SECTION: RISK TRAJECTORY AREA CHART */}
      <TiltCard isDarkMode={isDarkMode}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Longitudinal Telemetry</p>
            <h3 className={`text-xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>Exposure vs. Active Threat Escalation</h3>
          </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={evolutionTimeSeries}>
              <defs>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#2A2F3D' : '#cbd5e1'} />
              <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#9ca3af' : '#334155', fontSize: 12, fontWeight: 700}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#9ca3af' : '#334155', fontSize: 12, fontWeight: 700}} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: isDarkMode ? '#14171E' : '#ffffff', borderRadius: '8px', border: isDarkMode ? '1px solid #374151' : '1px solid #cbd5e1' }}
                itemStyle={{ color: isDarkMode ? '#fff' : '#030712', fontWeight: 700 }}
              />
              <Area type="monotone" dataKey="baselineRisk" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" name="Baseline Risk Index" />
              <Area type="monotone" dataKey="activeThreats" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorThreats)" name="Active Threat Vectors" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap space-x-6 mt-4 justify-center">
          <div className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300"><span className="w-3 h-3 rounded-full bg-orange-600 mr-2 shadow-sm"></span> Baseline Risk Index</div>
          <div className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300"><span className="w-3 h-3 rounded-full bg-indigo-500 mr-2 shadow-sm"></span> Active Threat Vectors</div>
        </div>
      </TiltCard>

      {/* VULNERABILITY VECTORS TABLE */}
      <TiltCard isDarkMode={isDarkMode}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Vector Breakdown</p>
            <h3 className={`text-xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>Top Evolving Attack Surfaces</h3>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <div className="min-w-[700px] text-left text-sm">
            <div className="grid grid-cols-12 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-300 dark:border-gray-700">
              <div className="col-span-2">Vector ID</div>
              <div className="col-span-4">Attack Surface Vector</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Severity</div>
              <div className="col-span-2 text-right">Trajectory</div>
            </div>
            {vulnerabilityVectors.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 items-center py-4 border-b border-gray-200 dark:border-gray-800 text-xs font-medium px-1">
                <div className="col-span-2 font-mono font-bold text-orange-600 dark:text-orange-400">{item.id}</div>
                <div className={`col-span-4 font-bold truncate pr-2 ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>{item.vectorName}</div>
                <div className="col-span-2 text-gray-600 dark:text-gray-400">{item.category}</div>
                <div className="col-span-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase inline-block ${
                    item.severity === 'Critical' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <div className={`col-span-2 text-right font-mono font-extrabold ${item.trajectory.startsWith('+') ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {item.trajectory}
                </div>
              </div>
            ))}
          </div>
        </div>
      </TiltCard>
    </div>
  );
}