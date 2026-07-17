"use client";

import React, { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import Link from "next/link";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("health-check-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glassmorphism border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left-aligned branding logo */}
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>

        {/* Central Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-semibold text-foreground hover:text-supporting transition-colors">
            Services
          </a>
          <a href="#industries" className="text-sm font-semibold text-foreground hover:text-supporting transition-colors">
            Industries
          </a>
          <a href="#resources" className="text-sm font-semibold text-foreground hover:text-supporting transition-colors">
            Resources
          </a>
        </nav>

        {/* Right Buttons / Bold Accent Coral CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl border border-border hover:bg-muted-light transition-colors text-muted hover:text-foreground"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <a 
            href="#health-check-form" 
            onClick={handleScrollToForm}
            className="glow-btn bg-accent text-white hover:opacity-90 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-accent/20 transition-all"
          >
            Book an HR Audit
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-lg border border-border text-muted"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-border text-foreground hover:bg-muted-light"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden pt-24 px-6 flex flex-col gap-6 animate-fade-in">
          <a 
            href="#services" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-semibold border-b border-border pb-3"
          >
            Services
          </a>
          <a 
            href="#industries" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-semibold border-b border-border pb-3"
          >
            Industries
          </a>
          <a 
            href="#resources" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-semibold border-b border-border pb-3"
          >
            Resources
          </a>
          <a 
            href="#health-check-form"
            onClick={handleScrollToForm}
            className="bg-accent text-white w-full py-3.5 rounded-xl font-bold text-center shadow-lg shadow-accent/15 mt-4"
          >
            Book an HR Audit
          </a>
        </div>
      )}
    </header>
  );
}
