import { HeroActions } from "./Hero/HeroActions";
import { HeroBackground } from "./Hero/HeroBackground";
import { HeroCapabilities } from "./Hero/HeroCapabilities";
import { HeroContent } from "./Hero/HeroContent";

export function HeroSection() {
  return (
    <section className="hero" id="platform" aria-labelledby="hero-title">
      <HeroBackground />
      <div className="container hero-layout">
        <div className="hero-left-column">
          <HeroContent />
          <div className="hero-lower">
            <p className="hero-supporting-copy">
              Monitor conversations, detect emerging narratives, understand
              audience sentiment, and map how information moves across social
              networks.
            </p>
            <HeroActions />
            <HeroCapabilities />
          </div>
        </div>
        <div className="hero-visual-space" aria-hidden="true" />
      </div>
    </section>
  );
}
