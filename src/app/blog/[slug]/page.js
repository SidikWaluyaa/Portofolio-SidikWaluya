import articles from "@/data/articles.json";
import BlogDetailClient from "./BlogDetailClient";
import Link from "next/link";

export const dynamicParams = false;

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 text-white">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic">Article Not Found</h1>
        <Link href="/blog" className="text-[10px] font-black text-primary uppercase tracking-widest border border-primary/20 px-6 py-3 rounded-xl hover:bg-primary/10 transition-all">Back to Blog</Link>
      </div>
    );
  }

  return <BlogDetailClient article={article} />;
}
