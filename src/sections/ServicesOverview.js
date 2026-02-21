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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="h-full flex flex-col items-start text-left">
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 mb-8">
                  {iconMap[service.icon] || <Layout size={32} />}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-8 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="p-1 rounded-full bg-primary/20 text-primary">
                        <Check size={12} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
    </section>
  );
}
