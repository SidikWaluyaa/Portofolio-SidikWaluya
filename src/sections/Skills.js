"use client";

import React from "react";
import { motion } from "framer-motion";
import profile from "@/data/profile.json";
import GlassCard from "@/components/GlassCard";
import { Cpu, Terminal, Sparkles } from "lucide-react";

const categoryIcons = {
  Expertise: <Cpu size={20} className="text-blue-500" />,
  Tools: <Terminal size={20} className="text-violet-500" />,
  Learning: <Sparkles size={20} className="text-teal-500" />,
};

const categoryColors = {
  Expertise: "border-blue-500/20 bg-blue-500/5",
  Tools: "border-violet-500/20 bg-violet-500/5",
  Learning: "border-teal-500/20 bg-teal-500/5",
};

export default function Skills() {
  const { technical } = profile.skills;

  return (
    <section className="section-container relative">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="text-center mb-24">
        <div className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-6">Stack & Kualitas</div>
        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">
          Teknologi <span className="text-gradient">Unggulan</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Menggunakan kombinasi teknologi modern untuk menghadirkan skalabilitas dan efisiensi tingkat tinggi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(technical).map(([category, skills], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.2 }}
            viewport={{ once: true }}
          >
            <GlassCard className={`h-full p-8 border-t-2 ${categoryColors[category]}`}>
              <div className="flex items-center gap-4 mb-8">
                {categoryIcons[category]}
                <h3 className="text-xl font-bold tracking-tight">{category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-medium hover:border-white/30 hover:bg-white/10 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
