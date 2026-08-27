import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { NexusSocialCore3D } from "./NexusSocialCore3D";

export function HeroBackground() {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    const nodeCount = Math.min(30, Math.floor((width * height) / 36000));
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2.2 + 1.2,
      isCyan: Math.random() > 0.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark =
        document.documentElement.dataset.theme === "dark" ||
        (!document.documentElement.dataset.theme &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * (isDark ? 0.22 : 0.15);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(129, 140, 248, ${alpha})`
              : `rgba(79, 70, 229, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        if (!reduceMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        if (node.isCyan) {
          ctx.fillStyle = isDark
            ? "rgba(56, 189, 248, 0.45)"
            : "rgba(2, 132, 199, 0.35)";
        } else {
          ctx.fillStyle = isDark
            ? "rgba(129, 140, 248, 0.45)"
            : "rgba(79, 70, 229, 0.35)";
        }
        ctx.fill();
      });

      if (!reduceMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reduceMotion]);

  return (
    <div className="hero-background" aria-hidden="true">
      <div className="hero-radial-glow hero-glow-top" />
      <div className="hero-radial-glow hero-glow-accent" />
      <div className="hero-grid" />
      <NexusSocialCore3D />
      <canvas ref={canvasRef} className="social-field-canvas" />
      <div className="hero-fade" />
    </div>
  );
}
