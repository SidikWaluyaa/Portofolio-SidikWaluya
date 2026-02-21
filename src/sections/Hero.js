"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import profile from "@/data/profile.json";

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 md:pt-48 pb-20 md:pb-32 px-6 overflow-hidden">
      {/* Immersive Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/5 rounded-full blur-[160px] pointer-events-none" />
 
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
          }
        }}
        className="text-center z-10 max-w-4xl"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 }
          }}
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 md:mb-12 text-[9px] font-bold tracking-[0.5em] uppercase bg-white/5 border border-white/10 rounded-full backdrop-blur-2xl text-blue-400"
        >
          <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
          {profile.role}
        </motion.div>
        
        <motion.h1 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.5rem,8vw,5.5rem)] font-black mb-8 md:mb-12 tracking-tight leading-[1.1] md:leading-[1] text-white"
        >
          Membangun Pengalaman <span className="text-gradient">Digital</span> yang <br className="hidden md:block" /> Premium.
        </motion.h1>
        
        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed font-light"
        >
          Junior Full Stack Developer yang berfokus pada pembuatan aplikasi web <span className="text-white font-medium">berkinerja tinggi</span> dengan desain yang elegan.
        </motion.p>

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <Link
            href="/projects"
            className="group px-12 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:bg-white/90 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Lihat Proyek
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="px-12 py-5 rounded-2xl border border-white/10 bg-white/5 text-white font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Hubungi Saya
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-4 text-[9px] font-bold tracking-[0.3em] uppercase text-gray-500"
      >
        <span>Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
      </motion.div>
    </section>
  );
}
