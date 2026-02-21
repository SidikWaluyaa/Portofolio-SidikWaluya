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
      <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
        <div className="max-w-xl">
          <div className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-6">Karya Terbaru</div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
            Proyek <span className="text-gradient">Unggulan</span>
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed">
            Pilihan proyek berdampak tinggi yang menunjukkan presisi teknis dan desain yang berpusat pada pengguna.
          </p>
        </div>
        <Link href="/projects" className="flex items-center gap-4 text-white font-bold uppercase tracking-widest text-[11px] group border-b border-primary/30 pb-2 hover:border-primary transition-all">
          Lihat Semua <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {featured.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link href={`/projects/${project.slug}`}>
              <GlassCard className="group p-0 overflow-hidden border-0">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-6 py-3 bg-white text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      Lihat Detail
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
