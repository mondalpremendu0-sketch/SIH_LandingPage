import { Navbar } from "../Components/Navbar";
import { HeroSection } from "../Components/HeroSection";
import { IntelligenceSuite } from "../Components/Intelligence/IntelligenceSuite";
import { GlobalMetricsBand } from "../Components/Modules/GlobalMetricsBand";
import { SocialPulseLiveFeed } from "../Components/Modules/SocialPulseLiveFeed";
import { ArchitecturePipeline3D } from "../Components/Modules/ArchitecturePipeline3D";
import { DeveloperTerminal3D } from "../Components/Modules/DeveloperTerminal3D";
import { NexusFooter } from "../Components/NexusFooter";
import { CursorSpotlight } from "../../../components/CursorSpotlight";

export function LandingPage({ theme, onThemeChange }) {
  return (
    <div className="app-shell">
      <CursorSpotlight />
      <Navbar theme={theme} onThemeChange={onThemeChange} />
      <main aria-label="Nexus social intelligence">
        <HeroSection />
        <GlobalMetricsBand />
        <IntelligenceSuite />
        <SocialPulseLiveFeed />
        <ArchitecturePipeline3D />
        <DeveloperTerminal3D />
      </main>
      <NexusFooter />
    </div>
  );
}
