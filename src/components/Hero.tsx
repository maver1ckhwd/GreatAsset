"use client";

import React from "react";
import { ArrowRight, Sparkles, Shield, Compass, Target } from "lucide-react";

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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(74,144,226,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(93,156,236,0.08),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left copy */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TALENT ACQUISITION, MANAGEMENT & DEVELOPMENT PARTNER</span>
          </div>
          
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-neutral-core dark:text-white">
            Building Strategic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
              Workforces from Scratch.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
            As your strategic Talent Acquisition, Management & Development Partner, we engineer the compliant, scalable HR infrastructure and full-lifecycle workforce programs your business needs to grow — including performance management, organizational structuring, and outsourcing support.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
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

        {/* Right visualization / Premium dashboard mockup */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-3xl filter blur-3xl opacity-30 animate-float" />
          
          <div className="relative bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-xl shadow-slate-900/5 dark:shadow-slate-950/20 max-w-md mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-display font-bold text-sm tracking-wide text-muted uppercase">Framework Analytics</span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Active audit
              </span>
            </div>

            {/* Mock stats indicator blocks */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted-light/45 rounded-xl border border-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-core dark:text-white">Compliance Status</span>
                </div>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/15 px-2 py-1 rounded-md">100% Audit-Ready</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted-light/45 rounded-xl border border-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-core dark:text-white">Retention Targets</span>
                </div>
                <span className="text-xs font-bold text-primary">+14% YoY Growth</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted-light/45 rounded-xl border border-border/40">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-core dark:text-white">Recruiting Speed</span>
                </div>
                <span className="text-xs font-bold text-neutral-core dark:text-white/90">18.4 Days Avg.</span>
              </div>
            </div>

            <div className="p-4 bg-primary text-primary-foreground rounded-2xl text-center space-y-1">
              <p className="text-xs opacity-75 font-medium">Workforce Performance Score</p>
              <h4 className="font-display font-extrabold text-2xl">94.8 / 100</h4>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
