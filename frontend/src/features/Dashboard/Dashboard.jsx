import { useEffect, useState } from "react";
import {
  Activity,
  Bell,
  ChevronDown,
  Command,
  Database,
  Gauge,
  Globe2,
  Hash,
  LayoutDashboard,
  Menu,
  Network,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ThemeToggle } from "../../components/ThemeToggle";
import { getOverview } from "./service";
import "./dashboard.css";

const navSections = [
  {
    label: "Overview",
    items: [
      { label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
      { label: "Sentiment", icon: Gauge, path: "/dashboard/sentiment" },
      { label: "Trends", icon: TrendingUp, path: "/dashboard/trends" },
      { label: "Audience", icon: Users, path: "/dashboard/audience" },
      { label: "Network", icon: Network, path: "/dashboard/network" },
    ],
  },
  {
    label: "Data",
    items: [
      { label: "Data Sources", icon: Database, path: "/dashboard/sources" },
    ],
  },
  {
    label: "System",
    items: [{ label: "Settings", icon: Settings, path: "/dashboard/settings" }],
  },
];
const platforms = [
  "ALL",
  "X",
  "TELEGRAM",
  "INSTAGRAM",
  "FACEBOOK",
  "REDDIT",
  "YOUTUBE",
];

function ActivityChart({ values, onPointSelect }) {
  const width = 900;
  const height = 280;
  const points = values
    .map(
      (value, index) =>
        `${(index / (values.length - 1)) * width},${height - value * 2.35}`,
    )
    .join(" ");
  const area = `0,${height} ${points} ${width},${height}`;
  return (
    <div
      className="activity-chart"
      aria-label="Conversation activity chart"
      role="img"
    >
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="activity-fill" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--color-accent)"
              stopOpacity=".26"
            />
            <stop
              offset="100%"
              stopColor="var(--color-accent)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <path className="chart-area" d={`M ${area}`} />
        <polyline className="chart-line" points={points} />
      </svg>
      <div className="chart-grid" />
      <div className="chart-points">{values.map((value, index) => <button className="chart-point" key={`${value}-${index}`} style={{ left: `${(index / (values.length - 1)) * 100}%`, top: `${((height - value * 2.35) / height) * 100}%` }} aria-label={`Inspect activity point ${index + 1}`} onClick={() => onPointSelect({ index, value })} />)}</div>
      <div className="chart-axis">
        <span>00:00</span>
        <span>04:00</span>
        <span>08:00</span>
        <span>12:00</span>
        <span>16:00</span>
        <span>20:00</span>
        <span>NOW</span>
      </div>
    </div>
  );
}

