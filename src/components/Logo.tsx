"use client";

import React from "react";

// Single source of truth for design tokens.
// System configuration (tailwind.config.js) dynamically parses this object to configure global CSS.
export const BRAND_LOGO_COLORS = {
  primaryBrandBlue: {
    light: "#5B9BD5",
    dark: "#5B9BD5"
  },
  neutralCoreSlate: {
    light: "#333333",
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
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Official GREAT ASSET Brand Logo */}
      <img
        src="/great_asset_logo.png"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.endsWith(".png")) {
            target.src = "/great_asset_logo.jpg";
          }
        }}
        alt="GREAT ASSET"
        className="h-10 sm:h-12 md:h-14 w-auto object-contain shrink-0"
      />
    </div>
  );
}

