import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Deterministic state-based curve points for morphing
const curveStates = {
  initial: [
    { x: 40, y: 210 },
    { x: 90, y: 205 },
    { x: 150, y: 178 },
    { x: 210, y: 170 },
    { x: 265, y: 135 },
    { x: 320, y: 148 },
    { x: 360, y: 126 },
    { x: 415, y: 158 },
    { x: 470, y: 148 },
    { x: 520, y: 164 },
    { x: 565, y: 182 },
    { x: 608, y: 198 },
  ],
  support: [
    { x: 40, y: 190 },
    { x: 90, y: 185 },
    { x: 150, y: 165 },
    { x: 210, y: 158 },
    { x: 265, y: 120 },
    { x: 320, y: 132 },
    { x: 360, y: 112 },
    { x: 415, y: 142 },
    { x: 470, y: 130 },
    { x: 520, y: 148 },
    { x: 565, y: 165 },
    { x: 608, y: 180 },
  ],
  excitement: [
    { x: 40, y: 188 },
    { x: 90, y: 180 },
    { x: 150, y: 145 },
    { x: 210, y: 155 },
    { x: 265, y: 95 },
    { x: 320, y: 118 },
    { x: 360, y: 78 },
    { x: 415, y: 105 },
    { x: 470, y: 122 },
    { x: 520, y: 136 },
    { x: 565, y: 154 },
    { x: 608, y: 170 },
  ],
  concern: [
    { x: 40, y: 190 },
    { x: 90, y: 188 },
    { x: 150, y: 170 },
    { x: 210, y: 180 },
    { x: 265, y: 140 },
    { x: 320, y: 165 },
    { x: 360, y: 145 },
    { x: 415, y: 195 },
    { x: 470, y: 225 },
    { x: 520, y: 218 },
    { x: 565, y: 205 },
    { x: 608, y: 195 },
  ],
  shift: [
    { x: 40, y: 195 },
    { x: 90, y: 200 },
    { x: 150, y: 190 },
    { x: 210, y: 195 },
    { x: 265, y: 180 },
    { x: 320, y: 210 },
    { x: 360, y: 220 },
    { x: 415, y: 215 },
    { x: 470, y: 205 },
    { x: 520, y: 190 },
    { x: 565, y: 175 },
    { x: 608, y: 165 },
  ],
  equilibrium: [
    { x: 40, y: 200 },
    { x: 90, y: 195 },
    { x: 150, y: 185 },
    { x: 210, y: 190 },
    { x: 265, y: 170 },
    { x: 320, y: 190 },
    { x: 360, y: 195 },
    { x: 415, y: 185 },
    { x: 470, y: 175 },
    { x: 520, y: 170 },
    { x: 565, y: 175 },
    { x: 608, y: 185 },
  ],
};

const secondaryStates = {
  support: [
    { x: 40, y: 225 },
    { x: 115, y: 214 },
    { x: 182, y: 184 },
    { x: 246, y: 161 },
    { x: 320, y: 146 },
    { x: 390, y: 152 },
    { x: 470, y: 166 },
    { x: 565, y: 188 },
    { x: 608, y: 200 },
  ],
  concern: [
    { x: 40, y: 248 },
    { x: 120, y: 245 },
    { x: 185, y: 232 },
    { x: 255, y: 212 },
    { x: 325, y: 176 },
    { x: 395, y: 201 },
    { x: 470, y: 222 },
    { x: 560, y: 238 },
    { x: 608, y: 244 },
  ],
};

function buildSmoothPath(points) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const curr = points[i];
    const next = points[i + 1];
    const cx = (curr.x + next.x) / 2;
    d += ` Q ${curr.x} ${curr.y} ${cx} ${(curr.y + next.y) / 2}`;
  }
  const last = points[points.length - 1];
  d += ` T ${last.x} ${last.y}`;
  return d;
}

