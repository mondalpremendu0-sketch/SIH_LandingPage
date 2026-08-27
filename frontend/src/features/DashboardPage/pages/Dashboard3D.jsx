import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Sun,
  Moon,
  FileText,
  ChevronDown,
  LayoutDashboard,
  FlaskConical,
  Users,
  Activity,
  Target,
  Settings,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
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

// --- 3D INTERACTIVE CARD WRAPPER ---
const TiltCard = ({ children, className = "", isDarkMode }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const rotateX = (y - 0.5) * -16;
    const rotateY = (x - 0.5) * 16;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
      boxShadow: isDarkMode
        ? `${-rotateY}px ${rotateX + 10}px 30px rgba(0,0,0,0.3)`
        : `${-rotateY}px ${rotateX + 10}px 30px rgba(0,0,0,0.08)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease-out",
      boxShadow: "none",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl border ${
        isDarkMode
          ? "border-gray-800 bg-[#1C1F26] text-gray-100 shadow-none"
          : "border-gray-200/80 bg-white text-gray-900 shadow-sm"
      } p-6 will-change-transform ${className}`}
      style={style}
    >
      <div
        className={`absolute inset-0 rounded-xl pointer-events-none border ${
          isDarkMode ? "border-white/10" : "border-white/60"
        } mix-blend-overlay`}
      ></div>
      {children}
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
export default function SignalRoomDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("signal_room_theme");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("signal_room_theme", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Global Cursor Spotlight Effect
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const momentumData = [
    { name: "W1", followers: 200, impressions: 300 },
    { name: "W4", followers: 300, impressions: 450 },
    { name: "W8", followers: 400, impressions: 600 },
    { name: "W12", followers: 521, impressions: 818 },
    { name: "W14", followers: 600, impressions: 900 },
  ];

  const mixData = [
    { name: "Instagram", value: 42.1, color: "#FF7A9A" },
    { name: "TikTok", value: 29.0, color: "#00F2FE" },
    { name: "LinkedIn", value: 18.0, color: "#4FACFE" },
    { name: "YouTube", value: 10.9, color: "#FF4B2B" },
  ];

  const winnersData = [
    {
      post: "The 15-second rule for better hooks",
      format: "SHORT-FORM VIDEO",
      date: "OCT 20, 2024",
      channel: "TikTok",
      reach: "180.4K",
      eng: "21.4K",
      rate: "12.7%",
    },
    {
      post: "Three ways to make your next launch feel bigger",
      format: "CAROUSEL",
      date: "OCT 19, 2024",
      channel: "Instagram",
      reach: "124.0K",
      eng: "13.1K",
      rate: "10.8%",
    },
    {
      post: "What a strong creative brief actually contains",
      format: "TEXT POST",
      date: "OCT 18, 2024",
      channel: "LinkedIn",
      reach: "70.8K",
      eng: "6.0K",
      rate: "8.7%",
    },
    {
      post: "Behind the scenes: building a visual system",
      format: "STATIC POST",
      date: "OCT 17, 2024",
      channel: "YouTube",
      reach: "51.3K",
      eng: "3.9K",
      rate: "7.6%",
    },
  ];

  return (
    <div
      className={`min-h-screen flex ${isDarkMode ? "bg-[#0A0B0E]" : "bg-gray-50"} transition-colors duration-500`}
    >
      {/* Dynamic Cursor Spotlight Overlay - Subdued and subtle in light theme */}
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-all duration-500"
        style={{
          mixBlendMode: isDarkMode ? "screen" : "multiply",
          background: isDarkMode
            ? `radial-gradient(550px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 70%)`
            : `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(0, 0, 0, 0.025), transparent 70%)`,
        }}
      />

      {/* --- SIDEBAR --- */}
      <aside
        className={`w-64 flex-shrink-0 flex flex-col justify-between border-r relative z-10 transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#14161C] border-gray-800 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        <div>
          <div className="p-6">
            <h1
              className={`text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              signal room
            </h1>
            <p className="text-[10px] uppercase tracking-widest font-semibold mt-1 text-gray-500">
              Strategic Intelligence
            </p>
          </div>

          <nav className="px-4 space-y-1 mt-4">
            <p className="text-xs font-semibold px-2 mb-2 text-gray-400 uppercase tracking-wider">
              Workspace
            </p>
            <a
              href="#"
              className={`flex items-center px-2 py-2 rounded-md group relative overflow-hidden font-medium ${
                isDarkMode
                  ? "text-white bg-white/10"
                  : "text-blue-700 bg-blue-50"
              }`}
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-md ${isDarkMode ? "bg-blue-500" : "bg-blue-600"}`}
              ></div>
              <LayoutDashboard
                size={18}
                className={`mr-3 ${isDarkMode ? "text-gray-200" : "text-blue-600"}`}
              />{" "}
              Overview
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-md transition-colors"
            >
              <FlaskConical size={18} className="mr-3" /> Content lab
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-md transition-colors"
            >
              <Users size={18} className="mr-3" /> Audience
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-md transition-colors"
            >
              <Activity size={18} className="mr-3" /> Channel health
            </a>

            <p className="text-xs font-semibold px-2 mb-2 mt-8 text-gray-400 uppercase tracking-wider">
              Tools
            </p>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-md transition-colors"
            >
              <Target size={18} className="mr-3" /> Goals
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-md transition-colors"
            >
              <Settings size={18} className="mr-3" /> Settings
            </a>
          </nav>
        </div>

        <div className="p-4 space-y-4">
          <div
            className={`p-4 rounded-xl border relative overflow-hidden ${
              isDarkMode
                ? "bg-white/5 border-white/10 shadow-none"
                : "bg-gray-50 border-gray-200 shadow-inner"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                className={`text-xs font-bold uppercase ${isDarkMode ? "text-white" : "text-gray-700"}`}
              >
                Pulse Status
              </span>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <p
              className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              All channels synced
            </p>
            <p className="text-xs mt-1 text-gray-500">
              Your data is routing cleanly across 4 sources.
            </p>
          </div>

          <div className="flex items-center p-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 mr-3 shadow-sm"></div>
            <div>
              <p
                className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Avery Rhodes
              </p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto text-gray-900 dark:text-gray-100">
        {/* TOP HEADER */}
        <header
          className={`flex justify-between items-center p-6 border-b backdrop-blur-md sticky top-0 z-40 transition-colors duration-300 ${
            isDarkMode
              ? "bg-black/20 border-gray-800"
              : "bg-white/80 border-gray-200"
          }`}
        >
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center text-sm px-3 py-1.5 rounded-full border font-medium shadow-sm ${
                isDarkMode
                  ? "border-gray-800 bg-[#1C1F26] text-gray-200"
                  : "border-gray-200 bg-white text-gray-800"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
              Live workspace
            </div>
            <span className="text-sm font-medium text-gray-500">
              Monday, Oct 21
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
              />
              <input
                type="text"
                placeholder="Search signals"
                className={`pl-9 pr-4 py-1.5 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner transition-all ${
                  isDarkMode
                    ? "border-gray-800 bg-[#1C1F26] text-white focus:bg-[#1C1F26]"
                    : "border-gray-200 bg-gray-50 text-gray-900 focus:bg-white"
                }`}
              />
            </div>

            {/* THEME TOGGLE BUTTON */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full border shadow-sm transition-transform active:scale-95 ${
                isDarkMode
                  ? "border-gray-800 bg-transparent text-amber-400 hover:bg-white/10"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              className={`flex items-center px-3 py-1.5 rounded-md border text-sm font-medium shadow-sm transition-transform active:scale-95 ${
                isDarkMode
                  ? "border-gray-800 bg-transparent text-gray-300 hover:bg-white/10"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <FileText size={16} className="mr-2 text-gray-500" /> PDF
            </button>
            <button
              className={`flex items-center px-3 py-1.5 rounded-md border text-sm font-medium shadow-sm transition-transform active:scale-95 ${
                isDarkMode
                  ? "border-gray-800 bg-[#1C1F26] text-gray-300 hover:bg-white/10"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className="mr-2">Refresh</span>{" "}
              <ChevronDown size={14} className="text-gray-500" />
            </button>
          </div>
        </header>

        <div className="p-8 max-w-[1600px] mx-auto w-full space-y-6">
          {/* HERO SECTION */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-xs font-bold tracking-widest text-red-500 mb-4 uppercase">
                Monday Briefing{" "}
                <span className="text-gray-300 dark:text-gray-600 font-normal mx-2">
                  |
                </span>{" "}
                <span className="text-gray-500">Week 43 • 08:42 AM</span>
              </p>
              <h2
                className={`text-6xl font-extrabold tracking-tight mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Your audience is{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 inline-block drop-shadow-sm">
                  leaning in.
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                A focused read on what moved the room last week — and where the
                next signal is forming.
              </p>
            </div>
            <div
              className={`text-right p-4 rounded-xl border shadow-sm ${isDarkMode ? "bg-transparent border-transparent shadow-none" : "bg-white border-gray-200"}`}
            >
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                Last Synced
              </p>
              <p
                className={`text-xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                9:54 PM
              </p>
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-4 gap-6">
            <TiltCard isDarkMode={isDarkMode}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Total Followers
              </p>
              <div className="text-3xl font-extrabold mb-3 text-cyan-600 dark:text-cyan-500">
                69.1K
              </div>
              <div className="inline-block px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4 border border-emerald-100 dark:border-transparent">
                +12.4%{" "}
                <span className="font-medium opacity-80">
                  vs. previous week
                </span>
              </div>
              <div className="flex space-x-1 h-6 items-end">
                {[4, 6, 8, 5, 7, 9, 12, 15, 14, 18, 20].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-cyan-100 dark:bg-cyan-900 rounded-t-sm"
                    style={{ height: `${h * 4}px` }}
                  ></div>
                ))}
              </div>
            </TiltCard>

            <TiltCard isDarkMode={isDarkMode}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Engagement Rate
              </p>
              <div className="text-3xl font-extrabold mb-3 text-red-500">
                6.8%
              </div>
              <div className="inline-block px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4 border border-emerald-100 dark:border-transparent">
                +12.1%{" "}
                <span className="font-medium opacity-80">
                  vs. previous week
                </span>
              </div>
              <div className="flex space-x-1 h-6 items-end">
                {[12, 10, 14, 15, 11, 18, 16, 20, 19, 22, 24].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-red-100 dark:bg-red-900/50 rounded-t-sm"
                    style={{ height: `${h * 3}px` }}
                  ></div>
                ))}
              </div>
            </TiltCard>

            <TiltCard isDarkMode={isDarkMode}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Impressions
              </p>
              <div className="text-3xl font-extrabold mb-3 text-indigo-600 dark:text-indigo-500">
                1.1M
              </div>
              <div className="inline-block px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4 border border-emerald-100 dark:border-transparent">
                +24.7%{" "}
                <span className="font-medium opacity-80">
                  vs. previous week
                </span>
              </div>
              <div className="flex space-x-1 h-6 items-end">
                {[8, 12, 10, 16, 14, 19, 22, 25, 28, 30, 26].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-indigo-100 dark:bg-indigo-900/50 rounded-t-sm"
                    style={{ height: `${h * 2}px` }}
                  ></div>
                ))}
              </div>
            </TiltCard>

            <TiltCard isDarkMode={isDarkMode}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Link Clicks
              </p>
              <div className="text-3xl font-extrabold mb-3 text-emerald-600 dark:text-emerald-500">
                32.8K
              </div>
              <div className="inline-block px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4 border border-emerald-100 dark:border-transparent">
                +8.8%{" "}
                <span className="font-medium opacity-80">
                  vs. previous week
                </span>
              </div>
              <div className="flex space-x-1 h-6 items-end">
                {[5, 7, 6, 9, 11, 10, 14, 16, 15, 18, 20].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-t-sm"
                    style={{ height: `${h * 3}px` }}
                  ></div>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* CHARTS SECTION */}
          <div className="grid grid-cols-3 gap-6">
            <TiltCard className="col-span-2" isDarkMode={isDarkMode}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Growth Trajectory
                  </p>
                  <h3
                    className={`text-xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Audience momentum
                  </h3>
                </div>
                <div
                  className={`flex rounded-lg p-1 border shadow-inner ${isDarkMode ? "bg-[#14161C] border-gray-800" : "bg-gray-100 border-gray-200"}`}
                >
                  <button className="px-3 py-1 text-sm rounded-md font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                    7d
                  </button>
                  <button className="px-3 py-1 text-sm rounded-md font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                    30d
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md font-bold shadow-sm ${isDarkMode ? "bg-[#2A2E39] text-white border-transparent" : "bg-white text-gray-900 border-gray-200"}`}
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
                      stroke={isDarkMode ? "#333" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 600 }}
                      dx={-10}
                      tickFormatter={(val) => `${val}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1C1F26" : "#fff",
                        borderRadius: "8px",
                        border: isDarkMode ? "none" : "1px solid #e5e7eb",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                      itemStyle={{
                        color: isDarkMode ? "#fff" : "#111827",
                        fontWeight: 600,
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
              <div className="flex space-x-6 mt-4 justify-center">
                <div className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2 shadow-sm"></span>{" "}
                  Followers
                </div>
                <div className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2 shadow-sm"></span>{" "}
                  Impressions
                </div>
              </div>
            </TiltCard>

            <TiltCard className="col-span-1" isDarkMode={isDarkMode}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Share of Attention
              </p>
              <h3
                className={`text-xl font-extrabold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Channel mix
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
                  <p className="text-[10px] font-bold text-gray-500 uppercase">
                    Total Reach
                  </p>
                  <p
                    className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}
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
                    <div className="flex items-center font-medium text-gray-700 dark:text-gray-300">
                      <span
                        className="w-2.5 h-2.5 rounded-full mr-2 shadow-sm"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      {item.name}
                    </div>
                    <span
                      className={`font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* BOTTOM SECTION */}
          <div className="grid grid-cols-3 gap-6 pb-12">
            <TiltCard className="col-span-2" isDarkMode={isDarkMode}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    What Earned the Room
                  </p>
                  <h3
                    className={`text-xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Content winners
                  </h3>
                </div>
                <button
                  className={`flex items-center px-3 py-1.5 text-sm font-semibold rounded-lg border transition-colors shadow-sm ${
                    isDarkMode
                      ? "border-gray-700 bg-[#14161C] hover:bg-gray-800 text-gray-300"
                      : "border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  This week{" "}
                  <ChevronDown size={14} className="ml-2 text-gray-500" />
                </button>
              </div>

              <div className="w-full text-left text-sm border-collapse">
                <div className="grid grid-cols-12 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider pb-3 border-b border-gray-200 dark:border-gray-800">
                  <div className="col-span-6">Post</div>
                  <div className="col-span-2">Channel</div>
                  <div className="col-span-2 text-right">Reach</div>
                  <div className="col-span-2 text-right">Engagement</div>
                </div>
                {winnersData.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 items-center py-4 border-b border-gray-100 dark:border-gray-800/50 group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors rounded-md px-2 -mx-2"
                  >
                    <div className="col-span-6 pr-4">
                      <p
                        className={`font-bold mb-1 group-hover:text-blue-600 transition-colors cursor-pointer ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {row.post}
                      </p>
                      <p className="text-[10px] text-gray-500 font-semibold tracking-wider">
                        {row.format} • {row.date}
                      </p>
                    </div>
                    <div className="col-span-2 font-semibold text-gray-700 dark:text-gray-300">
                      {row.channel}
                    </div>
                    <div
                      className={`col-span-2 text-right font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {row.reach}
                    </div>
                    <div className="col-span-2 text-right flex items-center justify-end">
                      <span
                        className={`font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {row.eng}
                      </span>
                      <span className="ml-2 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-transparent px-1.5 py-0.5 rounded text-xs font-bold">
                        {row.rate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>

            <TiltCard
              className="col-span-1 flex flex-col"
              isDarkMode={isDarkMode}
            >
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Signal Notes
                </p>
                <h3
                  className={`text-xl font-extrabold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Strategist readout
                </h3>
              </div>

              <div
                className={`flex-1 rounded-xl p-5 border shadow-inner transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-[#14161C] border-gray-800 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)]"
                    : "bg-gray-50 border-gray-200 shadow-[inset_0_2px_8px_rgba(0,0,0,0.04)]"
                }`}
              >
                <div className="flex items-center mb-3 text-red-500 font-black text-xs tracking-wider uppercase">
                  <PlayCircle size={16} className="mr-2" /> Momentum Cue
                </div>
                <h4
                  className={`font-extrabold text-lg mb-2 leading-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Short-form video is carrying the week.
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-medium leading-relaxed">
                  Double down on the format before the signal cools. The
                  strongest post is outperforming your median by a meaningful
                  margin.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div
                    className={`p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow ${isDarkMode ? "bg-[#1C1F26] border-gray-700" : "bg-white border-gray-200"}`}
                  >
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                      Most Reach
                    </p>
                    <p
                      className={`font-extrabold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Instagram
                    </p>
                    <p className="text-xs font-bold text-emerald-500 mt-1">
                      8.5% engagement
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow ${isDarkMode ? "bg-[#1C1F26] border-gray-700" : "bg-white border-gray-200"}`}
                  >
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                      Best Review
                    </p>
                    <p
                      className={`font-extrabold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      Thursday
                    </p>
                    <p className="text-xs font-medium text-gray-500 mt-1">
                      Content pulse check
                    </p>
                  </div>
                </div>

                <button
                  className={`w-full flex items-center justify-between px-4 py-2.5 border rounded-lg text-sm font-bold transition-colors group shadow-sm active:scale-[0.98] ${
                    isDarkMode
                      ? "bg-[#2A2E39] border-gray-700 text-gray-300 hover:text-white"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  View full readout{" "}
                  <ArrowRight
                    size5="16"
                    className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
                  />
                </button>
              </div>
            </TiltCard>
          </div>
        </div>
      </main>
    </div>
  );
}
