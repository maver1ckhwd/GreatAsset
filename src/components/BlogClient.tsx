"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { BlogPost } from "@/utils/markdown";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

interface BlogClientProps {
  posts: BlogPost[];
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync with document element dark mode state on mount
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
    <div className="min-h-screen font-sans antialiased bg-background text-foreground transition-colors duration-300 flex flex-col justify-between">
      <div>
        {/* Global Header */}
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

        {/* Blog Banner */}
        <section className="relative overflow-hidden py-12 md:py-16 bg-radial-gradient">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(74,144,226,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(93,156,236,0.07),transparent_50%)]" />
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
            <span className="text-xs text-primary tracking-widest font-bold uppercase">RESOURCES & INSIGHTS</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-neutral-core dark:text-white tracking-tight">
              The GreatAsset Intelligence Blog
            </h1>
            <p className="text-muted text-sm sm:text-base max-w-xl mx-auto">
              Strategic people operations methodologies, compliance scorecards, and hiring intelligence frameworks.
            </p>
          </div>
        </section>

        {/* 3-Column Grid */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {posts.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-3xl">
              <p className="text-muted text-sm">No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article 
                  key={post.slug}
                  className="bg-card border border-border hover:border-primary/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Category & Date */}
                    <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-muted uppercase">
                      <span className="inline-flex items-center gap-1 text-primary">
                        <Tag className="w-3.5 h-3.5" />
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display font-bold text-xl text-neutral-core dark:text-white group-hover:text-primary transition-colors leading-tight">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Summary */}
                    <p className="text-muted text-xs leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border mt-6">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-primary group-hover:text-neutral-core dark:group-hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      Read Full Article
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12 text-muted text-xs mt-12">
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