function PlatformBadge({ name }) {
  return <span className={`platform-badge platform-${name.toLowerCase()}`}>{name === "X" ? "X" : name.slice(0, 2)}</span>;
}
function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function Dashboard({ theme, onThemeChange }) {
  const reduceMotion = useReducedMotion();
  const [data, setData] = useState(null);
  const [platform, setPlatform] = useState("ALL");
  const [dateRange, setDateRange] = useState("24H");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("velocity");
  const [selected, setSelected] = useState(null);
  const [audienceMode, setAudienceMode] = useState("Age");
  const loadOverview = () => { setLoading(true); setError(null); getOverview({ platform, dateRange }).then(setData).catch(() => setError("Unable to load intelligence data.")).finally(() => setLoading(false)); };
  useEffect(() => { loadOverview(); }, [platform, dateRange]);
  const isModule = window.location.pathname !== "/dashboard";
  const currentPath = window.location.pathname;
  const transition = {
    duration: reduceMotion ? 0.01 : 0.5,
    ease: [0.22, 1, 0.36, 1],
  };

  const searchedItems = data ? [...data.narratives.map((item) => ({ type: "TREND", title: item.topic })), ...data.signals.map((item) => ({ type: "SIGNAL", title: item.title }))].filter((item) => item.title.toLowerCase().includes(search.toLowerCase())) : [];
  const sortedNarratives = data ? [...data.narratives].sort((a, b) => sort === "recent" ? a.rank.localeCompare(b.rank) : sort === "sentiment" ? a.sentiment.localeCompare(b.sentiment) : Number.parseFloat(b.velocity) - Number.parseFloat(a.velocity)) : [];
  return (
    <div className="dashboard-shell">
      <aside className={`dashboard-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="dashboard-brand">
          <span>NEXUS</span>
          <small>SOCIAL INTELLIGENCE</small>
        </div>
        <div className="workspace-switcher">
          <span className="workspace-mark">N</span>
          <span>
            <strong>Northstar watch</strong>
            <small>Workspace</small>
          </span>
          <ChevronDown size={14} />
        </div>
        <nav className="dashboard-nav" aria-label="Dashboard navigation">
          {navSections.map((section) => (
            <div className="nav-section" key={section.label}>
              <span className="nav-section-label">{section.label}</span>
              {section.items.map(({ label, icon: Icon, path }) => (
                <a
                  className={`dashboard-nav-item ${currentPath === path ? "is-active" : ""}`}
                  href={path}
                  key={label}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                  {label === "Network" && <span className="nav-dot" />}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="connection-state">
            <span className="live-dot" />
            Live ingestion <span>●</span>
          </div>
          <div className="profile-row">
            <span className="avatar">RK</span>
            <span>
              <strong>Riya Kapoor</strong>
              <small>Analyst</small>
            </span>
            <Settings size={15} />
          </div>
        </div>
      </aside>
      {mobileOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <main className="dashboard-main">
        <header className="command-bar">
          <button
            className="mobile-menu"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={19} />
          </button>
          <div className="breadcrumb">
            <span>NEXUS</span>
            <span>/</span>
            <strong>
              {isModule ? currentPath.split("/").pop() : "OVERVIEW"}
            </strong>
          </div>
          <label className="global-search">
            <Search size={15} />
            <input
              aria-label="Search intelligence"
              placeholder="Search intelligence..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Escape") setSearch(""); }}
            />
            <kbd>
              <Command size={11} /> K
            </kbd>
          </label>
          <div className="command-actions">
            <div className="command-select">
              <Activity size={14} />
              <select
                aria-label="Date range"
                value={dateRange}
                onChange={(event) => setDateRange(event.target.value)}
              >
                {["24H", "7D", "30D", "90D"].map((range) => (
                  <option key={range}>{range}</option>
                ))}
              </select>
            </div>
            <div className="command-select platform-select">
              <Globe2 size={14} />
              <select
                aria-label="Platform"
                value={platform}
                onChange={(event) => setPlatform(event.target.value)}
              >
                {platforms.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <span className="top-live">
              <span className="live-dot" />
              LIVE
            </span>
            <ThemeToggle theme={theme} onChange={onThemeChange} />
              <button className="icon-button" aria-label="Notifications" type="button">
              <Bell size={16} />
              <i />
            </button>
          </div>
        </header>
        <div className="dashboard-content">
          {search && <div className="search-results" role="listbox">{searchedItems.length ? searchedItems.map((item) => <a href={item.type === "TREND" ? `/dashboard/trends/${item.title.toLowerCase().replaceAll(" ", "-")}` : "#signal-details"} key={`${item.type}-${item.title}`}><small>{item.type}</small>{item.title}</a>) : <span>No matching intelligence found.</span>}</div>}
          {isModule ? (
            <motion.section
              className="module-placeholder"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
            >
              <Sparkles size={22} />
              <span className="eyebrow">{currentPath.split("/").pop()}</span>
              <h1>Intelligence module coming online.</h1>
              <p>
                This workspace is prepared for the next layer of investigation.
              </p>
              <a href="/dashboard">Return to overview</a>
            </motion.section>
          ) : (
            <>
              <motion.header
                className="overview-header"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transition}
              >
                <div>
                  <span className="eyebrow">NEXUS / SIGNAL ROOM</span>
                  <h1>Intelligence Overview</h1>
                  <p>
                    Monitor conversations, detect emerging narratives,
                    understand audience sentiment, and trace how influence moves
                    across social networks.
                  </p>
                </div>
                <div className="header-controls">
                  <button className="date-control">
                    <span>
                      Last {dateRange === "24H" ? "24 hours" : dateRange}
                    </span>
                    <ChevronDown size={14} />
                  </button>
                  <button className="filter-control">
                    <Hash size={14} /> {platform} <ChevronDown size={14} />
                  </button>
                </div>
              </motion.header>
              {loading && <div className="loading-state" role="status">Syncing intelligence data...</div>}
              {error && <div className="data-state error-state" role="alert">{error}<button type="button" onClick={loadOverview}>Retry</button></div>}
              {!loading && !error && data && <section className="metric-grid">
                {data.metrics.map((metric, index) => (
                  <motion.article
                    className="metric-card"
                    key={metric.id}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      ...transition,
                      delay: reduceMotion ? 0 : 0.08 * (index + 1),
                    }}
                    onClick={() => { const destinations = { conversations: "/dashboard/trends", sentiment: "/dashboard/sentiment", velocity: "/dashboard/trends", influence: "/dashboard/network" }; window.location.href = destinations[metric.id]; }} role="link" tabIndex="0">
                    <span className="metric-label">{metric.label}</span>
                    <strong>{metric.value}</strong>
                    <div>
                      <span className="metric-change">{metric.change}</span>
                      <span className="metric-note">{metric.note}</span>
                    </div>
                  </motion.article>
                ))}
              </section>}
              <motion.section
                className="panel activity-panel"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.35 }}
              >
                <SectionHeading
                  eyebrow="VOLUME / 24 HOURS"
                  title="Conversation Activity"
                  action={
                    <span className="panel-meta">
                      <span className="live-dot" />
                      Live data
                    </span>
                  }
                />
                <p className="section-subtitle">
                  Volume of public conversation over time.
                </p>
                {!loading && !error && data && <ActivityChart values={data.activity} onPointSelect={setSelected} />}
                {!loading && !error && data?.activity.length === 0 && <div className="data-state">No conversation data available for this period.</div>}
              </motion.section>
              {selected && <div className="signal-context"><strong>CONVERSATION SPIKE</strong><span>{selected.value * 1000} conversations at {data?.activityLabels[selected.index % data.activityLabels.length]}</span><button type="button" onClick={() => { window.location.href = "/dashboard/trends/ai-regulation"; }}>View signal</button><button type="button" aria-label="Close signal context" onClick={() => setSelected(null)}>Close</button></div>}
              <div className="two-column-grid">
                <motion.section
                  className="panel narratives-panel"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: 0.45 }}
                >
                  <SectionHeading
                    eyebrow="EMERGING SIGNALS"
                    title="Trending Narratives"
                    action={<label className="sort-control">Sort <select aria-label="Sort narratives" value={sort} onChange={(event) => setSort(event.target.value)}><option value="velocity">Velocity</option><option value="sentiment">Sentiment</option><option value="recent">Recent</option></select></label>}
                  />
                  <div className="narrative-list">
                    {sortedNarratives.map((item) => (
                        <a
                        className="narrative-row"
                        href={`/dashboard/trends/${item.topic.toLowerCase().replaceAll(" ", "-")}`}
                        key={item.rank}
                      >
                        <span className="narrative-rank">{item.rank}</span>
                        <span className="narrative-topic">
                          {item.topic}
                          <small>{item.sentiment} sentiment</small>
                        </span>
                        <span className="narrative-platforms">
                          {item.platforms.map((name) => (
                            <PlatformBadge name={name} key={name} />
                          ))}
                        </span>
                        <strong className="velocity">↑ {item.velocity}</strong>
                      </a>
                    ))}
                  </div>
                </motion.section>
                <motion.section
                  className="panel audience-panel"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: 0.52 }}
                >
                  <SectionHeading
                    eyebrow="PARTICIPANT MIX"
                    title="Audience Intelligence"
                    action={
                      <button
                        className="icon-button"
                        aria-label="Audience details"
                        type="button"
                        onClick={() => setAudienceMode(audienceMode === "Age" ? "Location" : "Age")}
                      >
                        ↗
                      </button>
                    }
                  />
                  <div className="audience-content">
                    <div className="audience-bars">
                      {data?.audience.map((item) => (
                        <button className={`audience-row ${selected === item.label ? "is-selected" : ""}`} key={item.label} onClick={() => setSelected(item.label)} type="button">
                          <span>{item.label}</span>
                          <div>
                            <i style={{ width: `${item.value * 2}%` }} />
                          </div>
                          <strong>{item.value}%</strong>
                        </button>
                      ))}
                    </div>
                    <div className="audience-summary">
                      <span className="summary-ring">
                        <strong>41%</strong>
                        <small>core age</small>
                      </span>
                      <p>
                        {audienceMode} view. Largest cohort is <b>25-34</b>, with English-language
                        participation concentrated in North America.
                      </p>
                    </div>
                  </div>
                </motion.section>
              </div>
              <motion.section
                className="panel signals-panel"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.58 }}
              >
                <SectionHeading
                  eyebrow="REAL-TIME MONITOR"
                  title="Live Signals"
                    action={<button className="text-button" type="button" onClick={loadOverview}>Refresh</button>}
                />
                <div className="signals-list">
                  {data?.signals.map((signal) => (
                    <button className="signal-row" key={signal.id} type="button" onClick={() => setSelected(signal.id)}>
                      <span
                        className={`signal-icon severity-${signal.severity}`}
                      >
                        <span />
                      </span>
                      <div className="signal-copy">
                        <span className="signal-type">{signal.type}</span>
                        <h3>{signal.title}</h3>
                        <p>{signal.description}</p>
                      </div>
                      <div className="signal-meta">
                        <span>{signal.timestamp}</span>
                        <div>
                          {signal.platforms.map((name) => (
                            <PlatformBadge name={name} key={name} />
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
