import React from 'react';
import { SearchCheck, Globe, Radar, Terminal, ShieldAlert } from 'lucide-react';
import TiltCard from './TiltCard';

export default function ReconnaissanceTab({ isDarkMode }) {
  const targetNodes = [
    { ip: '198.51.100.42', domain: 'api-gateway.edge-core.net', status: 'ACTIVE', openPorts: '22, 80, 443, 8443', risk: 'Medium', lastScan: '4m ago' },
    { ip: '203.0.113.19', domain: 'auth.identity-vault.io', status: 'MONITORED', openPorts: '443, 6379', risk: 'Low', lastScan: '12m ago' },
    { ip: '198.51.100.88', domain: 'legacy-db.internal.sys', status: 'VULNERABLE', openPorts: '21, 3306, 5432', risk: 'Critical', lastScan: '1m ago' },
    { ip: '203.0.113.204', domain: 'cdn-edge.media-stream.org', status: 'ACTIVE', openPorts: '80, 443', risk: 'Low', lastScan: '28m ago' }
  ];

  const packetStreams = [
    { id: 'REC-9021', type: 'TCP SYN Flood', origin: '45.154.255.88 (AS204957)', target: 'Port 443', action: 'Dropped', time: 'Just now' },
    { id: 'REC-9020', type: 'DNS Zone Transfer Attempt', origin: '185.220.101.7 (Tor Exit)', target: 'Port 53', action: 'Blocked', time: '3m ago' },
    { id: 'REC-9019', type: 'Directory Traversal Probe', origin: '91.240.118.25 (VPN Node)', target: '/api/v1/config', action: 'Challenged', time: '7m ago' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 mb-2 uppercase flex items-center">
            <SearchCheck size={14} className="mr-2" /> Global Asset Discovery & Reconnaissance Matrix
          </p>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
            Reconnaissance <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500 dark:from-cyan-400 dark:to-blue-400">Hub</span>
          </h2>
          <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
            Active perimeter scanning, target surface mapping, and open-port telemetry gathered across monitored routing scopes.
          </p>
        </div>
        <button className={`w-full sm:w-auto flex items-center justify-center px-4 py-2 rounded-lg border text-xs font-bold transition-all shadow-sm ${
          isDarkMode ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20' : 'bg-cyan-50 border-cyan-300 text-cyan-800 hover:bg-cyan-100'
        }`}>
          <Radar size={14} className="mr-2 animate-spin" /> Run Full Surface Sweep
        </button>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Scans</p>
            <Radar size={16} className="text-cyan-500" />
          </div>
          <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400 mb-1">1,248</div>
          <p className="text-xs text-gray-500 font-medium">Continuous background probing</p>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Discovered Endpoints</p>
            <Globe size={16} className="text-blue-500" />
          </div>
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">342 Hosts</div>
          <p className="text-xs text-gray-500 font-medium">Across 8 public ASN blocks</p>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Open Port Vectors</p>
            <Terminal size={16} className="text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mb-1">84 Ports</div>
          <p className="text-xs text-gray-500 font-medium">12 flagged for review</p>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Surface Risk Index</p>
            <ShieldAlert size={16} className="text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">Low (1.4)</div>
          <p className="text-xs text-gray-500 font-medium">Perimeter defenses stable</p>
        </TiltCard>
      </div>

      {/* TARGET NODES TABLE */}
      <TiltCard isDarkMode={isDarkMode}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Surface Enumeration</p>
            <h3 className={`text-xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>Monitored Target Nodes</h3>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <div className="min-w-[700px] text-left text-sm">
            <div className="grid grid-cols-12 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-300 dark:border-gray-700">
              <div className="col-span-3">Target Domain</div>
              <div className="col-span-2">IP Address</div>
              <div className="col-span-3">Open Ports</div>
              <div className="col-span-2">Risk Level</div>
              <div className="col-span-2 text-right">Last Scan</div>
            </div>
            {targetNodes.map((node, idx) => (
              <div key={idx} className="grid grid-cols-12 items-center py-4 border-b border-gray-200 dark:border-gray-800 text-xs font-medium px-1">
                <div className={`col-span-3 font-bold truncate pr-2 ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                  {node.domain}
                </div>
                <div className="col-span-2 font-mono text-gray-600 dark:text-gray-400">{node.ip}</div>
                <div className="col-span-3 font-mono text-gray-700 dark:text-gray-300">{node.openPorts}</div>
                <div className="col-span-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase inline-block ${
                    node.risk === 'Critical' ? 'bg-red-500/20 text-red-500 border border-red-500/30' :
                    node.risk === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {node.risk}
                  </span>
                </div>
                <div className="col-span-2 text-right font-mono text-gray-500">{node.lastScan}</div>
              </div>
            ))}
          </div>
        </div>
      </TiltCard>

      {/* PROBE STREAM */}
      <TiltCard isDarkMode={isDarkMode}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live Packet Interception</p>
            <h3 className={`text-xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>Inbound Probe Stream</h3>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <div className="min-w-[700px] text-left text-sm">
            <div className="grid grid-cols-12 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-300 dark:border-gray-700">
              <div className="col-span-2">Stream ID</div>
              <div className="col-span-4">Probe Signature</div>
              <div className="col-span-3">Origin Source</div>
              <div className="col-span-2 text-center">Defense Action</div>
              <div className="col-span-1 text-right">Time</div>
            </div>
            {packetStreams.map((packet, idx) => (
              <div key={idx} className="grid grid-cols-12 items-center py-4 border-b border-gray-200 dark:border-gray-800 text-xs font-medium px-1">
                <div className="col-span-2 font-mono font-bold text-cyan-600 dark:text-cyan-400">{packet.id}</div>
                <div className={`col-span-4 font-bold ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>{packet.type}</div>
                <div className="col-span-3 font-mono text-gray-600 dark:text-gray-400 truncate">{packet.origin}</div>
                <div className="col-span-2 text-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    {packet.action}
                  </span>
                </div>
                <div className="col-span-1 text-right font-mono text-gray-500">{packet.time}</div>
              </div>
            ))}
          </div>
        </div>
      </TiltCard>
    </div>
  );
}