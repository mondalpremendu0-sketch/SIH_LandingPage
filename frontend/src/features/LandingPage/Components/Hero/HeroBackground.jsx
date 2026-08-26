import { SocialFieldCanvas } from "./SocialFieldCanvas";

export function HeroBackground() {
  return (
    <div className="hero-background" aria-hidden="true">
      <div className="hero-grid" />
      <div className="hero-field hero-field-far" />
      <SocialFieldCanvas />
      <div className="hero-fade" />
    </div>
  );
}
