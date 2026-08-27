import { useEffect, useRef } from "react";

export function CursorSpotlight() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let frameId;

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (el) {
        el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="cursor-spotlight-layer"
      aria-hidden="true"
    />
  );
}
