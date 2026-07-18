"use client";

import React, { useState } from "react";
import { ClipboardCheck, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companySize: "",
    bottleneck: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter a valid full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.workEmail) {
      newErrors.workEmail = "Work email is required.";
    } else if (!emailRegex.test(formData.workEmail)) {
      newErrors.workEmail = "Please enter a valid work email.";
    } else {
      // Check if it is a personal email provider
      const personalDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com"];
      const domain = formData.workEmail.split("@")[1]?.toLowerCase();
      if (domain && personalDomains.includes(domain)) {
        newErrors.workEmail = "Please enter a corporate email address (not personal domains like Gmail).";
      }
    }

    if (!formData.companySize) {
      newErrors.companySize = "Please select your company size.";
    }

    if (!formData.bottleneck) {
      newErrors.bottleneck = "Please select your primary operational bottleneck.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      // Reset form fields after delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ fullName: "", workEmail: "", companySize: "", bottleneck: "" });
      }, 6000);
    }
  };

  return (
    <section id="health-check-form" className="py-20 md:py-28 relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.1),transparent_40%)]" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left marketing copy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold tracking-wide">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>ORGANIZATIONAL DIAGNOSTIC</span>
          </div>
          
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
            Perform Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              Workforce Health Check
            </span>
          </h2>
          
          <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-lg">
            Identify the friction points holding your human operations back. Fill out this brief diagnostic, and our senior HR advisors will compile a personalized evaluation analysis of your current structure.
          </p>

          <div className="space-y-4 pt-4 border-t border-white/20 text-white/80 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white font-semibold">1</span>
              <span>Submit your operational indicators securely</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white font-semibold">2</span>
              <span>Receive custom compliance & staffing scorecards</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white font-semibold">3</span>
              <span>Engage directly with a Senior HR Analyst (30 min call)</span>
            </div>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="lg:col-span-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl max-w-lg mx-auto">
            {isSubmitted ? (
              <div className="text-center py-16 space-y-6 animate-scale-up">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/35">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">Diagnostic Initiated</h3>
                <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Thank you! Our HR consultants will reach out shortly to coordinate your diagnostic report review call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Diagnostic Details</span>
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex justify-between">
                    <span>Full Name</span>
                    {errors.fullName && <span className="text-rose-400 font-semibold lowercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName}</span>}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-950 border text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors ${errors.fullName ? 'border-rose-500/60' : 'border-slate-800'}`}
                    placeholder="Jane Doe"
                  />
                </div>

                {/* Work Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex justify-between">
                    <span>Work Email</span>
                    {errors.workEmail && <span className="text-rose-400 font-semibold lowercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.workEmail}</span>}
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-950 border text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors ${errors.workEmail ? 'border-rose-500/60' : 'border-slate-800'}`}
                    placeholder="j.doe@company.com"
                  />
                </div>

                {/* Company Size Dropdown */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex justify-between">
                    <span>Company Size</span>
                    {errors.companySize && <span className="text-rose-400 font-semibold lowercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.companySize}</span>}
                  </label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-950 border text-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors ${errors.companySize ? 'border-rose-500/60' : 'border-slate-800'}`}
                  >
                    <option value="">Select size...</option>
                    <option value="1-15">Early-Stage (1 - 15)</option>
                    <option value="16-50">High-Growth (16 - 50)</option>
                    <option value="51-200">Mid-Market (51 - 200)</option>
                    <option value="201-500">Scale-Up (201 - 500)</option>
                    <option value="501+">Enterprise (501+)</option>
                  </select>
                </div>

                {/* Primary Operational Bottleneck Dropdown */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex justify-between">
                    <span>Primary Operational Bottleneck</span>
                    {errors.bottleneck && <span className="text-rose-400 font-semibold lowercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.bottleneck}</span>}
                  </label>
                  <select
                    name="bottleneck"
                    value={formData.bottleneck}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-950 border text-slate-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors ${errors.bottleneck ? 'border-rose-500/60' : 'border-slate-800'}`}
                  >
                    <option value="">Select primary bottleneck...</option>
                    <option value="Hiring Speed">Hiring Speed & Talent Sourcing</option>
                    <option value="Retention">Retention & Employee Turnovers</option>
                    <option value="Performance Management">Performance Management & Alignment</option>
                    <option value="Compliance">Compliance & State Audits</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:opacity-90 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md shadow-primary/20 mt-4"
                >
                  Initiate Audit & Health Check
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