function interpolatePoints(p1, p2, t) {
  return p1.map((pt, i) => ({
    x: pt.x + (p2[i].x - pt.x) * t,
    y: pt.y + (p2[i].y - pt.y) * t,
  }));
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function getParticleCount() {
  if (typeof window === "undefined") return 60;
  const w = window.innerWidth;
  if (w >= 1024) return 80;
  if (w >= 768) return 50;
  if (w >= 480) return 30;
  return 15;
}

function createParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 20 + ((i * 43) % 580),
    y: 50 + ((i * 61) % 160),
    r: 2 + (i % 3),
    opacity: 0.2 + (i % 4) * 0.18,
  }));
}

export function IntelligenceOverview() {
  const sectionRef = useRef(null);
  const graphRef = useRef(null);
  const primaryPathRef = useRef(null);
  const secondarySupportRef = useRef(null);
  const secondaryConcernRef = useRef(null);
  const cursorLineRef = useRef(null);
  const activeDotRef = useRef(null);
  const eventRef = useRef(null);
  const inspectionRef = useRef(null);
  const progressRef = useRef(0);
  const storyStagesRef = useRef(null);

  const [particleCount, setParticleCount] = useState(() => getParticleCount());
  const [isMobileViewport, setIsMobileViewport] = useState(
    () => window.innerWidth < 768,
  );

  const particles = useMemo(
    () => createParticles(particleCount),
    [particleCount],
  );

  // Scroll progress is the only source of truth for the graph timeline.
  const getMorphedPoints = (progress) => {
    const states = [
      { at: 0, points: curveStates.initial },
      { at: 0.2, points: curveStates.support },
      { at: 0.4, points: curveStates.excitement },
      { at: 0.6, points: curveStates.concern },
      { at: 0.75, points: curveStates.shift },
      { at: 1, points: curveStates.equilibrium },
    ];
    const nextIndex = states.findIndex((state) => state.at > progress);
    const index = nextIndex === -1 ? states.length - 1 : nextIndex;
    const previous = states[Math.max(0, index - 1)];
    const next = states[index];
    const localProgress =
      next.at === previous.at
        ? 1
        : (progress - previous.at) / (next.at - previous.at);
    return interpolatePoints(
      previous.points,
      next.points,
      Math.max(0, Math.min(1, localProgress)),
    );
  };

  const getMorphedPrimary = (progress) =>
    buildSmoothPath(getMorphedPoints(progress));

  useEffect(() => {
    const handleResize = () => {
      const newCount = getParticleCount();
      if (newCount !== particleCount) {
        setParticleCount(newCount);
      }
      setIsMobileViewport((previous) => {
        const next = window.innerWidth < 768;
        return previous === next ? previous : next;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [particleCount]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !graphRef.current) return;

    if (isMobileViewport) {
      const section = sectionRef.current;
      const graph = graphRef.current;
      const points = graph.querySelectorAll(".graph-point");
      const particles = graph.querySelectorAll(".sentiment-particle");
      const stages = storyStagesRef.current?.querySelectorAll(
        ".sentiment-story-stage",
      );

      primaryPathRef.current?.setAttribute(
        "d",
        buildSmoothPath(curveStates.equilibrium),
      );
      primaryPathRef.current?.style.setProperty("stroke-dashoffset", "0");
      secondarySupportRef.current?.style.setProperty("opacity", "0.8");
      secondaryConcernRef.current?.style.setProperty("opacity", "0.65");
      graph
        .querySelector(".sentiment-grid")
        ?.style.setProperty("opacity", "0.58");
      graph
        .querySelector(".sentiment-event")
        ?.style.setProperty("opacity", "1");
      graph.querySelector(".event-badge")?.style.setProperty("opacity", "1");
      graph
        .querySelector(".event-badge")
        ?.style.setProperty("transform", "none");
      graph.querySelector(".event-line")?.setAttribute("y2", "300");
      graph
        .querySelector(".sentiment-current-marker")
        ?.setAttribute("cx", "574");
      points.forEach((point, index) => {
        point.setAttribute("cx", String(curveStates.equilibrium[index].x));
        point.setAttribute("cy", String(curveStates.equilibrium[index].y));
        point.style.opacity = "1";
        point.style.transform = "none";
      });
      particles.forEach((particle) => {
        particle.style.opacity = "0.35";
        particle.style.transform = "none";
      });
      stages?.forEach((stage, index) => {
        stage.style.opacity = index === 0 ? "1" : "0";
        stage.style.transform = "none";
        stage.style.filter = "none";
      });

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            section.classList.add("is-visible");
            observer.unobserve(section);
          }
        },
        { threshold: 0.1 },
      );
      observer.observe(section);

      return () => observer.disconnect();
    }

    let removeCursorListeners = () => {};
    let responsiveScroll;
    const ctx = gsap.context(() => {
      const particleNodes = graphRef.current.querySelectorAll(
        ".sentiment-particle",
      );
      const points = graphRef.current.querySelectorAll(".graph-point");
      const eventBadge = eventRef.current;
      const storyStages = storyStagesRef.current?.querySelectorAll(
        ".sentiment-story-stage",
      );
      const cursorX = gsap.quickTo(cursorLineRef.current, "x", {
        duration: 0.25,
        ease: "power3.out",
      });
      const dotX = gsap.quickTo(activeDotRef.current, "x", {
        duration: 0.25,
        ease: "power3.out",
      });
      const dotY = gsap.quickTo(activeDotRef.current, "y", {
        duration: 0.25,
        ease: "power3.out",
      });

      const updateGraph = (progress, mobile = false) => {
        progressRef.current = progress;
        const currentPoints = getMorphedPoints(progress);
        if (primaryPathRef.current) {
          primaryPathRef.current.setAttribute("d", getMorphedPrimary(progress));
          primaryPathRef.current.style.strokeDashoffset = String(
            lerp(
              1200,
              0,
              mobile
                ? Math.max(0.35, Math.min(1, progress / 0.2))
                : Math.min(1, progress / 0.2),
            ),
          );
        }
        gsap.set(points, {
          opacity: mobile
            ? 0.35 + Math.min(0.65, progress / 0.16)
            : Math.min(1, progress / 0.16),
          scale: lerp(0.8, 1, Math.min(1, progress / 0.3)),
        });
        points.forEach((point, index) => {
          point.setAttribute("cx", currentPoints[index].x);
          point.setAttribute("cy", currentPoints[index].y);
        });

        const emergence = Math.max(0, Math.min(1, (progress - 0.2) / 0.4));
        gsap.set(secondarySupportRef.current, { opacity: emergence * 0.8 });
        gsap.set(secondaryConcernRef.current, {
          opacity: Math.max(0, Math.min(1, (progress - 0.4) / 0.2)) * 0.65,
        });
        gsap.set(".sentiment-grid", { opacity: lerp(0.25, 0.58, progress) });
        gsap.set(eventBadge, {
          opacity: Math.max(0, Math.min(1, (progress - 0.68) / 0.08)),
          y: lerp(15, 0, Math.max(0, Math.min(1, (progress - 0.68) / 0.08))),
        });
        gsap.set(eventRef.current?.querySelector(".event-line"), {
          attr: {
            y2: lerp(
              60,
              300,
              Math.max(0, Math.min(1, (progress - 0.6) / 0.12)),
            ),
          },
        });
        if (storyStages?.length) {
          const stageProgress = Math.min(4, progress * 5);
          const activeStage = Math.floor(stageProgress);
          const stageBlend = stageProgress - activeStage;
          storyStages.forEach((stage, index) => {
            const isCurrent = index === activeStage;
            const isNext = index === activeStage + 1;
            const opacity = isCurrent
              ? 1 - stageBlend
              : isNext
                ? stageBlend
                : 0;
            gsap.set(stage, {
              autoAlpha: opacity,
              y: isCurrent
                ? -stageBlend * 15
                : isNext
                  ? (1 - stageBlend) * 15
                  : 15,
              filter: window.matchMedia("(max-width: 767px)").matches
                ? "none"
                : `blur(${(1 - opacity) * 4}px)`,
              pointerEvents: isCurrent && stageBlend < 0.5 ? "auto" : "none",
            });
          });
        }

        particleNodes.forEach((particle, index) => {
          const seedX = 20 + ((index * 43) % 580);
          const seedY = 50 + ((index * 61) % 160);
          const targetX = 40 + ((index * 37) % 530);
          const targetY = 130 + ((index * 29) % 105);
          const convergence = Math.max(0, Math.min(1, (progress - 0.3) / 0.55));
          gsap.set(particle, {
            opacity:
              (mobile
                ? 0.35 + Math.min(0.65, progress / 0.2)
                : Math.min(1, progress / 0.2)) *
              (0.2 + (index % 4) * 0.18),
            x: lerp(0, targetX - seedX, convergence * 0.9),
            y: lerp(0, targetY - seedY, convergence * 0.9),
          });
        });

        const timelineX = 82 + progress * 492;
        gsap.set(".sentiment-current-marker", { attr: { cx: timelineX } });
      };

      // Initial state
      gsap.set(points, { opacity: 0, scale: 0.8 });
      gsap.set(eventBadge, { opacity: 0, scale: 0.95, y: 15 });
      updateGraph(0);

      responsiveScroll = gsap.matchMedia();
      responsiveScroll.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, tablet, mobile, reduced } = context.conditions;
          if (reduced) {
            updateGraph(1);
            return undefined;
          }
          if (mobile) {
            updateGraph(0, true);
            const observer = new IntersectionObserver(
              ([entry]) => {
                if (!entry.isIntersecting) return;
                gsap.to(graphRef.current, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.65,
                  ease: "power2.out",
                });
                gsap.to(primaryPathRef.current, {
                  strokeDashoffset: 0,
                  duration: 0.8,
                  ease: "power2.out",
                });
                observer.unobserve(entry.target);
              },
              { rootMargin: "-15% 0px -20% 0px", threshold: 0.1 },
            );
            gsap.set(graphRef.current, { autoAlpha: 0, y: 18 });
            observer.observe(graphRef.current);
            return () => observer.disconnect();
          }
          const trigger = ScrollTrigger.create({
            trigger: desktop || tablet ? sectionRef.current : graphRef.current,
            start: "top top",
            end: desktop ? "+=1900" : "+=1400",
            pin: desktop || tablet ? sectionRef.current : false,
            pinSpacing: desktop || tablet,
            scrub: 2,
            invalidateOnRefresh: true,
            onUpdate: (self) => updateGraph(self.progress),
          });
          updateGraph(trigger.progress);
          if (desktop || tablet) ScrollTrigger.refresh();
          return () => trigger.kill();
        },
      );

      // Cursor interaction
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const handleMove = (e) => {
          if (!graphRef.current) return;
          const rect = graphRef.current.getBoundingClientRect();
          const x = gsap.utils.clamp(
            40,
            600,
            ((e.clientX - rect.left) / rect.width) * 620,
          );
          const currentPoints = getMorphedPoints(progressRef.current);
          const nearest = currentPoints.reduce(
            (closest, point) =>
              Math.abs(point.x - x) < Math.abs(closest.x - x) ? point : closest,
            currentPoints[0],
          );
          const elapsedMinutes = Math.round(progressRef.current * 720);
          const hour = 9 + Math.floor(elapsedMinutes / 60);
          const minute = String(elapsedMinutes % 60).padStart(2, "0");

          gsap.to(".cursor-guide", { opacity: 1, duration: 0.2 });
          cursorX(x - 320);
          dotX(x - 320);
          dotY(nearest.y - 150);
          if (inspectionRef.current) {
            const time =
              inspectionRef.current.querySelector(".inspection-time");
            const value =
              inspectionRef.current.querySelector(".inspection-value");
            if (time)
              time.textContent = `${String(hour).padStart(2, "0")}:${minute}`;
            if (value)
              value.textContent = `SENTIMENT ${Math.round(100 - nearest.y / 3)}%`;
            gsap.set(inspectionRef.current, {
              x: Math.min(440, Math.max(50, x - 50)),
              y: Math.max(65, nearest.y - 68),
              opacity: 1,
            });
          }
          gsap.to(activeDotRef.current, {
            opacity: 1,
            scale: 1.1,
            duration: 0.15,
          });
        };

        const handleLeave = () => {
          gsap.to(".cursor-guide", { opacity: 0, duration: 0.2 });
          gsap.to(activeDotRef.current, {
            opacity: 0.3,
            scale: 0.7,
            duration: 0.2,
          });
          gsap.to(inspectionRef.current, { opacity: 0, duration: 0.2 });
        };

        graphRef.current.addEventListener("pointermove", handleMove);
        graphRef.current.addEventListener("pointerleave", handleLeave);

        removeCursorListeners = () => {
          graphRef.current?.removeEventListener("pointermove", handleMove);
          graphRef.current?.removeEventListener("pointerleave", handleLeave);
        };
      }
    }, sectionRef);

    return () => {
      removeCursorListeners();
      responsiveScroll?.revert?.();
      ctx.revert();
    };
  }, [isMobileViewport, particleCount]);

  return (
    <section
      ref={sectionRef}
      id="sentiment-intelligence"
      className="sentiment-feature"
      aria-labelledby="sentiment-headline"
    >
      <div className="sentiment-layout">
        {/* LEFT: Graph */}
        <div className="sentiment-graph-column">
          <div
            ref={graphRef}
            className="sentiment-canvas-wrap"
            aria-label="Animated sentiment graph showing conversation evolution"
          >
            <svg viewBox="0 0 640 420" className="sentiment-canvas" role="img">
              {/* Grid */}
              <g className="sentiment-grid">
                <line x1="35" y1="80" x2="600" y2="80" />
                <line x1="35" y1="130" x2="600" y2="130" />
                <line x1="35" y1="180" x2="600" y2="180" />
                <line x1="35" y1="230" x2="600" y2="230" />
                <line x1="35" y1="280" x2="600" y2="280" />
              </g>

              {/* Background zones */}
              <g className="sentiment-zones">
                <rect
                  className="zone-positive"
                  x="35"
                  y="60"
                  width="565"
                  height="60"
                  opacity="0.05"
                />
                <rect
                  className="zone-neutral"
                  x="35"
                  y="120"
                  width="565"
                  height="110"
                  opacity="0.03"
                />
                <rect
                  className="zone-negative"
                  x="35"
                  y="230"
                  width="565"
                  height="90"
                  opacity="0.04"
                />
              </g>

              {/* Particles */}
              <g className="sentiment-particles">
                {particles.map((p) => (
                  <circle
                    key={p.id}
                    className="sentiment-particle"
                    cx={p.x}
                    cy={p.y}
                    r={p.r}
                    opacity={p.opacity}
                  />
                ))}
              </g>

              {/* Secondary curves */}
              <g className="sentiment-secondaries">
                <path
                  ref={secondarySupportRef}
                  className="sentiment-secondary support-curve"
                  d={buildSmoothPath(secondaryStates.support)}
                />
                <path
                  ref={secondaryConcernRef}
                  className="sentiment-secondary concern-curve"
                  d={buildSmoothPath(secondaryStates.concern)}
                />
              </g>

              {/* Primary curve (will be morphed) */}
              <path
                ref={primaryPathRef}
                className="sentiment-primary"
                d={buildSmoothPath(curveStates.initial)}
              />

              {/* Data points */}
              <g className="sentiment-points">
                {curveStates.initial.map((pt, i) => (
                  <circle
                    key={i}
                    className={`graph-point ${i === 7 ? "pulse-point" : ""}`}
                    cx={pt.x}
                    cy={pt.y}
                    r={i === 7 ? 5 : 3.5}
                  />
                ))}
              </g>

              {/* Event marker */}
              <g ref={eventRef} className="sentiment-event">
                <line
                  x1="425"
                  y1="60"
                  x2="425"
                  y2="300"
                  className="event-line"
                />
                <g className="event-badge">
                  <rect x="435" y="70" width="140" height="55" rx="8" />
                  <text x="445" y="88">
                    SENTIMENT
                  </text>
                  <text x="445" y="104">
                    SHIFT +18.4%
                  </text>
                  <text x="445" y="118" className="event-label">
                    Illustrative
                  </text>
                </g>
              </g>

              {/* Cursor inspection */}
              <g className="sentiment-cursor">
                <line
                  ref={cursorLineRef}
                  className="cursor-guide"
                  x1="320"
                  x2="320"
                  y1="50"
                  y2="350"
                />
                <circle
                  ref={activeDotRef}
                  className="cursor-active-dot"
                  cx="320"
                  cy="150"
                  r="5"
                />
              </g>

              <g ref={inspectionRef} className="inspection-label" opacity="0">
                <rect width="118" height="38" rx="5" />
                <text className="inspection-time" x="9" y="15">
                  09:00
                </text>
                <text className="inspection-value" x="9" y="29">
                  SENTIMENT 30%
                </text>
              </g>

              {/* Timeline */}
              <g className="sentiment-timeline">
                <line x1="35" y1="360" x2="600" y2="360" />
                {[
                  { t: "09:00", x: 82 },
                  { t: "12:00", x: 205 },
                  { t: "15:00", x: 328 },
                  { t: "18:00", x: 451 },
                  { t: "21:00", x: 574 },
                ].map((tm) => (
                  <g key={tm.t}>
                    <line x1={tm.x} y1="354" x2={tm.x} y2="366" />
                    <text x={tm.x - 12} y="380">
                      {tm.t}
                    </text>
                  </g>
                ))}
                <circle
                  className="sentiment-current-marker"
                  cx="82"
                  cy="360"
                  r="4"
                />
              </g>
            </svg>
          </div>
        </div>

        {/* RIGHT: Content */}
        <div className="sentiment-content-column">
          <div className="sentiment-content">
            <p className="eyebrow">01 / SENTIMENT INTELLIGENCE</p>

            <div ref={storyStagesRef} className="sentiment-story-stages">
              <div className="sentiment-story-stage">
                <h2 id="sentiment-headline" className="sentiment-headline">
                  UNDERSTAND HOW THE
                  <br />
                  CONVERSATION FEELS.
                </h2>
                <p className="sentiment-desc">
                  "NEXUS analyzes social conversations to identify sentiment,
                  emotion, and stance - revealing how audience perception
                  changes as the conversation evolves."
                </p>
              </div>
              <div className="sentiment-story-stage" aria-hidden="true">
                <h2 className="sentiment-headline">
                  READ THE EMOTIONAL
                  <br />
                  SIGNALS BEHIND THE POSTS.
                </h2>
                <p className="sentiment-secondary">
                  SUPPORTIVE / CONCERNED / EXCITED
                </p>
              </div>
              <div className="sentiment-story-stage" aria-hidden="true">
                <h2 className="sentiment-headline">
                  TRACK HOW SENTIMENT
                  <br />
                  CHANGES OVER TIME.
                </h2>
                <p className="sentiment-story-stat">
                  SENTIMENT <strong>72%</strong>
                </p>
              </div>
              <div className="sentiment-story-stage" aria-hidden="true">
                <h2 className="sentiment-headline">
                  A SHIFT IS
                  <br />
                  TAKING SHAPE.
                </h2>
                <p className="sentiment-desc">
                  Audience perception is changing as the conversation evolves.
                </p>
              </div>
              <div className="sentiment-story-stage" aria-hidden="true">
                <h2 className="sentiment-headline">
                  FROM SIGNAL
                  <br />
                  TO INSIGHT.
                </h2>
                <p className="sentiment-desc">
                  NEXUS turns conversation data into a continuously evolving
                  picture of audience sentiment.
                </p>
              </div>
            </div>

            <p className="sentiment-secondary sentiment-story-support">
              From support and excitement to anxiety, skepticism, sarcasm, and
              opposition.
            </p>

            <div className="sentiment-metadata">
              <div className="meta-group">
                <label className="meta-label">SIGNALS</label>
                <span className="meta-value">POSTS / COMMENTS / REPLIES</span>
              </div>
              <div className="meta-group">
                <label className="meta-label">ANALYSIS</label>
                <span className="meta-value">NLP / EMOTION / STANCE</span>
              </div>
              <div className="meta-group">
                <label className="meta-label">TIMELINE</label>
                <span className="meta-value">CHRONOLOGICAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
