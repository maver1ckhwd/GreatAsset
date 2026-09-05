import React from "react";
import Header from "@/components/Header";
import { BlogPost } from "@/utils/markdown";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

interface PostClientProps {
  post: BlogPost;
  htmlContent: string;
}

export default function PostClient({ post, htmlContent }: PostClientProps) {
  return (
    <div className="min-h-screen font-sans antialiased bg-background text-foreground transition-colors duration-300 flex flex-col justify-between">
      <div>
        {/* Global Header */}
        <Header />

        {/* Post Container */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-neutral-core transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>
          </div>

          <article className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
            
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs font-bold tracking-wider text-muted uppercase">
                <span className="inline-flex items-center gap-1 text-primary">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
              </div>
              
              <h1 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-neutral-core leading-tight">
                {post.title}
              </h1>

              <p className="text-muted text-sm md:text-base leading-relaxed border-l-4 border-primary pl-4 italic">
                {post.summary}
              </p>
            </div>

            {/* Rendered HTML content */}
            <div 
              className="prose prose-slate max-w-none pt-4 border-t border-border"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

          </article>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12 text-muted text-xs mt-12">
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
