import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  content: string;
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const postsDirectory = path.join(process.cwd(), "content", "blog");
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    
    // Parse front matter block delimited by ---
    const match = fileContents.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return null;
    
    const frontMatterBlock = match[1];
    const content = match[2];
    
    const metadata: Record<string, string> = {};
    frontMatterBlock.split("\n").forEach((line) => {
      const parts = line.split(":");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(":").trim().replace(/^['"]|['"]$/g, "");
        metadata[key] = value;
      }
    });
    
    return {
      slug,
      title: metadata.title || "Untitled",
      summary: metadata.summary || "",
      date: metadata.date || "",
      category: metadata.category || "General",
      content: content.trim(),
    };
  } catch (e) {
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  try {
    const postsDirectory = path.join(process.cwd(), "content", "blog");
    if (!fs.existsSync(postsDirectory)) return [];
    
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        return getPostBySlug(slug);
      })
      .filter((post): post is BlogPost => post !== null)
      // Sort posts by date descending
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
    return posts;
  } catch (e) {
    return [];
  }
}

export function parseMarkdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Strip main title H1 if it matches the title header to avoid duplicates
  html = html.replace(/^#\s+.*$/m, "");

  // Headers (H3 first, then H2, then H1 to avoid sub-replacements)
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-6 mb-2 text-primary">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-extrabold mt-8 mb-4 border-b border-border pb-2 text-primary">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold mt-10 mb-6 text-primary">$1</h1>');
  
  // Bold Text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-primary">$1</strong>');
  
  // Bullet Points
  html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="ml-6 list-disc mb-1 text-sm">$1</li>');
  
  // Group consecutive list items into ul blocks
  // Find all blocks of contiguous <li> tags and wrap in <ul>
  html = html.replace(/(?:<li.*<\/li>\s*)+/g, (match) => {
    return `<ul class="my-4 space-y-1">${match}</ul>`;
  });
  
  // Paragraphs (split by double newline, wrapping normal text)
  const paragraphs = html.split(/\n\s*\n/);
  html = paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") || 
        trimmed.startsWith("<ul") || 
        trimmed.startsWith("<li")
      ) {
        return trimmed;
      }
      return `<p class="mb-4 leading-relaxed text-muted text-sm">${trimmed}</p>`;
    })
    .join("\n");
  
  return html;
}
