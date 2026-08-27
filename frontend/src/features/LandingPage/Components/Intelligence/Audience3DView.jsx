import { useState } from "react";
import { Users, Globe2, ShieldCheck, PieChart, Layers } from "lucide-react";
import { TiltCard } from "../../../../components/TiltCard";
import { GlassBadge } from "../../../../components/GlassBadge";

const regions = [
  { id: "north", label: "NORTH", share: "36.4%", intensity: "High", color: "#6366f1" },
  { id: "east", label: "EAST", share: "22.8%", intensity: "Steady", color: "#06b6d4" },
  { id: "west", label: "WEST", share: "28.5%", intensity: "Surging", color: "#8b5cf6" },
  { id: "south", label: "SOUTH", share: "12.3%", intensity: "Growing", color: "#10b981" },
];

const ageGroups = [
  { group: "18 – 24", pct: 32, fill: "78%" },
  { group: "25 – 34", pct: 41, fill: "100%" },
  { group: "35 – 44", pct: 19, fill: "46%" },
  { group: "45+", pct: 8, fill: "20%" },
];

const languages = [
  { name: "English", pct: 64, color: "#6366f1" },
  { name: "Hindi", pct: 21, color: "#06b6d4" },
  { name: "Bengali", pct: 8, color: "#8b5cf6" },
  { name: "Other", pct: 7, color: "#94a3b8" },
];

export function Audience3DView() {
  const [activeRegion, setActiveRegion] = useState(regions[0]);

  return (
    <div className="intelligence-3d-pillar-layout">
      {/* LEFT: 3D Spatial Demographic Visualizer */}
      <div className="intelligence-visual-column">
        <TiltCard maxTilt={6} scale={1.01} className="sentiment-3d-canvas-wrap">
          <div className="sentiment-canvas-header">
            <div className="canvas-header-left">
              <Users size={16} className="text-accent" />
              <span className="canvas-header-title">SPATIAL DEMOGRAPHIC MATRIX</span>
            </div>
            <GlassBadge variant="emerald" dot pulse>
              100% ANONYMIZED
            </GlassBadge>
          </div>

          <div className="audience-visual-body">
            {/* Age Distribution Grid */}
            <div className="audience-section-card">
              <div className="card-section-label">
                <Layers size={13} />
                <span>AGE COHORT COMPOSITION</span>
              </div>
              <div className="audience-bars-list">
                {ageGroups.map((age) => (
                  <div key={age.group} className="age-bar-row">
                    <span className="age-label">{age.group}</span>
                    <div className="age-track">
                      <div
                        className="age-fill"
                        style={{ width: `${age.pct * 2.2}%` }}
                      />
                    </div>
                    <span className="age-pct">{age.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Breakdown & Region Grid */}
            <div className="audience-dual-grid">
              {/* Language Distribution */}
              <div className="audience-section-card">
                <div className="card-section-label">
                  <PieChart size={13} />
                  <span>LANGUAGE SPREAD</span>
                </div>
                <div className="language-tags-grid">
                  {languages.map((lang) => (
                    <div key={lang.name} className="lang-tag-card">
                      <span className="lang-name">{lang.name}</span>
                      <span className="lang-pct">{lang.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geographic Cluster Focus */}
              <div className="audience-section-card">
                <div className="card-section-label">
                  <Globe2 size={13} />
                  <span>REGIONAL CLUSTERS</span>
                </div>
                <div className="region-pills-row">
                  {regions.map((reg) => (
                    <button
                      key={reg.id}
                      type="button"
                      className={`region-pill-btn ${activeRegion.id === reg.id ? "is-active" : ""}`}
                      onClick={() => setActiveRegion(reg)}
                    >
                      <span className="reg-title">{reg.label}</span>
                      <span className="reg-share">{reg.share}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Differential Privacy Guarantee Badge */}
            <div className="privacy-assurance-footer">
              <ShieldCheck size={15} className="privacy-icon" />
              <span>
                Differential privacy guaranteed. Zero personally identifiable information (PII) is stored or processed.
              </span>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* RIGHT: Content & Composition Philosophy */}
      <div className="intelligence-content-column">
        <div className="pillar-text-content">
          <p className="eyebrow">03 / AUDIENCE INTELLIGENCE</p>
          <h2 className="pillar-headline">
            KNOW WHO IS
            <br />
            IN THE CONVERSATION.
          </h2>
          <p className="pillar-desc">
            Build an aggregate view of your audience using public signals, language, geography, interests,
            and behavioral patterns — without exposing individual identities.
          </p>

          <div className="audience-attributes-grid">
            <div className="attr-pill">
              <span className="attr-dot" />
              <span>Demographic Affinity Vectors</span>
            </div>
            <div className="attr-pill">
              <span className="attr-dot" />
              <span>Multi-Lingual Semantics (140+ dialects)</span>
            </div>
            <div className="attr-pill">
              <span className="attr-dot" />
              <span>Geographic Density &amp; Cross-Border Diffusion</span>
            </div>
            <div className="attr-pill">
              <span className="attr-dot" />
              <span>Community Affinity &amp; Professional Guilds</span>
            </div>
          </div>

          <div className="pillar-meta-grid">
            <div className="meta-cell">
              <span className="meta-title">AGGREGATION</span>
              <span className="meta-val">K-ANONYMITY (K &gt; 500)</span>
            </div>
            <div className="meta-cell">
              <span className="meta-title">COHORTS</span>
              <span className="meta-val">BEHAVIORAL / GEOGRAPHIC</span>
            </div>
            <div className="meta-cell">
              <span className="meta-title">ACCURACY</span>
              <span className="meta-val">98.6% CLUSTER PRECISION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
