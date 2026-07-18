"use client";

import React, { useState } from "react";
import { Users, Briefcase, Award, ClipboardCheck, ArrowRight, ChevronRight } from "lucide-react";

export default function ServicesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      title: "Workforce Planning",
      description: "Strategic planning alignment, head-count scaling models, and organizational structure mapping.",
      details: ["Scalable job architecture", "Salary benchmarking metrics", "Future-proof org charts"],
      icon: Briefcase,
    },
    {
      title: "Talent Acquisition",
      description: "Direct-hire executive placement and specialized sourcing models for high-growth corporate and technical roles.",
      details: ["Retained search structures", "Competitor talent mapping", "Discreet candidate assessment"],
      icon: Users,
    },
    {
      title: "SMART Performance Systems",
      description: "High-impact employee evaluation, performance dashboards, and key metric evaluation grids.",
      details: ["Objective key indicators (OKRs)", "SMART goal mapping tools", "Bonus incentive matrix structures"],
      icon: Award,
    },
    {
      title: "Full HR Outsourcing",
      description: "Total people operations support, compliance auditing, payroll synchronization, and handbooks.",
      details: ["PEO alignment & mapping", "State-by-state compliance audits", "Scalable employee onboarding"],
      icon: ClipboardCheck,
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-muted-light/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs text-primary tracking-widest font-bold uppercase">SERVICE SPECTRUM</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-neutral-core dark:text-white tracking-tight">
            Scalable People Operations Infrastructure
          </h2>
          <p className="text-muted text-sm sm:text-base">
            Configure your strategic HR infrastructure with modular services designed for corporate alignment and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className={`relative bg-card border rounded-3xl p-8 shadow-sm transition-all duration-300 flex flex-col justify-between group ${
                  isHovered 
                    ? "border-primary shadow-lg shadow-primary/5 -translate-y-2" 
                    : "border-border hover:border-primary/50"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-display font-bold text-xl mb-3 text-neutral-core dark:text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted text-xs leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Detailed list showing on hover/interaction */}
                  <ul className="space-y-2 border-t border-border pt-4">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[10px] text-muted font-medium">
                        <ChevronRight className="w-3 h-3 text-primary shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href="#health-check-form"
                    className="text-xs font-bold text-primary hover:text-neutral-core dark:hover:text-white flex items-center gap-1.5 transition-colors mt-2"
                  >
                    Select Capability <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
