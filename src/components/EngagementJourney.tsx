"use client";

import React from "react";
import { 
  PhoneCall, 
  SearchCheck, 
  FileCheck, 
  Users, 
  Rocket, 
  ArrowRight,
  ChevronRight
} from "lucide-react";

export default function EngagementJourney() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Alignment",
      tagline: "30-Min Consultation",
      description: "Initial 30-minute consultation call to discuss scope, priorities, and organizational goals.",
      icon: PhoneCall,
    },
    {
      number: "02",
      title: "Organizational Diagnostic",
      tagline: "Virtual Assessment",
      description: "A swift, virtual 1-hour assessment of existing HR processes, policies, and headcount plans.",
      icon: SearchCheck,
    },
    {
      number: "03",
      title: "Partnership Formalization",
      tagline: "Agreement Sign-Off",
      description: "Finalize scope of work, commencement date, and service terms with formal agreement sign-off.",
      icon: FileCheck,
    },
    {
      number: "04",
      title: "Kickoff & Integration",
      tagline: "Dedicated Onboarding",
      description: "Onboarding as your dedicated HR partner—assigning primary points of contact, setting up communication charters, and sharing the Month 1 execution plan.",
      icon: Users,
    },
    {
      number: "05",
      title: "Month 1 Execution & Rollout",
      tagline: "Immediate Deployment",
      description: "Immediate deployment of core deliverables including JD standardization, compensation benchmarking, policy drafting, and payroll integration.",
      icon: Rocket,
    },
  ];

  const handleScrollToDiagnostic = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("health-check-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="journey" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs text-primary tracking-widest font-bold uppercase px-3.5 py-1.5 rounded-full bg-primary/10 inline-block">
            STRUCTURED ONBOARDING PATHWAY
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-neutral-core tracking-tight leading-tight">
            Engagement Journey & Onboarding
          </h2>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            A clear, step-by-step roadmap showing how clients move from initial contact to full execution across PAN India operations.
          </p>
        </div>

        {/* 5-Step Desktop & Mobile Stepper Grid */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => {
              const IconComp = step.icon;
              return (
                <div 
                  key={index}
                  className="bg-card border border-border hover:border-primary/50 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between group relative"
                >
                  <div className="space-y-4">
                    {/* Top Row: Number Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-2xl bg-primary text-white font-display font-extrabold text-sm flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                        {step.number}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Step Tagline */}
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-md inline-block">
                      {step.tagline}
                    </span>

                    {/* Title */}
                    <h3 className="font-display font-bold text-lg text-neutral-core group-hover:text-primary transition-colors leading-snug">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Connector Indicator for Mobile/Desktop */}
                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-[11px] text-muted font-semibold">
                    <span>Step {step.number} of 05</span>
                    <ChevronRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-muted-light/40 border border-border p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-display font-bold text-lg text-neutral-core">
              Ready to begin Step 01?
            </h4>
            <p className="text-muted text-xs sm:text-sm">
              Schedule your 30-minute discovery call and initiate your organizational diagnostic assessment.
            </p>
          </div>
          <a
            href="#health-check-form"
            onClick={handleScrollToDiagnostic}
            className="glow-btn bg-primary hover:opacity-90 text-white font-bold py-3.5 px-6 rounded-xl text-sm shadow-md shadow-primary/20 transition-all shrink-0 flex items-center gap-2"
          >
            Start Diagnostic Assessment <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
