import React from "react";
import BlogClient from "@/components/BlogClient";
import { getAllPosts } from "@/utils/markdown";

export const metadata = {
  title: "Insights & Methodologies | GreatAsset Blog",
  description: "Strategic talent acquisition, workforce architecture and SMART systems implementation guidelines.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return <BlogClient posts={posts} />;
}
