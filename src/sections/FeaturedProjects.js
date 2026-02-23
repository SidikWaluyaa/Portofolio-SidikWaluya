"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import projects from "@/data/projects.json";
import GlassCard from "@/components/GlassCard";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 2);

  return (
    <section className="section-container relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-32 gap-6 md:gap-10">
        <div className="max-w-xl">
          <div className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px] mb-4 md:mb-6">Karya Terbaru</div>
          <h2 className="text-[clamp(2rem,6vw,3.75rem)] font-black mb-6 md:mb-8 tracking-tight leading-tight">
            Proyek <span className="text-gradient">Unggulan</span>
          </h2>
          <p className="text-gray-400 text-base md:text-xl leading-relaxed">
            Pilihan proyek berdampak tinggi yang menunjukkan presisi teknis dan desain yang berpusat pada pengguna.
          </p>
        </div>
        <Link href="/projects" className="flex items-center gap-4 text-white font-bold uppercase tracking-widest text-[10px] md:text-[11px] group border-b border-primary/30 pb-2 hover:border-primary transition-all">
          Lihat Semua <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20"
      >
        {featured.map((project, index) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  damping: 25,
                  stiffness: 100
                }
              }
            }}
          >
            <Link href={`/projects/${project.slug}`} data-cursor="VIEW">
              <GlassCard className="group p-0 overflow-hidden border-0 bg-transparent hover:bg-white/5 transition-colors duration-500">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[40px]">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute top-8 right-8 z-10 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                
                <div className="py-8 px-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
                      {project.category}
                    </span>
                    <div className="flex-1 h-[1px] bg-white/10" />
                  </div>
                  
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {project.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
