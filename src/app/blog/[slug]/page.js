"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Calendar, Clock, Share2 } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/GlassCard";
import Navbar from "@/components/Navbar";

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch('/api/admin/articles');
        const data = await res.json();
        const found = data.find(a => a.slug === slug);
        setArticle(found);
      } catch (error) {
        console.error("Gagal memuat artikel");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-primary font-black uppercase tracking-widest">Loading Insight...</div>;
  if (!article) return <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
    <h1 className="text-4xl font-black uppercase tracking-tighter italic">Article Not Found</h1>
    <Link href="/blog" className="text-[10px] font-black text-primary uppercase tracking-widest border border-primary/20 px-6 py-3 rounded-xl hover:bg-primary/10 transition-all">Back to Blog</Link>
  </div>;

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Navbar />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <Link href="/blog" className="group flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest mb-12 hover:text-white transition-all">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Insights
        </Link>

        <header className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="bg-primary/10 text-primary text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest border border-primary/20">
              {article.category}
            </div>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] italic mb-10"
          >
            {article.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-8 py-8 border-y border-white/5"
          >
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary italic font-black">S</div>
               <div>
                  <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Author</p>
                  <p className="text-xs font-bold uppercase tracking-tighter">Sidik Waluya</p>
               </div>
             </div>
             <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
             <div>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Published</p>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-tighter">
                  <Calendar size={12} className="text-primary" /> {article.date}
                </div>
             </div>
             <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
             <div>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Reading time</p>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-tighter">
                  <Clock size={12} className="text-primary" /> 5 Min Read
                </div>
             </div>
          </motion.div>
        </header>

        {article.thumbnail && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-16 aspect-video rounded-[40px] overflow-hidden border border-white/10 grayscale-0 shadow-2xl shadow-primary/5"
          >
            <Image 
              src={article.thumbnail} 
              alt={article.title} 
              width={1200}
              height={675}
              priority
              className="w-full h-full object-cover" 
            />
          </motion.div>
        )}

        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-invert prose-primary max-w-none"
        >
          <div className="text-gray-400 text-lg leading-relaxed font-medium font-serif italic mb-12 border-l-4 border-primary pl-8 py-2">
            &quot;{article.excerpt}&quot;
          </div>
          
          <div className="article-content space-y-8 text-gray-300 leading-loose text-lg font-medium tracking-tight">
            {article.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </motion.article>

        <footer className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Share Insight</span>
             <button className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all"><Share2 size={16}/></button>
          </div>
          <Link href="/blog" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Explore More Articles</Link>
        </footer>
      </div>
    </main>
  );
}
