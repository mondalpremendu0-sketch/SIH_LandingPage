import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const smoothstep = (value) => value * value * (3 - 2 * value);
const lerp = (from, to, amount) => from + (to - from) * amount;

function createRandom() {
  let seed = 61;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function createParticles(count, width, height, random) {
  return Array.from({ length: count }, (_, index) => {
    const clustered = index % 4 !== 0;
    const baseX = clustered ? 0.54 + random() * 0.46 : 0.38 + random() * 0.62;
    return {
      x: width * baseX,
      y: height * (0.08 + random() * 0.84),
      vx: (random() - 0.5) * 0.05,
      vy: (random() - 0.5) * 0.05,
      phase: random() * TAU,
      size:
        index % 28 === 0 ? 2.8 : index % 7 === 0 ? 1.8 : 0.8 + random() * 0.5,
      depth: index % 8 === 0 ? 0.95 : index % 3 === 0 ? 0.62 : 0.28,
      opacity: 0.3 + random() * 0.28,
      signal: index % 18 === 0,
      activity: 0,
    };
  });
}

export function SocialFieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const mobileViewport = window.innerWidth < 768;
    const context = canvas.getContext("2d");
    const host = canvas.closest(".hero");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const random = createRandom();
    const pointer = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      velocity: 0,
    };
    let frame;
    let width = 0;
    let height = 0;
    let particles = [];
    let visible = !document.hidden;
    let inViewport = true;
    let lastTime = performance.now();
    let startedAt = performance.now();
    let nextSignal = startedAt + 5000 + random() * 3000;
    let signal = null;
    let renderedNeutral = [0, 0, 0];
    let renderedAccent = [98, 86, 217];

    const resize = () => {
      const bounds = canvas.parentElement.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = width < 700 ? 65 : width < 1100 ? 130 : 220;
      particles = createParticles(count, width, height, random);
    };

    const draw = (time) => {
      if (!visible || !inViewport) return;
      const delta = Math.min(time - lastTime, 34);
      lastTime = time;
      const entrance = Math.min((time - startedAt) / 2200, 1);
      const theme = document.documentElement.dataset.theme;
      const isDark =
        theme === "dark" ||
        (theme !== "light" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      const targetNeutral = isDark ? [244, 244, 241] : [87, 87, 87];
      const targetAccent = isDark ? [117, 103, 248] : [98, 86, 217];
      renderedNeutral = renderedNeutral.map((value, index) =>
        lerp(value, targetNeutral[index], 0.035),
      );
      renderedAccent = renderedAccent.map((value, index) =>
        lerp(value, targetAccent[index], 0.035),
      );
      const radius = width < 1100 ? 150 : 215;
      const interactive = finePointer.matches && pointer.x > -500;
      const signalAge = signal ? time - signal.started : -1;

      if (time >= nextSignal && !signal) {
        const source = particles.findIndex((particle) => particle.signal);
        signal = {
          started: time,
          duration: 1100 + random() * 700,
          source: source < 0 ? 0 : source,
          receiver: (source + 11) % particles.length,
        };
        nextSignal = Infinity;
      }
      if (signal && signalAge > signal.duration + 450) {
        signal = null;
        nextSignal = time + 5000 + random() * 3000;
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.1;
      pointer.y += (pointer.targetY - pointer.y) * 0.1;
      pointer.velocity *= 0.92;
      context.clearRect(0, 0, width, height);

      const positions = particles.map((particle) => {
        const distance = Math.hypot(
          particle.x - pointer.x,
          particle.y - pointer.y,
        );
        const influence = interactive
          ? smoothstep(clamp(1 - distance / radius, 0, 1))
          : 0;
        particle.activity = Math.max(particle.activity * 0.965, influence);
        const flow =
          Math.sin(time * 0.00035 * particle.depth + particle.phase) * 0.0012;
        const force = influence * (0.002 + pointer.velocity * 0.0007);
        particle.vx +=
          flow * particle.depth + (pointer.x - particle.x) * force * 0.0005;
        particle.vy +=
          Math.cos(time * 0.0003 * particle.depth + particle.phase) *
            0.0012 *
            particle.depth +
          (pointer.y - particle.y) * force * 0.0005;
        particle.vx *= 0.996;
        particle.vy *= 0.996;
        if (!mobileViewport && !reduceMotion.matches) {
          particle.x += particle.vx * delta * particle.depth;
          particle.y += particle.vy * delta * particle.depth;
        }
        if (particle.x < width * 0.35 || particle.x > width + 10)
          particle.vx *= -1;
        if (particle.y < -10 || particle.y > height + 10) particle.vy *= -1;
        return { ...particle, influence };
      });

      const cellSize = 130;
      const grid = new Map();
      positions.forEach((particle, index) => {
        const key = `${Math.floor(particle.x / cellSize)}:${Math.floor(particle.y / cellSize)}`;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key).push(index);
      });
      const connected = new Set();
      positions.forEach((particle, index) => {
        const cellX = Math.floor(particle.x / cellSize);
        const cellY = Math.floor(particle.y / cellSize);
        for (let x = cellX - 1; x <= cellX + 1; x += 1)
          for (let y = cellY - 1; y <= cellY + 1; y += 1) {
            (grid.get(`${x}:${y}`) || []).forEach((otherIndex) => {
              if (
                otherIndex <= index ||
                connected.size > positions.length * 2.4
              )
                return;
              const other = positions[otherIndex];
              const distance = Math.hypot(
                particle.x - other.x,
                particle.y - other.y,
              );
              if (distance > 112) return;
              connected.add(`${index}:${otherIndex}`);
              const local = Math.max(
                particle.influence,
                other.influence,
                particle.activity,
                other.activity,
              );
              const fade =
                0.35 +
                Math.sin(time * 0.00018 + particle.phase + other.phase) * 0.22;
              const alpha = (0.025 + fade * 0.06 + local * 0.06) * entrance;
              context.strokeStyle = `rgba(${renderedNeutral.join(",")}, ${alpha})`;
              context.lineWidth = local > 0.08 ? 0.75 : 0.45;
              context.beginPath();
              context.moveTo(particle.x, particle.y);
              context.lineTo(other.x, other.y);
              context.stroke();
            });
          }
      });

      positions.forEach((particle, index) => {
        const sourcePulse =
          signal &&
          signal.source === index &&
          signalAge > 0 &&
          signalAge < signal.duration
            ? Math.sin((signalAge / signal.duration) * Math.PI) * 0.3
            : 0;
        const receiverPulse =
          signal &&
          signal.receiver === index &&
          signalAge > signal.duration * 0.55 &&
          signalAge < signal.duration + 450
            ? Math.sin(
                clamp(
                  (signalAge - signal.duration * 0.55) /
                    (signal.duration * 0.45),
                  0,
                  1,
                ) * Math.PI,
              ) * 0.26
            : 0;
        const pulse = Math.max(sourcePulse, receiverPulse);
        const alpha =
          (particle.opacity + particle.influence * 0.22 + pulse) * entrance;
        const color =
          pulse > 0 || particle.influence > 0.12
            ? renderedAccent
            : renderedNeutral;
        context.fillStyle = `rgba(${color.join(",")}, ${alpha})`;
        context.beginPath();
        context.arc(
          particle.x,
          particle.y,
          particle.size * (1 + pulse + particle.influence * 0.08),
          0,
          TAU,
        );
        context.fill();
      });

      if (signal && signalAge > 0 && signalAge < signal.duration) {
        const source = positions[signal.source];
        const receiver = positions[signal.receiver];
        const progress = clamp(signalAge / signal.duration, 0, 1);
        const x = source.x + (receiver.x - source.x) * progress;
        const y = source.y + (receiver.y - source.y) * progress;
        context.fillStyle = `rgba(${renderedAccent.join(",")}, ${0.5 * Math.sin(progress * Math.PI) * entrance})`;
        context.beginPath();
        context.arc(x, y, 2.2, 0, TAU);
        context.fill();
        if (progress > 0.55) {
          context.font = "10px Geist Mono, IBM Plex Mono, monospace";
          context.fillStyle = `rgba(${renderedNeutral.join(",")}, ${0.2 * entrance})`;
          context.fillText("SIGNAL / 042", x + 9, y - 8);
        }
      }

      if (!mobileViewport && (entrance < 1 || !reduceMotion.matches))
        frame = requestAnimationFrame(draw);
    };

    const movePointer = (event) => {
      if (!finePointer.matches) return;
      const bounds = host.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      pointer.velocity = Math.min(
        2,
        Math.hypot(x - pointer.targetX, y - pointer.targetY) / 20,
      );
      pointer.targetX = x;
      pointer.targetY = y;
    };
    const leavePointer = () => {
      pointer.targetX = -1000;
      pointer.targetY = -1000;
    };
    const handleVisibility = () => {
      visible = !document.hidden;
      if (visible) frame = requestAnimationFrame(draw);
      else cancelAnimationFrame(frame);
    };
    const intersection = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport && visible) frame = requestAnimationFrame(draw);
        else cancelAnimationFrame(frame);
      },
      { threshold: 0.01 },
    );
    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement);
    intersection.observe(host);
    if (!mobileViewport) {
      host.addEventListener("pointermove", movePointer);
      host.addEventListener("pointerleave", leavePointer);
    }
    document.addEventListener("visibilitychange", handleVisibility);
    resize();
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      if (!mobileViewport) {
        host.removeEventListener("pointermove", movePointer);
        host.removeEventListener("pointerleave", leavePointer);
      }
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="social-field-canvas"
      aria-hidden="true"
    />
  );
}
