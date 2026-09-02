"use client";

import React, { useState } from "react";
import { ClipboardCheck, Sparkles, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase, isSupabaseConfigured, type SignupRecord } from "@/lib/supabaseClient";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  companySize: string;
  bottleneck: string;
  message: string;
}

export default function LeadForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    companySize: "",
    bottleneck: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Please enter a valid name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid work email.";
    } else {
      const personalDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com"];
      const domain = formData.email.trim().split("@")[1]?.toLowerCase();
      if (domain && personalDomains.includes(domain)) {
        newErrors.email = "Please enter a corporate email address.";
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const insertPayload: SignupRecord = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      company: formData.company.trim() || undefined,
      company_size: formData.companySize || undefined,
      bottleneck: formData.bottleneck || undefined,
      message: formData.message.trim() || undefined,
    };

    try {
      if (!isSupabaseConfigured()) {
        // Fallback when .env.local hasn't been configured with live Supabase credentials yet
        console.warn(
          "[Supabase] Credentials (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) are not set in .env.local. Submission simulated with payload:",
          insertPayload
        );
        await new Promise((resolve) => setTimeout(resolve, 600));
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          companySize: "",
          bottleneck: "",
          message: "",
        });
        setErrors({});
        return;
      }

      const { error } = await supabase.from("signups").insert([insertPayload]);

      if (error) {
        throw new Error(error.message || "Failed to submit diagnostic request. Please try again.");
      }

      setIsSubmitted(true);
      // Clean form reset after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        companySize: "",
        bottleneck: "",
        message: "",
      });
      setErrors({});
    } catch (err: unknown) {
      let errorMessage = "An unexpected error occurred during submission.";
      if (err instanceof Error) {
        if (err.message.includes("Failed to fetch")) {
          errorMessage = "Could not connect to Supabase. Please verify your NEXT_PUBLIC_SUPABASE_URL in .env.local and network connection.";
        } else {
          errorMessage = err.message;
        }
      }
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmitError(null);
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
              <div className="text-center py-12 space-y-6 animate-scale-up">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/35">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">Diagnostic Initiated</h3>
                <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Thank you! Your details have been successfully submitted to our database. Our HR consultants will reach out shortly.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex items-center gap-2 text-xs text-primary font-semibold hover:underline pt-2"
                >
                  Submit Another Diagnostic
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Diagnostic Signup & Contact</span>
                </div>

                {submitError && (
                  <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-rose-200">Submission Error</p>
                      <p className="mt-0.5">{submitError}</p>
                    </div>
                  </div>
                )}

                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="form-name" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex justify-between">
                    <span>Full Name *</span>
                    {errors.name && <span className="text-rose-400 font-semibold lowercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</span>}
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full bg-slate-950 border text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50 ${errors.name ? 'border-rose-500/60' : 'border-slate-800'}`}
                    placeholder="Jane Doe"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="form-email" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex justify-between">
                    <span>Work Email *</span>
                    {errors.email && <span className="text-rose-400 font-semibold lowercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</span>}
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full bg-slate-950 border text-white rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50 ${errors.email ? 'border-rose-500/60' : 'border-slate-800'}`}
                    placeholder="j.doe@company.com"
                  />
                </div>

                {/* Phone & Company Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="form-phone" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Phone Number</span>
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-1">
                    <label htmlFor="form-company" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <span>Company Name</span>
                    </label>
                    <input
                      id="form-company"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                {/* Company Size Dropdown */}
                <div className="space-y-1">
                  <label htmlFor="form-company-size" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex justify-between">
                    <span>Company Size *</span>
                    {errors.companySize && <span className="text-rose-400 font-semibold lowercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.companySize}</span>}
                  </label>
                  <select
                    id="form-company-size"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full bg-slate-950 border text-slate-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50 ${errors.companySize ? 'border-rose-500/60' : 'border-slate-800'}`}
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
                  <label htmlFor="form-bottleneck" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex justify-between">
                    <span>Primary Operational Bottleneck *</span>
                    {errors.bottleneck && <span className="text-rose-400 font-semibold lowercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.bottleneck}</span>}
                  </label>
                  <select
                    id="form-bottleneck"
                    name="bottleneck"
                    value={formData.bottleneck}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`w-full bg-slate-950 border text-slate-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50 ${errors.bottleneck ? 'border-rose-500/60' : 'border-slate-800'}`}
                  >
                    <option value="">Select primary bottleneck...</option>
                    <option value="Hiring Speed">Hiring Speed & Talent Sourcing</option>
                    <option value="Retention">Retention & Employee Turnovers</option>
                    <option value="Performance Management">Performance Management & Alignment</option>
                    <option value="Compliance">Compliance & State Audits</option>
                  </select>
                </div>

                {/* Message / Notes */}
                <div className="space-y-1">
                  <label htmlFor="form-message" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span>Message / Additional Notes</span>
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-primary transition-colors disabled:opacity-50 resize-none"
                    placeholder="Tell us about your organization's specific requirements or goals..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md shadow-primary/20 mt-2 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Initiate Audit & Health Check</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
