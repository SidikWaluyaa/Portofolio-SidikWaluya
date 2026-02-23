"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, ChevronLeft, FileText } from "lucide-react";
import Image from "next/image";
import GlassCard from "@/components/GlassCard";
import Navbar from "@/components/Navbar";

export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a static export, we'll read the JSON directly or via a fetch that works at build time
    // For local dev, we fetch our API
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/admin/articles');
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error("Gagal memuat artikel");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] mb-4"
          >
            <div className="w-8 h-[1px] bg-primary"></div>
            Thought Leadership & Insights
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none"
          >
            THE <span className="text-transparent border-t-text border-white/20" style={{WebkitTextStroke: '1px white'}}>BLOG</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-xl mt-6 font-medium leading-relaxed"
          >
            Berbagi pemikiran tentang teknologi, desain, dan arsitektur sistem. 
            Eksplorasi mendalam untuk membantu Anda membangun produk digital yang lebih baik.
          </motion.p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-white/5 animate-pulse rounded-3xl border border-white/5"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {articles.length > 0 ? articles.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <Link href={`/blog/${article.slug}`}>
                  <GlassCard className="group h-full flex flex-col overflow-hidden border-white/5 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-48 w-full overflow-hidden bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-700">
                      {article.thumbnail ? (
                        <Image 
                          src={article.thumbnail} 
                          alt={article.title} 
                          width={800}
                          height={450}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20">
                           <FileText size={48} />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-primary text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest">
                        {article.category}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">
                        <div className="flex items-center gap-1.5"><Calendar size={12} /> {article.date}</div>
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-6">
                        {article.excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
                        Read Article <ArrowRight size={14} />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            )) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 font-bold uppercase tracking-widest italic text-sm">Belum ada artikel yang dipublikasikan.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Footer minimal */}
      <footer className="py-10 border-t border-white/5 text-center">
        <Link href="/" className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2">
          <ChevronLeft size={14} /> Back to Portfolio
        </Link>
      </footer>
    </main>
  );
}
