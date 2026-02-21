"use strict";

import React from "react";
import projects from "@/data/projects.json";
import { ArrowLeft, CheckCircle2, Cpu, Goal, AlertCircle } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/GlassCard";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <div className="py-40 text-center">Proyek tidak ditemukan</div>;

  return (
    <div className="pt-40 pb-20 px-6 max-w-5xl mx-auto">
      <Link href="/projects" className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group relative z-50">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Semua Proyek
      </Link>

      <div className="mb-20">
        <span className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4 block">{project.category}</span>
        <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">{project.title}</h1>
        <p className="text-gray-400 text-xl leading-relaxed">{project.shortDescription}</p>
      </div>

      <div className="rounded-3xl overflow-hidden mb-20 border border-glass-border">
        <img src={project.thumbnail} alt={project.title} className="w-full object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div className="md:col-span-2 space-y-16">
          <section>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <AlertCircle className="text-primary" /> Masalah
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">{project.problem}</p>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <Goal className="text-primary" /> Tujuan & Objektif
            </h2>
            <ul className="space-y-4">
              {project.goals.map((goal, i) => (
                <li key={i} className="flex gap-4 text-gray-400 items-start">
                  <CheckCircle2 className="text-primary mt-1 shrink-0" size={18} />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <CheckCircle2 className="text-primary" /> Dampak & Hasil
            </h2>
            <p className="text-gray-300 text-lg p-8 glass rounded-3xl border-l-4 border-l-primary italic">
              "{project.impact}"
            </p>
          </section>
        </div>

        <aside className="space-y-8">
          <GlassCard className="p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Cpu className="text-primary" size={20} /> Teknologi
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>
        </aside>
      </div>
    </div>
  );
}
