"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OperationalLandscape from "@/components/OperationalLandscape";
import ServicesGrid from "@/components/ServicesGrid";
import ExecutionFramework from "@/components/ExecutionFramework";
import ClientShowcase from "@/components/ClientShowcase";
import EngagementJourney from "@/components/EngagementJourney";
import LeadForm from "@/components/LeadForm";
import Logo from "@/components/Logo";

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

  return (
    <div className="min-h-screen font-sans antialiased bg-background text-foreground transition-colors duration-300">
      {/* Global Header */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <Hero />

      {/* 1. Client Operational Landscape */}
      <OperationalLandscape />

      {/* 2. Service Spectrum Grid */}
      <ServicesGrid />

      {/* 3. Service Capabilities & Execution Framework */}
      <ExecutionFramework />

      {/* 4. Client Logo Showcase */}
      <ClientShowcase />

      {/* 5. Engagement Journey & Onboarding */}
      <EngagementJourney />

      {/* 6. Workforce Health Check Form Container (Organizational Diagnostic) */}
      <LeadForm />

      {/* Footer */}
      <footer id="resources" className="bg-background border-t border-border py-12 text-muted text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Disclosures</a>
            <a href="#" className="hover:text-primary">Regulatory Filings</a>
          </div>

          <p>© {new Date().getFullYear()} GreatAsset Partners LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
