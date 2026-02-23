"use client";

import React from "react";
import { motion } from "framer-motion";
import services from "@/data/services.json";
import GlassCard from "@/components/GlassCard";
import { Layout, Code, Figma, Check } from "lucide-react";

const iconMap = {
  Layout: <Layout size={32} className="text-primary" />,
  Code: <Code size={32} className="text-primary" />,
  Figma: <Figma size={32} className="text-primary" />,
};

export default function ServicesOverview() {
  return (
    <section className="section-container relative">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="text-center mb-32">
        <div className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-6">Keahlian</div>
        <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight">
          Layanan <span className="text-gradient">Unggulan</span>
        </h2>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
          Menghadirkan solusi digital ujung-ke-ujung dengan fokus pada skalabilitas, performa, dan pengalaman pengguna kelas dunia.
        </p>
      </div>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12"
      >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    damping: 20
                  }
                }
              }}
            >
              <GlassCard 
                className="h-full flex flex-col items-start text-left group hover:border-primary/30 transition-all duration-500"
                data-cursor="SERVICE"
              >
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 mb-8 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  {iconMap[service.icon] || <Layout size={32} />}
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-4 w-full">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      <div className="p-1 rounded-full bg-primary/20 text-primary">
                        <Check size={10} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
    </section>
  );
}
