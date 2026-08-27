import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { intelligenceCapabilities } from "./intelligenceData";
import { IntelligenceHeader } from "./IntelligenceHeader";
import { IntelligenceNavigation } from "./IntelligenceNavigation";
import { Sentiment3DView } from "./Sentiment3DView";
import { Trends3DView } from "./Trends3DView";
import { Audience3DView } from "./Audience3DView";
import { Network3DView } from "./Network3DView";

export function IntelligenceSuite() {
  const [activeTab, setActiveTab] = useState("sentiment");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "sentiment" || hash === "sentiment-intelligence") {
        setActiveTab("sentiment");
      } else if (hash === "trends") {
        setActiveTab("trends");
      } else if (hash === "audience") {
        setActiveTab("audience");
      } else if (hash === "network") {
        setActiveTab("network");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <section
      className="intelligence-suite-section"
      id="intelligence"
      aria-labelledby="intelligence-section-heading"
    >
      <div className="container">
        <IntelligenceHeader />

        {/* Floating Capsule Tabs */}
        <div className="intelligence-nav-container">
          <IntelligenceNavigation
            activeId={activeTab}
            items={intelligenceCapabilities}
            onChange={setActiveTab}
          />
        </div>

        {/* Tab Content Display */}
        <div className="intelligence-tab-viewport" id="sentiment-intelligence">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="tab-panel-container"
              role="tabpanel"
              id={`intelligence-panel-${activeTab}`}
              aria-labelledby={`intelligence-tab-${activeTab}`}
            >
              {activeTab === "sentiment" && <Sentiment3DView />}
              {activeTab === "trends" && <Trends3DView />}
              {activeTab === "audience" && <Audience3DView />}
              {activeTab === "network" && <Network3DView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
