"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("health-check-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 bg-radial-gradient">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(74,144,226,0.06),transparent_50%)]" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TALENT ACQUISITION, MANAGEMENT & DEVELOPMENT PARTNER</span>
        </div>
        
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-neutral-core">
          Building Strategic <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
            Workforces from Scratch.
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          As your strategic Talent Acquisition, Management & Development Partner, we engineer the compliant, scalable HR infrastructure and full-lifecycle workforce programs your business needs to grow — including performance management, organizational structuring, and outsourcing support.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a 
            href="#health-check-form" 
            onClick={handleScrollToForm}
            className="glow-btn bg-primary hover:opacity-90 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
          >
            Analyze Your Workforce
            <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="#services" 
            className="bg-transparent hover:bg-muted-light border border-border text-foreground font-semibold py-4 px-8 rounded-xl transition-all text-center"
          >
            Our Solutions
          </a>
        </div>
      </div>
    </section>
  );
}
