import React from 'react';
import { ShieldAlert, Shield, AlertTriangle, Server, Cpu, Terminal } from 'lucide-react';
import TiltCard from './TiltCard';

export default function ThreatsTab({ isDarkMode, activeIncidents, backdoorSignatures }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-red-600 dark:text-red-500 mb-2 uppercase flex items-center">
            <ShieldAlert size={14} className="mr-2" /> SOC Incident Response & Vulnerability Telemetry
          </p>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
            Active Threat <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500 dark:from-red-500 dark:to-rose-400">Ledger</span>
          </h2>
          <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
            Real-time network security telemetry, active exploit vectors, and cryptographic signature matches across global edge infrastructure.
          </p>
        </div>
        <div className="flex space-x-3">
          <span className={`flex items-center px-3 py-1.5 rounded-lg border text-xs font-bold ${
            isDarkMode ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <Shield size={14} className="mr-1.5" /> Lockdown: Nominal
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Exploit Signatures</p>
            <AlertTriangle size={16} className="text-red-500" />
          </div>
          <div className="text-3xl font-black text-red-600 dark:text-red-400 mb-1">14 Vectors</div>
          <p className="text-xs text-gray-500 font-medium">3 critical zero-days under active watch</p>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Edge WAF Mitigations</p>
            <Shield size={16} className="text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">99.84%</div>
          <p className="text-xs text-gray-500 font-medium">4.2M malicious packets dropped/hr</p>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Compromised Assets</p>
            <Server size={16} className="text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mb-1">0 Nodes</div>
          <p className="text-xs text-gray-500 font-medium">Core isolation perimeters unbreached</p>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Autonomous Patching</p>
            <Cpu size={16} className="text-blue-500" />
          </div>
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">Active</div>
          <p className="text-xs text-gray-500 font-medium">Next kernel sync in 18 minutes</p>
        </TiltCard>
      </div>

      {/* Responsive Scrollable Container for Tables on Mobile */}
      <TiltCard isDarkMode={isDarkMode}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Real-Time Security Event Stream</p>
            <h3 className={`text-xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>Active Incident Log</h3>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <div className="min-w-[700px] text-left text-sm">
            <div className="grid grid-cols-12 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-300 dark:border-gray-700">
              <div className="col-span-2">Incident ID</div>
              <div className="col-span-4">Attack Vector / Vulnerability</div>
              <div className="col-span-2">Target Node</div>
              <div className="col-span-2">Origin Source</div>
              <div className="col-span-1 text-center">Severity</div>
              <div className="col-span-1 text-right">Status</div>
            </div>
            {activeIncidents.map((incident, idx) => (
              <div key={idx} className="grid grid-cols-12 items-center py-4 border-b border-gray-200 dark:border-gray-800 text-xs font-medium px-1">
                <div className="col-span-2 font-mono font-bold text-blue-600 dark:text-blue-400 flex items-center">
                  <Terminal size={13} className="mr-1.5 text-gray-400 flex-shrink-0" /> {incident.id}
                </div>
                <div className={`col-span-4 font-bold truncate pr-2 ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>{incident.vector}</div>
                <div className="col-span-2 text-gray-700 dark:text-gray-300 font-mono truncate">{incident.target}</div>
                <div className="col-span-2 text-gray-600 dark:text-gray-400 font-mono truncate">{incident.source}</div>
                <div className="col-span-1 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase inline-block ${
                    incident.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {incident.severity}
                  </span>
                </div>
                <div className="col-span-1 text-right font-bold text-emerald-600 dark:text-emerald-400">{incident.status}</div>
              </div>
            ))}
          </div>
        </div>
      </TiltCard>
    </div>
  );
}