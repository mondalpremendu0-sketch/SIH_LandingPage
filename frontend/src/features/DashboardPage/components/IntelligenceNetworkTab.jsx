import React from 'react';
import { Network, Share2, Cpu, Zap, Radio, Globe2, ShieldCheck } from 'lucide-react';
import TiltCard from './TiltCard';

export default function IntelligenceNetworkTab({ isDarkMode }) {
  const activeNodes = [
    { nodeName: 'Node-Alpha-EU', region: 'Frankfurt, DE', latency: '12ms', status: 'SYNCHRONIZED', peers: 142, throughput: '4.8 GB/s' },
    { nodeName: 'Node-Beta-NA', region: 'Virginia, US', latency: '44ms', status: 'SYNCHRONIZED', peers: 218, throughput: '7.2 GB/s' },
    { nodeName: 'Node-Gamma-AP', region: 'Tokyo, JP', latency: '88ms', status: 'RELAYING', peers: 94, throughput: '3.1 GB/s' },
    { nodeName: 'Node-Delta-SA', region: 'São Paulo, BR', latency: '112ms', status: 'SYNCHRONIZED', peers: 61, throughput: '1.9 GB/s' },
  ];

  const telemetryFeeds = [
    { id: 'FEED-309', source: 'Global Threat Intel Feed Alpha', type: 'IOC Stream', records: '14.2K / hr', health: 'Optimal' },
    { id: 'FEED-310', source: 'Autonomous Honeypot Array', type: 'Payload Capture', records: '3.8K / hr', health: 'Nominal' },
    { id: 'FEED-311', source: 'Dark Web Cryptographic Crawler', type: 'Signature Feed', records: '890 / hr', health: 'Degraded' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 mb-2 uppercase flex items-center">
            <Network size={14} className="mr-2" /> Decentralized Intelligence Mesh & Sensor Grid
          </p>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
            Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-400">Network</span>
          </h2>
          <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
            Real-time telemetry exchange across global edge nodes, mesh sensor synchronization, and threat feed aggregation.
          </p>
        </div>
        <button className={`w-full sm:w-auto flex items-center justify-center px-4 py-2 rounded-lg border text-xs font-bold transition-all shadow-sm ${
          isDarkMode ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20' : 'bg-indigo-50 border-indigo-300 text-indigo-800 hover:bg-indigo-100'
        }`}>
          <Radio size={14} className="mr-2 animate-pulse" /> Re-sync Mesh Topology
        </button>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Relay Nodes</p>
            <Share2 size={16} className="text-indigo-500" />
          </div>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-1">515 Nodes</div>
          <p className="text-xs text-gray-500 font-medium">99.9% uptime across grid</p>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mesh Throughput</p>
            <Zap size={16} className="text-purple-500" />
          </div>
          <div className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-1">17.0 GB/s</div>
          <p className="text-xs text-gray-500 font-medium">Encrypted telemetry routing</p>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Global Latency</p>
            <Cpu size={16} className="text-cyan-500" />
          </div>
          <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400 mb-1">38.4 ms</div>
          <p className="text-xs text-gray-500 font-medium">Average cross-region ping</p>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Consensus Integrity</p>
            <ShieldCheck size={16} className="text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">100%</div>
          <p className="text-xs text-gray-500 font-medium">Zero signature drift detected</p>
        </TiltCard>
      </div>

      {/* ACTIVE MESH NODES TABLE */}
      <TiltCard isDarkMode={isDarkMode}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Grid Topology</p>
            <h3 className={`text-xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>Active Mesh Nodes</h3>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <div className="min-w-[700px] text-left text-sm">
            <div className="grid grid-cols-12 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-300 dark:border-gray-700">
              <div className="col-span-3">Node Name</div>
              <div className="col-span-3">Region</div>
              <div className="col-span-2">Latency</div>
              <div className="col-span-2">Throughput</div>
              <div className="col-span-2 text-right">Status</div>
            </div>
            {activeNodes.map((node, idx) => (
              <div key={idx} className="grid grid-cols-12 items-center py-4 border-b border-gray-200 dark:border-gray-800 text-xs font-medium px-1">
                <div className={`col-span-3 font-bold flex items-center pr-2 ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                  <Globe2 size={14} className="mr-2 text-indigo-500 flex-shrink-0" />
                  <span className="truncate">{node.nodeName}</span>
                </div>
                <div className="col-span-3 text-gray-700 dark:text-gray-300">{node.region}</div>
                <div className="col-span-2 font-mono text-gray-600 dark:text-gray-400">{node.latency}</div>
                <div className="col-span-2 font-mono text-gray-700 dark:text-gray-300">{node.throughput}</div>
                <div className="col-span-2 text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {node.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TiltCard>

      {/* TELEMETRY FEEDS */}
      <TiltCard isDarkMode={isDarkMode}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Feed Aggregation</p>
            <h3 className={`text-xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>Active Telemetry Feeds</h3>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <div className="min-w-[700px] text-left text-sm">
            <div className="grid grid-cols-12 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-300 dark:border-gray-700">
              <div className="col-span-2">Feed ID</div>
              <div className="col-span-4">Source Name</div>
              <div className="col-span-3">Feed Type</div>
              <div className="col-span-2">Record Volume</div>
              <div className="col-span-1 text-right">Health</div>
            </div>
            {telemetryFeeds.map((feed, idx) => (
              <div key={idx} className="grid grid-cols-12 items-center py-4 border-b border-gray-200 dark:border-gray-800 text-xs font-medium px-1">
                <div className="col-span-2 font-mono font-bold text-indigo-600 dark:text-indigo-400">{feed.id}</div>
                <div className={`col-span-4 font-bold truncate pr-2 ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>{feed.source}</div>
                <div className="col-span-3 text-gray-600 dark:text-gray-400">{feed.type}</div>
                <div className="col-span-2 font-mono text-gray-700 dark:text-gray-300">{feed.records}</div>
                <div className="col-span-1 text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    feed.health === 'Optimal' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {feed.health}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TiltCard>
    </div>
  );
}