import { Navbar } from "../Components/Navbar";
import { HeroSection } from "../Components/HeroSection";
import { IntelligenceOverview } from "../Components/Intelligence/IntelligenceOverview";
import { NexusFooter } from "../Components/NexusFooter";

export function LandingPage({ theme, onThemeChange }) {
  return (
    <div className="app-shell">
      <Navbar theme={theme} onThemeChange={onThemeChange} />
      <main aria-label="Nexus social intelligence">
        <HeroSection />
        <IntelligenceOverview />
      </main>
      <NexusFooter />
    </div>
  );
}
