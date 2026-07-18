"use client";

import React from "react";

// Single source of truth for design tokens.
// System configuration (tailwind.config.js) dynamically parses this object to configure global CSS.
export const BRAND_LOGO_COLORS = {
  primaryBrandBlue: {
    light: "#4A90E2",
    dark: "#5D9CEC"
  },
  neutralCoreSlate: {
    light: "#1A2B49",
    dark: "#FFFFFF"
  },
  supportingMetallicGray: {
    light: "#94A3B8",
    dark: "#CBD5E1"
  }
};

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ className = "", iconOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Icon (Circular GA Emblem) */}
      <svg
        viewBox="0 0 100 100"
        className="w-10 h-10 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outermost Element: Subtle circular border container */}
        <circle
          cx="50"
          cy="50"
          r="46"
          className="stroke-supporting-subtle/30 dark:stroke-supporting-subtle/20"
          strokeWidth="3.5"
          fill="none"
        />

        {/* The 'G' Structure: Thick open geometric arc */}
        <path
          d="M 68 34 C 63 27, 54 23, 44 24 C 29 26, 19 40, 21 55 C 23 70, 37 80, 52 78 C 65 76, 73 66, 74 54 L 54 54"
          className="stroke-supporting-subtle"
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* The 'A' Structure: Interlocking angular monogram 'A' with multi-tone blue paths */}
        {/* Left leg of 'A' */}
        <path
          d="M 50 32 L 34 68"
          className="stroke-primary"
          strokeWidth="8.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right leg of 'A' */}
        <path
          d="M 50 32 L 66 68"
          className="stroke-primary/80"
          strokeWidth="8.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Horizontal bar of 'A' */}
        <path
          d="M 40 54 L 60 54"
          className="stroke-primary/90"
          strokeWidth="6.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* The Typography ('Great Asset') */}
      {!iconOnly && (
         <div className="flex flex-col text-left">
          <span className="font-display font-black text-xl tracking-tight leading-none">
            <span className="text-primary">Great</span>
            <span className="text-neutral-core dark:text-white transition-colors duration-300 ml-1">
              Asset
            </span>
          </span>
          <span className="text-[9px] text-supporting-subtle tracking-widest font-bold uppercase leading-none mt-1">
            Talent Acquisition
          </span>
        </div>
      )}
    </div>
  );
}

