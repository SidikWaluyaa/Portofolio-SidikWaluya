"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import projects from "@/data/projects.json";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

const categories = ["Semua", "Web Development", "UI UX Design"];

export default function Projects() {
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === "Semua" || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <section className="page-header section-container text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-black mb-8 tracking-tight"
        >
          Semua <span className="text-gradient">Proyek</span>
        </motion.h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
          Eksplorasi mendalam atas karya saya, mulai dari sistem manajemen hingga platform web modern.
        </p>
      </section>

      <section className="section-container pt-0">
        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 px-4">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 glass rounded-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === cat ? "bg-primary text-white shadow-lg" : "text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Cari proyek..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:border-primary transition-all outline-none"
            />
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <GlassCard className="group p-0 overflow-hidden h-full border-0">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-8">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2">{project.shortDescription}</p>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 italic">No projects found for your selection.</p>
          </div>
        )}
      </section>
    </div>
  );
}
