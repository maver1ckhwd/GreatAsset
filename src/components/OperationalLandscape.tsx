"use client";

import React from "react";
import { 
  Globe2, 
  FileCheck2, 
  Calculator, 
  MapPin, 
  BarChart3, 
  TrendingUp,
  CheckCircle2
} from "lucide-react";

export default function OperationalLandscape() {
  const landscapeItems = [
    {
      title: "Multi-Region Talent Acquisition & Retention",
      category: "Nationwide Sourcing",
      description: "Sourcing, compensation benchmarking, and structured retention drives for distributed teams across PAN India.",
      highlights: [
        "Pan-India compensation benchmarking",
        "Multi-city sourcing pipelines",
        "Structured regional retention drives"
      ],
      icon: Globe2,
    },
    {
      title: "Process & Policy Standardization",
      category: "Corporate Alignment",
      description: "Deploying documented policies, JDs, evaluation frameworks, and compliance protocols from Month 1.",
      highlights: [
        "Standardized job descriptions (JDs)",
        "Month 1 compliance protocols",
        "Structured evaluation frameworks"
      ],
      icon: FileCheck2,
    },
    {
      title: "End-to-End Payroll & Statutory Compliance",
      category: "Multi-State Compliance",
      description: "Managing nationwide multi-state compliance (PF, ESI, TDS, PT) and error-free payroll operations.",
      highlights: [
        "Multi-state PF, ESI, TDS & PT filing",
        "Zero-error payroll reconciliation",
        "Statutory audit-ready records"
      ],
      icon: Calculator,
    },
    {
      title: "Field & Remote Force Management",
      category: "Distributed Operations",
      description: "Attendance tracking, GPS-enabled check-ins, and leave MIS for distributed and field personnel.",
      highlights: [
        "GPS-enabled field check-in tracking",
        "Real-time attendance & leave MIS",
        "Remote workforce policy governance"
      ],
      icon: MapPin,
    },
    {
      title: "Performance & Appraisal Systems",
      category: "Growth & Governance",
      description: "Designing KRA/KPI frameworks and structured appraisal calendars for specialized roles.",
      highlights: [
        "Role-specific KRA / KPI matrices",
        "Structured appraisal calendars",
        "Performance improvement plans"
      ],
      icon: BarChart3,
    },
    {
      title: "Rapid Regional Expansion",
      category: "Agile Scale",
      description: "Agile talent pipelines enabling rapid hiring across multi-city and PAN India branch locations.",
      highlights: [
        "Multi-city branch ramp-ups",
        "Rapid hiring velocity SLA",
        "PAN India regional network"
      ],
      icon: TrendingUp,
    },
  ];

  return (
    <section id="landscape" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs text-primary tracking-widest font-bold uppercase px-3.5 py-1.5 rounded-full bg-primary/10 inline-block">
            NATIONWIDE OPERATIONAL LANDSCAPE
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-neutral-core tracking-tight leading-tight">
            Solving Enterprise Operations Across PAN India
          </h2>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            We systematically address the critical operational and workforce scaling challenges faced by expanding multi-region enterprises.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {landscapeItems.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div 
                key={index}
                className="bg-card border border-border hover:border-primary/50 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-xl text-neutral-core group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-muted text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Key Bullet Highlights */}
                <div className="pt-6 border-t border-border mt-6">
                  <ul className="space-y-2">
                    {item.highlights.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-foreground/80 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
