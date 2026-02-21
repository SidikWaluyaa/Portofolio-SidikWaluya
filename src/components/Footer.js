"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Instagram, Dribbble, ArrowUpRight } from "lucide-react";
import profile from "@/data/profile.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="text-3xl font-bold text-gradient mb-6 block">
              SIDIK.
            </Link>
            <p className="text-gray-400 text-lg max-w-sm mb-8">
              {profile.tagline} Building premium digital products that bridge the gap between design and development.
            </p>
            <div className="flex space-x-5">
              <a href={profile.socials.github} target="_blank" className="p-3 rounded-xl glass hover:border-primary transition-all text-gray-400 hover:text-white">
                <Github size={20} />
              </a>
              <a href={profile.socials.linkedin} target="_blank" className="p-3 rounded-xl glass hover:border-primary transition-all text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href={profile.socials.instagram} target="_blank" className="p-3 rounded-xl glass hover:border-primary transition-all text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Tautan Cepat</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/" className="hover:text-primary transition-colors">Beranda</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">Tentang</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Proyek</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Layanan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Kontak</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              <li>
                <a href={`mailto:${profile.contact.email}`} className="flex items-center gap-2 group hover:text-white transition-all">
                  {profile.contact.email} <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </li>
              <li>{profile.contact.location}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {currentYear} {profile.name}. Hak cipta dilindungi undang-undang.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
