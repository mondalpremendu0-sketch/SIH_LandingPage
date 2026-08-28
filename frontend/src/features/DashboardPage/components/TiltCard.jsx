import React, { useState, useRef } from 'react';

export default function TiltCard({ children, className = "", isDarkMode }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    const rotateX = (y - 0.5) * -16; 
    const rotateY = (x - 0.5) * 16;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: isDarkMode 
        ? `${-rotateY}px ${rotateX + 10}px 30px rgba(0,0,0,0.4)` 
        : `${-rotateY}px ${rotateX + 10}px 30px rgba(0,0,0,0.12)`
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
      boxShadow: 'none'
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl border ${
        isDarkMode 
          ? 'border-gray-700 bg-[#14171E] text-gray-50 shadow-none' 
          : 'border-gray-300 bg-white text-gray-950 shadow-sm'
      } p-6 will-change-transform ${className}`}
      style={style}
    >
      <div className={`absolute inset-0 rounded-xl pointer-events-none border ${
        isDarkMode ? 'border-white/15' : 'border-black/5'
      } mix-blend-overlay`}></div>
      {children}
    </div>
  );
}