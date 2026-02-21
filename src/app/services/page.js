"use client";

import React from "react";
import { motion } from "framer-motion";
import services from "@/data/services.json";
import GlassCard from "@/components/GlassCard";
import { Layout, Code, Figma, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const iconMap = {
  Layout: <Layout size={32} className="text-primary" />,
  Code: <Code size={32} className="text-primary" />,
  Figma: <Figma size={32} className="text-primary" />,
};

export default function Services() {
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
          Layanan <span className="text-gradient">Profesional</span>
        </motion.h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
          Mulai dari desain produk tahap awal hingga eksekusi teknis skala penuh.
        </p>
      </section>

      <section className="section-container pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
          {services.map((service) => (
            <GlassCard key={service.id} className="text-left group border-white/5 hover:border-primary/50 transition-all p-10">
              <div className="mb-10 p-5 rounded-3xl bg-white/5 w-fit group-hover:bg-primary z-20 transition-all duration-500">
                <div className="group-hover:text-white transition-colors">
                  {iconMap[service.icon]}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-10 leading-relaxed text-sm">{service.description}</p>
              <ul className="space-y-4 mb-10">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                    <Check size={14} className="text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="flex items-center gap-2 text-white font-black uppercase tracking-[0.2em] text-[10px] hover:text-primary transition-colors">
                Mulai Sekarang <ArrowRight size={14} />
              </Link>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-16 bg-gradient-to-br from-primary/10 via-transparent to-transparent border-primary/10 text-center overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">Punya proyek khusus dalam pikiran Anda?</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau peluang untuk menjadi bagian dari visi Anda.
          </p>
          <Link href="/contact" className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-white/90 transition-all inline-block shadow-2xl shadow-white/5">
            Mari Bekerja Sama
          </Link>
        </GlassCard>
      </section>
    </div>
  );
}
