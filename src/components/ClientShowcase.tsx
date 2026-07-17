"use client";

import React from "react";

interface ImgCropProps {
  src: string;
  w: number;
  h: number;
  alt: string;
  trim?: number;
}

// Utility to crop out the border outlines of user uploaded individual logo files
function ImgCrop({ src, w, h, alt, trim = 5 }: ImgCropProps) {
  return (
    <div 
      className="relative overflow-hidden inline-block select-none"
      style={{ 
        width: `${w}px`, 
        height: `${h}px` 
      }}
    >
      <img 
        src={src} 
        alt={alt}
        draggable={false}
        className="absolute max-w-none"
        style={{ 
          left: `-${trim}px`, 
          top: `-${trim}px`, 
          width: `calc(100% + ${trim * 2}px)`, 
          height: `calc(100% + ${trim * 2}px)`, 
        }} 
      />
    </div>
  );
}

export default function ClientShowcase() {
  const clientLogos = [
    { src: "/healic.png", w: 150, h: 75, trim: 6, name: "HEALIC" },
    // Captain Sales has trim={4} to cut out the remaining right border outline without clipping text
    { src: "/captain_sales.png", w: 160, h: 66, trim: 4, name: "Captain Sales" },
    { src: "/designwell_pdc.png", w: 90, h: 80, trim: 5, name: "Designwell PDC" },
    { src: "/casa_derma.png", w: 100, h: 66, trim: 6, name: "Casa Derma Skin Solutions" },
    { src: "/badili.png", w: 160, h: 50, trim: 5, name: "Badili" },
    // Sliced files updated to trim out outlines completely
    { src: "/kp_architects.png", w: 140, h: 70, trim: 4, name: "KP Architects" },
    { src: "/centricity.png", w: 140, h: 46, trim: 4, name: "Centricity" },
    { src: "/india_print_n_serve.png", w: 100, h: 80, trim: 4, name: "Print N Serve Pvt. Ltd." }
  ];

  return (
    <section className="py-16 bg-muted-light/60 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs text-supporting tracking-widest font-bold uppercase">OUR PARTNERS</span>
          <h2 className="font-display font-extrabold text-3xl text-primary tracking-tight">
            Our Clients
          </h2>
          <p className="text-muted text-sm sm:text-base">
            Trusted by leading brands across healthcare, architecture, sales, and high-growth sectors.
          </p>
        </div>

        {/* Client Grid (Exactly 4 columns per row for 2 rows on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto items-center justify-center">
          {clientLogos.map((client, idx) => (
            <div 
              key={idx} 
              // Keep card background as bg-white in both light and dark modes to blend white logo images seamlessly
              className="bg-white border border-border/80 p-4 rounded-2xl h-28 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow group overflow-hidden"
            >
              <div className="group-hover:scale-105 transition-transform duration-300">
                <ImgCrop 
                  src={client.src} 
                  w={client.w} 
                  h={client.h} 
                  trim={client.trim} 
                  alt={`${client.name} Logo`} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
