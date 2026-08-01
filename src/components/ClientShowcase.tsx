"use client";

import React from "react";

export default function ClientShowcase() {
  const clientLogos = [
    { src: "/healic.png", name: "HEALIC" },
    { src: "/captain_sales.png", name: "Captain Sales" },
    { src: "/designwell_pdc.png", name: "Designwell PDC" },
    { src: "/casa_derma.png", name: "Casa Derma Skin Solutions" },
    { src: "/badili.png", name: "Badili" },
    { src: "/kp_architects.png", name: "KP Architects" },
    { src: "/centricity.png", name: "Centricity" },
    { src: "/india_print_n_serve.png", name: "Print N Serve Pvt. Ltd." }
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
              <img 
                src={client.src} 
                alt={`${client.name} Logo`} 
                className="max-h-16 max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105 select-none" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
