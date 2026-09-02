"use client";

import React from "react";
import { 
  Users, 
  Clock, 
  CreditCard, 
  HeartHandshake, 
  Target, 
  UserMinus,
  CheckCircle2,
  Zap
} from "lucide-react";

export default function ExecutionFramework() {
  const capabilities = [
    {
      title: "Workforce Planning & Talent Sourcing",
      deliveryTag: "Virtual-First & Hybrid",
      icon: Users,
      deliverables: [
        "Headcount planning & organogram alignment",
        "Multi-channel job posting & candidate screening",
        "Structured interview scheduling & offer management",
        "End-to-end employee onboarding workflows"
      ]
    },
    {
      title: "Attendance & Leave Operations",
      deliveryTag: "Real-Time Tracking",
      icon: Clock,
      deliverables: [
        "Custom leave policy design & entitlement structuring",
        "Remote & GPS-enabled field check-in management",
        "Leave ledger maintenance & discrepancy resolution",
        "Monthly attendance MIS reports for payroll input"
      ]
    },
    {
      title: "Payroll & Compensation Operations",
      deliveryTag: "Multi-State Execution",
      icon: CreditCard,
      deliverables: [
        "Monthly CTC structuring & tax-efficient breakdowns",
        "Statutory compliance (PF, ESI, TDS, Professional Tax)",
        "Automated payslip generation & disbursement sync",
        "Expense reimbursements & accounts coordination"
      ]
    },
    {
      title: "Culture & Employee Engagement",
      deliveryTag: "Hybrid Engagement",
      icon: HeartHandshake,
      deliverables: [
        "Milestone & tenure recognition programs",
        "Bi-annual employee satisfaction pulse surveys",
        "Virtual & on-site team culture initiatives",
        "Internal communication & policy broadcast governance"
      ]
    },
    {
      title: "Performance Management Frameworks",
      deliveryTag: "SMART Governance",
      icon: Target,
      deliverables: [
        "Role-wise KRA & KPI framework formulation",
        "Quarterly appraisal calendar & review protocols",
        "Manager goal-setting workshops & feedback loops",
        "Productivity analytics & PIP management"
      ]
    },
    {
      title: "Retention & Offboarding Management",
      deliveryTag: "Risk Mitigation",
      icon: UserMinus,
      deliverables: [
        "Early retention risk flagging & stay interviews",
        "Structured exit interviews & attrition analytics",
        "Clearance & formal handover workflow management",
        "Full & final settlement (FNF) compliance processing"
      ]
    }
  ];

  return (
    <section id="framework" className="py-20 md:py-28 bg-muted-light/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide">
            <Zap className="w-3.5 h-3.5" />
            <span>SCOPE OF WORK & DELIVERABLES</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-neutral-core dark:text-white tracking-tight leading-tight">
            Service Capabilities & Execution Framework
          </h2>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            A comprehensive breakdown of deliverables executed through our virtual-first and hybrid delivery model across nationwide operations.
          </p>
        </div>

        {/* 6 Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div 
                key={index}
                className="bg-card border border-border hover:border-primary/50 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-muted border border-border bg-muted-light/40 px-3 py-1 rounded-full">
                      {item.deliveryTag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl text-neutral-core dark:text-white group-hover:text-primary transition-colors mb-6 leading-snug">
                    {item.title}
                  </h3>

                  {/* Deliverables List */}
                  <ul className="space-y-3 border-t border-border pt-6">
                    {item.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-muted leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{deliv}</span>
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
