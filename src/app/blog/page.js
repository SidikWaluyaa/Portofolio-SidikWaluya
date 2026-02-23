import articles from "@/data/articles.json";
import BlogClient from "./BlogClient";

export default function BlogPage() {
  // In a static server component, we read the JSON directly at build time
  return <BlogClient articles={articles} />;
}
