import { useRef, useState } from "react";

export function MagneticButton({
  children,
  className = "",
  strength = 0.25,
  as: Component = "button",
  ...props
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    setPosition({ x: distanceX, y: distanceY });
  };

  const handlePointerLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Component
      ref={buttonRef}
      className={`magnetic-button-wrap ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `translate3d(${position.x.toFixed(2)}px, ${position.y.toFixed(2)}px, 0)`,
        transition: position.x === 0 ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" : "transform 0.1s ease-out",
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
