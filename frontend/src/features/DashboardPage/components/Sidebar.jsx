import React from "react";
import {
  LayoutDashboard,
  ShieldAlert,
  SearchCheck,
  Network,
  Activity ,
  BarChart3,
  Target,
  Settings,
  X,
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  isDarkMode,
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex-shrink-0 flex flex-col justify-between border-r transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${
          isDarkMode
            ? "bg-[#0B0D12] border-gray-800 text-gray-100"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      >
        <div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <h1
                className={`text-xl font-extrabold tracking-tight leading-none ${isDarkMode ? "text-white" : "text-gray-950"}`}
              >
                TRINERT
              </h1>
              <p className="text-[10px] uppercase tracking-widest font-bold mt-2 text-gray-400 dark:text-gray-500">
                Strategic Intelligence
              </p>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg border border-gray-700 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="px-4 space-y-1 mt-2">
            <p className="text-xs font-bold px-2 mb-2 text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Workspace
            </p>
            <button
              onClick={() => {
                setActiveTab("overview");
                setMobileOpen(false);
              }}
              className={`w-full flex items-center px-2 py-2 rounded-md group relative font-semibold transition-colors ${
                activeTab === "overview"
                  ? isDarkMode
                    ? "text-white bg-white/15"
                    : "text-blue-800 bg-blue-100/80"
                  : "text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-white/10"
              }`}
            >
              {activeTab === "overview" && (
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-md ${isDarkMode ? "bg-blue-400" : "bg-blue-700"}`}
                ></div>
              )}
              <LayoutDashboard
                size={18}
                className={`mr-3 ${activeTab === "overview" ? (isDarkMode ? "text-white" : "text-blue-700") : "text-gray-500 dark:text-gray-400"}`}
              />{" "}
              Overview
            </button>
            <button
              onClick={() => {
                setActiveTab("threats");
                setMobileOpen(false);
              }}
              className={`w-full flex items-center px-2 py-2 rounded-md group relative font-semibold transition-colors ${
                activeTab === "threats"
                  ? isDarkMode
                    ? "text-white bg-white/15"
                    : "text-blue-800 bg-blue-100/80"
                  : "text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-white/10"
              }`}
            >
              {activeTab === "threats" && (
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-md ${isDarkMode ? "bg-red-400" : "bg-red-700"}`}
                ></div>
              )}
              <ShieldAlert
                size={18}
                className={`mr-3 ${activeTab === "threats" ? (isDarkMode ? "text-red-400" : "text-red-600") : "text-gray-500 dark:text-gray-400"}`}
              />{" "}
              Threats
            </button>
            <button
              onClick={() => {
                setActiveTab("recon");
                setMobileOpen(false);
              }}
              className={`w-full flex items-center px-2 py-2 rounded-md group relative font-semibold transition-colors ${
                activeTab === "recon"
                  ? isDarkMode
                    ? "text-white bg-white/15"
                    : "text-blue-800 bg-blue-100/80"
                  : "text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-white/10"
              }`}
            >
              {activeTab === "recon" && (
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-md ${isDarkMode ? "bg-cyan-400" : "bg-cyan-700"}`}
                ></div>
              )}
              <SearchCheck
                size={18}
                className={`mr-3 ${activeTab === "recon" ? (isDarkMode ? "text-cyan-400" : "text-cyan-600") : "text-gray-500 dark:text-gray-400"}`}
              />{" "}
              Reconnaissance
            </button>

            <button
              onClick={() => {
                setActiveTab("network");
                setMobileOpen(false);
              }}
              className={`w-full flex items-center px-2 py-2 rounded-md group relative font-semibold transition-colors ${
                activeTab === "network"
                  ? isDarkMode
                    ? "text-white bg-white/15"
                    : "text-blue-800 bg-blue-100/80"
                  : "text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-white/10"
              }`}
            >
              {activeTab === "network" && (
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-md ${isDarkMode ? "bg-indigo-400" : "bg-indigo-700"}`}
                ></div>
              )}
              <Network
                size={18}
                className={`mr-3 ${activeTab === "network" ? (isDarkMode ? "text-indigo-400" : "text-indigo-600") : "text-gray-500 dark:text-gray-400"}`}
              />{" "}
              Intelligence Network
            </button>
            <button
              onClick={() => {
                setActiveTab("evolution");
                setMobileOpen(false);
              }}
              className={`w-full flex items-center px-2 py-2 rounded-md group relative font-semibold transition-colors ${
                activeTab === "evolution"
                  ? isDarkMode
                    ? "text-white bg-white/15"
                    : "text-blue-800 bg-blue-100/80"
                  : "text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-white/10"
              }`}
            >
              {activeTab === "evolution" && (
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-md ${isDarkMode ? "bg-orange-400" : "bg-orange-700"}`}
                ></div>
              )}
              <Activity
                size={18}
                className={`mr-3 ${activeTab === "evolution" ? (isDarkMode ? "text-orange-400" : "text-orange-600") : "text-gray-500 dark:text-gray-400"}`}
              />{" "}
              Risk Evolution
            </button>
            <p className="text-xs font-bold px-2 mb-2 mt-8 text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Tools
            </p>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white font-medium hover:bg-gray-200/60 dark:hover:bg-white/10 rounded-md transition-colors"
            >
              <Target
                size={18}
                className="mr-3 text-gray-500 dark:text-gray-400"
              />{" "}
              Targets
            </a>
            <a
              href="#"
              className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white font-medium hover:bg-gray-200/60 dark:hover:bg-white/10 rounded-md transition-colors"
            >
              <Settings
                size={18}
                className="mr-3 text-gray-500 dark:text-gray-400"
              />{" "}
              Settings
            </a>
          </nav>
        </div>

        <div className="p-4 space-y-4">
          <div
            className={`p-4 rounded-xl border relative overflow-hidden ${
              isDarkMode
                ? "bg-white/5 border-gray-800 shadow-none"
                : "bg-gray-50 border-gray-300 shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                className={`text-xs font-bold uppercase ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                Pulse Status
              </span>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <p
              className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-950"}`}
            >
              All nodes active
            </p>
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400 font-medium">
              Risk parameters routing securely.
            </p>
          </div>

          <div className="flex items-center p-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 mr-3 shadow-sm flex items-center justify-center text-white font-bold text-xs">
              AR
            </div>
            <div>
              <p
                className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-950"}`}
              >
                Avery Rhodes
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                Admin
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
