import React from "react";
import { PlayCircle, ArrowRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import TiltCard from "./TiltCard";

export default function OverviewTab({
  isDarkMode,
  momentumData,
  mixData,
  winnersData,
}) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full space-y-6">
      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          {/* <p className="text-xs font-bold tracking-widest text-red-600 dark:text-red-500 mb-2 sm:mb-4 uppercase">
            Threat Briefing{" "}
            <span className="text-gray-400 dark:text-gray-600 font-normal mx-2">
              |
            </span>{" "}
            <span className="text-gray-600 dark:text-gray-400">
              Week 35 • 02:50 AM
            </span>
          </p> */}
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2 sm:mb-4 ${isDarkMode ? "text-white" : "text-gray-950"}`}
          >
            Your Audience is{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-500 dark:to-orange-400 inline-block drop-shadow-sm">
              leaning in
            </span>
          </h2>
          <p className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300">
            A focused telemetry readout on network signals and targeted risks
            mapped last week.
          </p>
        </div>
        <div
          className={`text-left md:text-right p-4 rounded-xl border shadow-sm ${isDarkMode ? "bg-[#14171E] border-gray-700" : "bg-white border-gray-300"}`}
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">
            Last Synced
          </p>
          <p
            className={`text-xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-950"}`}
          >
            02:48 AM
          </p>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <TiltCard isDarkMode={isDarkMode}>
          <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
            Monitored Targets
          </p>
          <div className="text-3xl font-extrabold mb-3 text-cyan-700 dark:text-cyan-400">
            69.1K
          </div>
          <div className="inline-block px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-4 border border-emerald-300 dark:border-emerald-500/30">
            +12.4%{" "}
            <span className="font-semibold opacity-90">vs. previous week</span>
          </div>
          <div className="flex space-x-1 h-6 items-end">
            {[4, 6, 8, 5, 7, 9, 12, 15, 14, 18, 20].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-cyan-600 dark:bg-cyan-500 rounded-t-sm"
                style={{ height: `${h * 4}px` }}
              ></div>
            ))}
          </div>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
            Threat Velocity
          </p>
          <div className="text-3xl font-extrabold mb-3 text-red-600 dark:text-red-500">
            6.8%
          </div>
          <div className="inline-block px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-4 border border-emerald-300 dark:border-emerald-500/30">
            +12.1%{" "}
            <span className="font-semibold opacity-90">vs. previous week</span>
          </div>
          <div className="flex space-x-1 h-6 items-end">
            {[12, 10, 14, 15, 11, 18, 16, 20, 19, 22, 24].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-red-600 dark:bg-red-500 rounded-t-sm"
                style={{ height: `${h * 3}px` }}
              ></div>
            ))}
          </div>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
            Intelligence Hits
          </p>
          <div className="text-3xl font-extrabold mb-3 text-indigo-700 dark:text-indigo-400">
            1.1M
          </div>
          <div className="inline-block px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-4 border border-emerald-300 dark:border-emerald-500/30">
            +24.7%{" "}
            <span className="font-semibold opacity-90">vs. previous week</span>
          </div>
          <div className="flex space-x-1 h-6 items-end">
            {[8, 12, 10, 16, 14, 19, 22, 25, 28, 30, 26].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-indigo-600 dark:bg-indigo-500 rounded-t-sm"
                style={{ height: `${h * 2}px` }}
              ></div>
            ))}
          </div>
        </TiltCard>

        <TiltCard isDarkMode={isDarkMode}>
          <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
            Risk Triggers
          </p>
          <div className="text-3xl font-extrabold mb-3 text-emerald-700 dark:text-emerald-400">
            32.8K
          </div>
          <div className="inline-block px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-4 border border-emerald-300 dark:border-emerald-500/30">
            +8.8%{" "}
            <span className="font-semibold opacity-90">vs. previous week</span>
          </div>
          <div className="flex space-x-1 h-6 items-end">
            {[5, 7, 6, 9, 11, 10, 14, 16, 15, 18, 20].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-600 dark:bg-emerald-500 rounded-t-sm"
                style={{ height: `${h * 3}px` }}
              ></div>
            ))}
          </div>
        </TiltCard>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TiltCard className="lg:col-span-2" isDarkMode={isDarkMode}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <div>
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Evaluation Trajectory
              </p>
              <h3
                className={`text-xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-950"}`}
              >
                Network risk momentum
              </h3>
            </div>
            <div
              className={`flex rounded-lg p-1 border shadow-inner ${isDarkMode ? "bg-[#0B0D12] border-gray-700" : "bg-gray-200 border-gray-300"}`}
            >
              <button className="px-3 py-1 text-sm rounded-md font-bold text-gray-700 dark:text-gray-300">
                7d
              </button>
              <button className="px-3 py-1 text-sm rounded-md font-bold text-gray-700 dark:text-gray-300">
                30d
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-md font-extrabold shadow-sm ${isDarkMode ? "bg-[#1F2430] text-white border border-gray-600" : "bg-white text-gray-950 border border-gray-300"}`}
              >
                90d
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={momentumData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={isDarkMode ? "#2A2F3D" : "#cbd5e1"}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: isDarkMode ? "#9ca3af" : "#334155",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: isDarkMode ? "#9ca3af" : "#334155",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                  dx={-10}
                  tickFormatter={(val) => `${val}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#14171E" : "#ffffff",
                    borderRadius: "8px",
                    border: isDarkMode
                      ? "1px solid #374151"
                      : "1px solid #cbd5e1",
                  }}
                  itemStyle={{
                    color: isDarkMode ? "#fff" : "#030712",
                    fontWeight: 700,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="impressions"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="followers"
                  stroke="#10B981"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap space-x-6 mt-4 justify-center">
            <div className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300">
              <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2 shadow-sm"></span>{" "}
              Monitored Entities
            </div>
            <div className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300">
              <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2 shadow-sm"></span>{" "}
              Intelligence Hits
            </div>
          </div>
        </TiltCard>

        <TiltCard className="lg:col-span-1" isDarkMode={isDarkMode}>
          <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            Threat Distribution
          </p>
          <h3
            className={`text-xl font-extrabold mb-4 ${isDarkMode ? "text-white" : "text-gray-950"}`}
          >
            Vector mix
          </h3>
          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mixData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {mixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                Total Vectors
              </p>
              <p
                className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-gray-950"}`}
              >
                1.1M
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {mixData.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center font-bold text-gray-800 dark:text-gray-200">
                  <span
                    className="w-3 h-3 rounded-full mr-2 shadow-sm"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  {item.name}
                </div>
                <span
                  className={`font-extrabold ${isDarkMode ? "text-white" : "text-gray-950"}`}
                >
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </TiltCard>
      </div>

      {/* RESPONSIVE BOTTOM SECTION: TOP PERFORMING CONTENT / TACTICAL WINNERS */}
      <TiltCard isDarkMode={isDarkMode}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Tactical Highlights
            </p>
            <h3
              className={`text-xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-950"}`}
            >
              Top performing content wins
            </h3>
          </div>
          <button className="flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
            View full analytics log <ArrowRight size={14} className="ml-1.5" />
          </button>
        </div>

        {/* Horizontal scroll support for smaller displays */}
        <div className="overflow-x-auto w-full">
          <div className="min-w-[700px] text-left text-sm">
            <div className="grid grid-cols-12 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pb-3 border-b border-gray-300 dark:border-gray-700">
              <div className="col-span-4">Content / Payload Signal</div>
              <div className="col-span-2">Format</div>
              <div className="col-span-2">Channel</div>
              <div className="col-span-1 text-right">Reach</div>
              <div className="col-span-1 text-right">Eng.</div>
              <div className="col-span-2 text-right">Engagement Rate</div>
            </div>
            {winnersData.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 items-center py-4 border-b border-gray-200 dark:border-gray-800 text-xs font-medium px-1"
              >
                <div
                  className={`col-span-4 font-bold flex items-center pr-2 ${isDarkMode ? "text-white" : "text-gray-950"}`}
                >
                  <PlayCircle
                    size={15}
                    className="mr-2 text-blue-500 flex-shrink-0"
                  />
                  <span className="truncate">{item.post}</span>
                </div>
                <div className="col-span-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                    {item.format}
                  </span>
                </div>
                <div className="col-span-2 text-gray-600 dark:text-gray-400 font-semibold">
                  {item.channel}
                </div>
                <div className="col-span-1 text-right font-mono font-bold text-gray-800 dark:text-gray-200">
                  {item.reach}
                </div>
                <div className="col-span-1 text-right font-mono font-bold text-gray-800 dark:text-gray-200">
                  {item.eng}
                </div>
                <div className="col-span-2 text-right font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                  {item.rate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </TiltCard>
    </div>
  );
}
