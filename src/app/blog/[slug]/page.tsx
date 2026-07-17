import React from "react";
import PostClient from "@/components/PostClient";
import { getPostBySlug, parseMarkdownToHtml } from "@/utils/markdown";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate dynamic metadata for B2B SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }
  return {
    title: `${post.title} | GreatAsset Insights`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = parseMarkdownToHtml(post.content);

  return <PostClient post={post} htmlContent={htmlContent} />;
}
