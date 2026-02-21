"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Download, 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  Award, 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink,
  Zap,
  Star,
  Globe
} from "lucide-react";
import profile from "@/data/profile.json";
import GlassCard from "@/components/GlassCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <div className="relative pt-32 pb-32">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* 1. PROFILE PHOTO CARD (Spans 4 cols on desktop, skyscraper) */}
          <motion.div variants={itemVariants} className="md:col-span-4 md:row-span-2">
            <GlassCard className="h-[400px] md:h-full group relative overflow-hidden p-0 border-primary/10 cursor-pointer touch-none">
              <div className="absolute inset-0 grayscale-[100%] group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-700 ease-in-out">
                <img 
                  src="/Portofolio-SidikWaluya/profile-sidik.jpg" 
                  alt="Sidik Waluya"
                  className="w-full h-full object-cover transform group-hover:scale-110 group-active:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 md:opacity-60 group-hover:opacity-80 group-active:opacity-80 transition-opacity" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[9px] font-black tracking-widest uppercase text-white mb-2 text-glow">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Available for Hire
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Full Stack Designer</h3>
              </div>
            </GlassCard>
          </motion.div>

          {/* 2. HERO BIO CARD (Spans 8 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-8">
            <GlassCard className="h-full p-6 md:p-12 border-primary/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity hidden md:block">
                <Globe size={120} className="text-white" />
              </div>
              <div className="relative z-10">
                <div className="text-primary font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px] mb-4 md:mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Profil Profesional
                </div>
                <h1 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 tracking-tight">
                  Tentang <span className="text-gradient">Sidik Waluya</span>
                </h1>
                <p className="text-gray-400 text-base md:text-xl leading-relaxed font-light max-w-3xl">
                  {profile.bio}
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* 3. STATS CARD - PROJECTS (Spans 4 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <GlassCard className="h-full p-6 md:p-8 flex flex-col justify-center items-center text-center border-blue-500/20 bg-blue-500/5">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 md:mb-6 border border-blue-500/20">
                <Star className="text-blue-500" size={24} />
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2 text-white">4+</div>
              <div className="text-gray-400 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Proyek Selesai</div>
            </GlassCard>
          </motion.div>

          {/* 4. EXPERIENCE CARD (Spans 7 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-7">
            <GlassCard className="h-full p-6 md:p-10">
              <h2 className="text-xl md:text-2xl font-black mb-10 flex items-center gap-4">
                <Briefcase className="text-primary" size={24} /> Pengalaman
              </h2>
              <div className="space-y-10 md:space-y-12">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="relative pl-8 border-l border-white/10">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full border-4 border-[#0a0a0a]" />
                    <span className="text-[9px] md:text-[10px] font-black text-primary/60 uppercase tracking-widest mb-2 block">{exp.period}</span>
                    <h3 className="text-lg md:text-xl font-bold mb-1">{exp.role}</h3>
                    <p className="text-gray-500 text-xs md:text-sm mb-4">{exp.company}</p>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                      {exp.description.replace(/;/g, '\n')}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* 4. PERFORMANCE STATS (Spans 5 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-5 space-y-6">
            <GlassCard className="p-8 border-teal-500/20 bg-teal-500/5">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Zap className="text-teal-400" size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">Site Performance</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-[10px] font-bold border border-teal-500/20">100/100</div>
              </div>
              <div className="space-y-4">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-teal-500 to-blue-500" 
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                  <span>SEO</span>
                  <span>ACCESSIBILITY</span>
                  <span>BEST PRACTICES</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-violet-500/20 bg-violet-500/5">
              <h2 className="text-sm font-black mb-6 uppercase tracking-widest text-violet-400 flex items-center gap-3">
                <Cpu size={18} /> Core Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.technical.Expertise.map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold text-gray-300 uppercase tracking-wider">
                    {skill}
                  </span>
                ))}
              </div>
            </GlassCard>
            
            <GlassCard className="p-8 border-orange-500/20 bg-orange-500/5">
              <h2 className="text-sm font-black mb-6 uppercase tracking-widest text-orange-400 flex items-center gap-3">
                <Star size={18} /> GitHub Activity
              </h2>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {Array.from({ length: 42 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-sm ${
                      [5, 12, 18, 25, 30, 38].includes(i) ? 'bg-orange-500' : 
                      [2, 10, 20, 33].includes(i) ? 'bg-orange-500/60' : 
                      'bg-white/5'
                    }`} 
                  />
                ))}
              </div>
              <p className="text-[9px] text-gray-500 mt-6 text-center font-bold uppercase tracking-widest">Kontribusi Aktif Tahun 2026</p>
            </GlassCard>
            
            <GlassCard className="p-8 border-primary/10">
               <h2 className="text-sm font-black mb-6 uppercase tracking-widest text-primary flex items-center gap-3">
                <GraduationCap size={18} /> Pendidikan
              </h2>
              <div className="space-y-6">
                {profile.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-bold text-white">{edu.school}</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{edu.degree} • {edu.period}</p>
                    <p className="text-primary text-[10px] font-black mt-1">{edu.details}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* 5. CERTIFICATIONS CARD (Spans 12 cols - Full width thin card) */}
          <motion.div variants={itemVariants} className="md:col-span-12">
            <GlassCard className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-white/5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <Award className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Sertifikasi Profesional</h3>
                  <p className="text-gray-500 text-xs">Pengakuan kompetensi dari berbagai institusi.</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-[10px] font-black uppercase tracking-[0.2em]">
                {profile.certifications.map(cert => (
                  <span key={cert} className="text-gray-400 hover:text-primary transition-colors cursor-default">{cert}</span>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* 6. CONTACT MINI CARD (Spans 12 cols) */}
          <motion.div variants={itemVariants} className="md:col-span-12">
            <GlassCard className="p-10 border-primary/10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-black mb-4">Mari Berkolaborasi.</h3>
                <p className="text-gray-400 max-w-md">Siap untuk portofolio atau proyek aplikasi web Anda selanjutnya?</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={`mailto:${profile.contact.email}`} className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                  <Mail size={16} className="text-primary" /> Email
                </a>
                <a href={profile.socials.linkedin} target="_blank" className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/10 border border-primary/50 text-xs font-bold uppercase tracking-widest hover:bg-primary/20 transition-all">
                  <ExternalLink size={16} className="text-primary" /> LinkedIn
                </a>
                <button className="flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-white/90 transition-all active:scale-95">
                  Unduh CV <Download size={16} />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
