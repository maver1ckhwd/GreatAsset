"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClientShowcase from "@/components/ClientShowcase";
import ServicesGrid from "@/components/ServicesGrid";
import LeadForm from "@/components/LeadForm";
import Logo from "@/components/Logo";
import {
  TrendingUp,
  Globe,
  ShieldCheck,
  Award,
  Zap,
  Sparkles
} from "lucide-react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode synchronization
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const industrySectors = [
    { name: "Executive Leadership", count: "42 Placements", icon: Award },
    { name: "Artificial Intelligence", count: "118 Placements", icon: Sparkles },
    { name: "Fintech & Blockchain", count: "85 Placements", icon: TrendingUp },
    { name: "Advanced Robotics", count: "39 Placements", icon: Zap },
    { name: "Life Sciences & Biotech", count: "72 Placements", icon: ShieldCheck },
    { name: "Global Enterprise SaaS", count: "154 Placements", icon: Globe }
  ];

  return (
    <div className="min-h-screen font-sans antialiased bg-background text-foreground transition-colors duration-300">
      {/* Global Header */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <Hero />

      {/* 1. Service Spectrum Grid */}
      <ServicesGrid />

      {/* 2. Industry / Sector Expertise */}
      <section id="industries" className="py-20 md:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs text-supporting tracking-widest font-bold uppercase">SECTORS WE SERVE</span>
              <h2 className="font-display font-extrabold text-3xl text-primary tracking-tight">
                Operating at the Frontier of Innovation
              </h2>
            </div>
            <p className="text-muted text-sm max-w-sm">
              We specialize in high-growth segments requiring technical precision, operational scaling, and executive leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industrySectors.map((sector, index) => {
              const IconComp = sector.icon;
              return (
                <div key={index} className="flex items-center gap-4 bg-card border border-border p-5 rounded-xl hover:bg-muted-light/35 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-supporting/10 text-supporting flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-primary">{sector.name}</h4>
                    <p className="text-xs text-muted mt-0.5">{sector.count}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Client Logo Showcase */}
      <ClientShowcase />

      {/* 4. Workforce Health Check Form Container */}
      <LeadForm />

      {/* Footer */}
      <footer id="resources" className="bg-background border-t border-border py-12 text-muted text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-supporting">Privacy Policy</a>
            <a href="#" className="hover:text-supporting">Terms of Service</a>
            <a href="#" className="hover:text-supporting">Disclosures</a>
            <a href="#" className="hover:text-supporting">Regulatory Filings</a>
          </div>

          <p>© {new Date().getFullYear()} GreatAsset Partners LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
