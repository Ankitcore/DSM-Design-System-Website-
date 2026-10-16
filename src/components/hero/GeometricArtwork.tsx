"use client";

import React, { useState } from "react";

export const GeometricArtwork: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [isOrbHovered, setIsOrbHovered] = useState(false);

  // Coordinate nodes for the mint green grid
  const gridNodes = [
    { x: 300, y: 140 },
    { x: 330, y: 140 },
    { x: 360, y: 140 },
    { x: 390, y: 140 },
    { x: 300, y: 175 },
    { x: 330, y: 175 },
    { x: 360, y: 175 },
    { x: 390, y: 175 },
    { x: 300, y: 210 },
    { x: 330, y: 210 },
    { x: 360, y: 210 },
    { x: 390, y: 210 },
    { x: 300, y: 245 },
    { x: 330, y: 245 },
    { x: 360, y: 245 },
    { x: 390, y: 245 },
    { x: 300, y: 280 },
    { x: 330, y: 280 },
    { x: 360, y: 280 },
    { x: 390, y: 280 },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto select-none flex items-center justify-center">
      <svg
        viewBox="0 0 540 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl overflow-visible"
        aria-label="DSM Geometric Hero Artwork"
        role="img"
      >
        <defs>
          {/* Subtle spherical shading for the golden orb */}
          <radialGradient
            id="goldenOrbGradient"
            cx="35%"
            cy="35%"
            r="65%"
            fx="30%"
            fy="30%"
          >
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="25%" stopColor="#FFC94A" />
            <stop offset="70%" stopColor="#D99B16" />
            <stop offset="100%" stopColor="#8A5A00" />
          </radialGradient>

          {/* Cast shadow for the golden orb */}
          <radialGradient
            id="orbShadow"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0.65)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>

          {/* Clip path for the mint green semicircle */}
          <clipPath id="mintSemicircleClip">
            <path d="M 280 80 H 280 A 160 160 0 0 1 440 240 A 160 160 0 0 1 280 400 V 80 Z" />
          </clipPath>
        </defs>

        {/* 1. MINT GREEN SEMICIRCLE (Left half of top composition) */}
        {/* Curving outward to the right from vertical axis x=280 */}
        <path
          d="M 280 80 A 160 160 0 0 1 280 400 Z"
          fill="#43C58B"
          className="transition-colors duration-300"
        />

        {/* Precision coordinate grid lines on the mint semicircle */}
        <g stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.2">
          {/* Horizontal grid lines */}
          <line x1="280" y1="140" x2="400" y2="140" />
          <line x1="280" y1="175" x2="425" y2="175" />
          <line x1="280" y1="210" x2="438" y2="210" />
          <line x1="280" y1="245" x2="438" y2="245" />
          <line x1="280" y1="280" x2="425" y2="280" />
          <line x1="280" y1="315" x2="400" y2="315" />
          <line x1="280" y1="350" x2="350" y2="350" />

          {/* Vertical grid lines */}
          <line x1="300" y1="95" x2="300" y2="385" />
          <line x1="330" y1="115" x2="330" y2="365" />
          <line x1="360" y1="140" x2="360" y2="340" />
          <line x1="390" y1="175" x2="390" y2="305" />
        </g>

        {/* Interactive Coordinate Node Dots */}
        {gridNodes.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={hoveredNode === i ? 4 : 2.5}
            fill="#FFFFFF"
            className="transition-all duration-150 cursor-pointer"
            onMouseEnter={() => setHoveredNode(i)}
            onMouseLeave={() => setHoveredNode(null)}
          />
        ))}

        {/* 2. SOFT VIOLET EDITORIAL DISC (Right side) */}
        <g transform="translate(400, 240)">
          {/* Large circular segment in soft violet #B899D8 */}
          <circle
            cx="40"
            cy="0"
            r="160"
            fill="#B899D8"
          />

          {/* Dark purple/slate architectural curved smile/arc */}
          <path
            d="M -30 -10 A 110 110 0 0 0 110 110"
            stroke="#201535"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />

          {/* Speech bubble badge with heart */}
          <g transform="translate(60, -95)">
            {/* Bubble body */}
            <path
              d="M 0 0 H 42 C 46.4 0 50 3.6 50 8 V 28 C 50 32.4 46.4 36 42 36 H 18 L 10 44 V 36 H 0 C -4.4 36 -8 32.4 -8 28 V 8 C -8 3.6 -4.4 0 0 0 Z"
              fill="#FFFFFF"
              filter="drop-shadow(0px 4px 10px rgba(0,0,0,0.25))"
            />
            {/* Heart symbol inside speech bubble */}
            <path
              d="M 21 13 C 18 10 13 11 13 15 C 13 20 21 25 21 25 C 21 25 29 20 29 15 C 29 11 24 10 21 13 Z"
              fill="#FF8045"
            />
          </g>
        </g>

        {/* 3. BOTTOM SECTION: WARM ORANGE & YELLOW CHEVRON */}
        {/* Left Orange Triangle */}
        <polygon
          points="280,400 280,540 80,540"
          fill="#FF8045"
        />

        {/* Right Golden Yellow Triangle */}
        <polygon
          points="280,400 480,540 280,540"
          fill="#FFC94A"
        />

        {/* Center Keyhole / Downward Arrow Glyph in White */}
        <g transform="translate(280, 400)">
          {/* Keyhole circular ring at top */}
          <circle
            cx="0"
            cy="36"
            r="14"
            stroke="#FFFFFF"
            strokeWidth="5"
            fill="none"
          />
          {/* Vertical stem */}
          <line
            x1="0"
            y1="50"
            x2="0"
            y2="105"
            stroke="#FFFFFF"
            strokeWidth="5"
          />
          {/* Arrow point head */}
          <polyline
            points="-12,92 0,105 12,92"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* 4. GOLDEN YELLOW 3D SPHERE */}
        {/* Positioned at the intersection around x=280, y=240 */}
        <g
          className="transition-transform duration-300 cursor-pointer"
          style={{
            transform: isOrbHovered ? "translate(-3px, -5px) scale(1.04)" : "none",
            transformOrigin: "280px 240px",
          }}
          onMouseEnter={() => setIsOrbHovered(true)}
          onMouseLeave={() => setIsOrbHovered(false)}
        >
          {/* Drop shadow behind sphere */}
          <ellipse
            cx="290"
            cy="278"
            rx="46"
            ry="20"
            fill="url(#orbShadow)"
            opacity="0.8"
          />
          {/* The Sphere */}
          <circle
            cx="280"
            cy="240"
            r="44"
            fill="url(#goldenOrbGradient)"
          />
          {/* Specular high-light glint */}
          <circle
            cx="264"
            cy="224"
            r="6"
            fill="rgba(255, 255, 255, 0.6)"
            filter="blur(1px)"
          />
        </g>

        {/* Subtle decorative baseline line */}
        <line
          x1="280"
          y1="80"
          x2="280"
          y2="400"
          stroke="rgba(0, 0, 0, 0.4)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
