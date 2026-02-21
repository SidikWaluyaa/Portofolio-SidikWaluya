"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code, Layout, User, Mail, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Beranda", href: "/", icon: <Layout className="w-4 h-4" /> },
  { name: "Tentang", href: "/about", icon: <User className="w-4 h-4" /> },
  { name: "Proyek", href: "/projects", icon: <Folder className="w-4 h-4" /> },
  { name: "Layanan", href: "/services", icon: <Code className="w-4 h-4" /> },
  { name: "Kontak", href: "/contact", icon: <Mail className="w-4 h-4" /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6",
        scrolled ? "py-4" : "py-8"
      )}
    >
      <div className={cn(
        "max-w-5xl mx-auto flex items-center justify-between px-8 py-3 rounded-2xl transition-all duration-1000",
        scrolled ? "glass bg-black/40 shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/10" : "bg-transparent border-transparent"
      )}>
        <Link href="/" className="text-xl font-black tracking-tighter text-white hover:text-blue-400 transition-colors">
          SIDIK<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative group",
                  pathname === link.href ? "text-white" : "text-gray-500"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1.5 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full",
                  pathname === link.href ? "w-full" : ""
                )} />
              </Link>
            ))}
          </div>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all active:scale-95"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 glass rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-6 right-6 mt-2 glass bg-black/90 rounded-3xl overflow-hidden z-40"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-black uppercase tracking-tighter transition-colors flex items-center gap-4",
                    pathname === link.href ? "text-primary" : "text-gray-400"
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-4 rounded-2xl bg-primary text-white text-center font-black uppercase tracking-widest"
              >
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
