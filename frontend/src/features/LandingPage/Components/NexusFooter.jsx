import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const platformLinks = [
  { label: "Sentiment", href: "#sentiment-intelligence" },
  { label: "Demographics" },
  { label: "Trends" },
  { label: "Network" },
];

const insightLinks = [
  { label: "Audience Intelligence" },
  { label: "Conversation Analysis" },
  { label: "Influence Mapping" },
  { label: "Signal Detection" },
];

const projectLinks = [
  { label: "About" },
  { label: "How It Works", href: "#platform" },
  { label: "Technology" },
  { label: "Contact" },
];

function FooterLinks({ links }) {
  return (
    <ul className="nexus-footer-links">
      {links.map((link) => (
        <li key={link.label}>
          {link.href ? (
            <a href={link.href}>{link.label}</a>
          ) : (
            <span className="nexus-footer-link-placeholder">{link.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function NexusFooter() {
  const ctaRef = useRef(null);

  useEffect(() => {
    const cta = ctaRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!cta || !finePointer.matches) return undefined;

    const handlePointerMove = (event) => {
      const bounds = cta.getBoundingClientRect();
      const offsetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 6;
      const offsetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 6;
      cta.style.setProperty("--footer-cta-x", `${offsetX}px`);
      cta.style.setProperty("--footer-cta-y", `${offsetY}px`);
    };
    const resetPosition = () => {
      cta.style.setProperty("--footer-cta-x", "0px");
      cta.style.setProperty("--footer-cta-y", "0px");
    };

    cta.addEventListener("pointermove", handlePointerMove);
    cta.addEventListener("pointerleave", resetPosition);
    return () => {
      cta.removeEventListener("pointermove", handlePointerMove);
      cta.removeEventListener("pointerleave", resetPosition);
    };
  }, []);

  return (
    <footer className="nexus-footer">
      <section className="nexus-footer-cta" aria-labelledby="footer-title">
        <svg
          className="nexus-footer-signal"
          viewBox="0 0 1200 480"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M72 358 C220 102 342 102 478 280 S738 458 856 164 S1020 72 1130 216" />
          <path d="M42 132 C190 362 342 376 512 186 S782 72 930 292 S1072 380 1160 330" />
          <path d="M110 412 C300 330 398 334 552 390 S820 408 1090 104" />
          <g>
            <circle cx="72" cy="358" r="5" />
            <circle cx="478" cy="280" r="4" />
            <circle cx="856" cy="164" r="5" />
            <circle cx="1130" cy="216" r="4" />
            <circle cx="512" cy="186" r="4" />
            <circle cx="930" cy="292" r="5" />
            <circle cx="552" cy="390" r="4" />
            <circle cx="1090" cy="104" r="5" />
          </g>
        </svg>

        <div className="nexus-footer-cta-content">
          <p className="nexus-footer-kicker">NEXUS / SOCIAL INTELLIGENCE</p>
          <h2 id="footer-title">
            SEE THE SIGNAL
            <br />
            BEFORE IT SPREADS.
          </h2>
          <p className="nexus-footer-description">
            AI-powered social intelligence for understanding sentiment,
            audiences, trends, and influence.
          </p>
          <a ref={ctaRef} className="nexus-footer-cta-link" href="#platform">
            <span>EXPLORE NEXUS</span>
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
      </section>

      <div className="nexus-footer-navigation">
        <div className="nexus-footer-brand">
          <p className="nexus-footer-column-label">NEXUS</p>
          <p>
            Social intelligence
            <br />
            for the connected world.
          </p>
        </div>
        <div>
          <p className="nexus-footer-column-label">PLATFORM</p>
          <FooterLinks links={platformLinks} />
        </div>
        <div>
          <p className="nexus-footer-column-label">INSIGHTS</p>
          <FooterLinks links={insightLinks} />
        </div>
        <div>
          <p className="nexus-footer-column-label">PROJECT</p>
          <FooterLinks links={projectLinks} />
        </div>
      </div>

      <div className="nexus-footer-bottom">
        <span>&copy; 2026 NEXUS</span>
        <span>
          NTRO <i aria-hidden="true"></i> SOCIAL INTELLIGENCE
        </span>
      </div>
    </footer>
  );
}
