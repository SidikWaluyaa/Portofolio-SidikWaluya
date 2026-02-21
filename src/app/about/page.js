"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Code, Award, MapPin, Mail, Phone } from "lucide-react";
import profile from "@/data/profile.json";
import GlassCard from "@/components/GlassCard";

export default function About() {
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
          Tentang <span className="text-gradient">Sidik Waluya</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-light"
        >
          {profile.bio}
        </motion.p>
      </section>

      <section className="section-container border-t border-white/5 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          {/* Main Content (Experience & Education) */}
          <div className="lg:col-span-2 space-y-24">
            
            {/* Experience */}
            <div>
              <h2 className="text-3xl font-black mb-12 flex items-center gap-4">
                <Briefcase className="text-primary" /> Pengalaman Profesional
              </h2>
              <div className="space-y-12 border-l border-white/10 ml-4 pl-10">
                {profile.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute -left-[49px] top-0 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                    <div>
                      <span className="text-sm font-bold text-primary mb-3 block tracking-widest uppercase">{exp.period}</span>
                      <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                      <p className="text-gray-400 font-medium mb-6">{exp.company} • {exp.location || "Indonesia"}</p>
                      <ul className="space-y-3">
                        {exp.description.split(';').map((item, i) => (
                          <li key={i} className="text-gray-500 leading-relaxed flex items-start gap-3">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                            {item.trim()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-3xl font-black mb-12 flex items-center gap-4">
                <GraduationCap className="text-primary" /> Riwayat Pendidikan
              </h2>
              <div className="space-y-12 border-l border-white/10 ml-4 pl-10">
                {profile.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute -left-[49px] top-0 w-4 h-4 bg-primary/40 rounded-full border-4 border-background" />
                    <div>
                      <span className="text-sm font-bold text-gray-500 mb-3 block tracking-widest uppercase">{edu.period}</span>
                      <h3 className="text-xl font-bold mb-1">{edu.school}</h3>
                      <p className="text-gray-400 font-medium mb-2">{edu.degree}</p>
                      <p className="text-primary text-sm font-black">{edu.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Skills, Certs, Info) */}
          <div className="space-y-16">
            
            {/* Tech Skills */}
            <div>
              <h2 className="text-xl font-black mb-8 flex items-center gap-4 uppercase tracking-widest text-primary">
                Kemampuan Teknis
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.technical.map((skill) => (
                  <span key={skill} className="px-4 py-2 glass rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:border-primary/50 transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-xl font-black mb-8 flex items-center gap-4 uppercase tracking-widest text-primary">
                Sertifikasi
              </h2>
              <div className="space-y-4">
                {profile.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-4 group">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:border-primary/30 transition-all">
                      <Award size={16} className="text-primary" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info Card */}
            <GlassCard className="p-8 border-primary/10">
              <h3 className="text-lg font-bold mb-8">Informasi Kontak</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <Mail size={16} className="text-primary" /> {profile.contact.email}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <Phone size={16} className="text-primary" /> {profile.contact.phone}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <MapPin size={16} className="text-primary" /> {profile.contact.location}
                </div>
              </div>
              <button className="flex items-center justify-center gap-3 w-full py-4 mt-10 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-white/90 transition-all shadow-xl">
                Unduh CV <Download size={14} />
              </button>
            </GlassCard>

          </div>
        </div>
      </section>
    </div>
  );
}
