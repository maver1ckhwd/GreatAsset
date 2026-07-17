"use client";

import React from "react";

interface CropProps {
  x: number;
  y: number;
  w: number;
  h: number;
  scale?: number;
  alt: string;
  className?: string;
}

export default function LogoCrop({ x, y, w, h, scale = 1, alt, className = "" }: CropProps) {
  const displayW = w * scale;
  const displayH = h * scale;
  
  return (
    <div 
      className={`relative overflow-hidden inline-block select-none ${className}`}
      style={{ 
        width: `${displayW}px`, 
        height: `${displayH}px`, 
      }}
    >
      <img 
        src="/logo_sheet.png" 
        alt={alt}
        draggable={false}
        className="absolute max-w-none origin-top-left"
        style={{ 
          left: `-${x * scale}px`, 
          top: `-${y * scale}px`, 
          width: `${1024 * scale}px`, 
          height: `${562 * scale}px`, 
        }} 
      />
    </div>
  );
}
