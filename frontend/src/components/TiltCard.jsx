import { useRef, useState } from "react";

export function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.02,
  glowColor = "rgba(99, 102, 241, 0.18)",
  ...props
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });

  const handlePointerMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      x: rotateX,
      y: rotateY,
      glareX,
      glareY,
      isHovered: true,
    });
  };

  const handlePointerLeave = () => {
    setTilt({
      x: 0,
      y: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-container ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: tilt.isHovered
          ? "transform 0.12s ease-out"
          : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      {...props}
    >
      {children}
      <div
        className="tilt-card-glare"
        style={{
          opacity: tilt.isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, ${glowColor} 0%, transparent 65%)`,
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
