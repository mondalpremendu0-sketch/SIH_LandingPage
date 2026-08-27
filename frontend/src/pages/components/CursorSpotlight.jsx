import React from 'react';

export default function CursorSpotlight({ cursorPos }) {
  return (
    <div
      className="cursor-spotlight"
      style={{
        '--cursor-x': `${cursorPos.x}px`,
        '--cursor-y': `${cursorPos.y}px`,
      }}
    />
  );
}
