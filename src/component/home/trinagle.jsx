import React from 'react';

const Triangle = ({
  w = 20,
  h = 20,
  direction = 'left',
  children,
  textRotation = 90,
  textMarginX = 10, // Horizontal margin for text
  textMarginY = 5, // Vertical margin for text
}) => {
  const points = {
    top: [`${w / 2},0`, `0,${h}`, `${w},${h}`],
    right: [`0,0`, `0,${h}`, `${w},${h / 2}`],
    bottom: [`0,0`, `${w},0`, `${w / 2},${h}`],
    left: [`${w},0`, `${w},${h}`, `0,${h / 2}`],
  };

  return (
    <svg width={w} height={h}>
      <defs>
        <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0.07%" stopColor="#2F57C8" />
          <stop offset="100%" stopColor="#172B62" />
        </linearGradient>
      </defs>
      <polygon points={points[direction].join(' ')} fill="url(#gradient)" />
      {children && (
        <text
          x={direction === 'left' ? w - 10 - textMarginX : w / 2 + textMarginX}
          y={h / 2 + textMarginY}
          fill="white"
          fontSize="20"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${textRotation}, ${direction === 'left' ? w - 10 - textMarginX : w / 2 + textMarginX}, ${h / 2 + textMarginY})`}
        >
          {children}
        </text>
      )}
      Sorry, your browser does not support inline SVG.
    </svg>
  );
};

export default Triangle;
