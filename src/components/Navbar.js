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
        <Link href="/" className="flex items-center gap-3 text-xl font-black tracking-tighter text-white hover:text-blue-400 transition-colors group">
          <img src="/Portofolio-SidikWaluya/logo.svg" alt="Sidik Logo" className="w-8 h-8 group-hover:rotate-12 transition-transform duration-500" />
          <span>SIDIK<span className="text-blue-500">.</span></span>
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] md:hidden flex flex-col items-center justify-center p-8"
          >
            <button
              className="absolute top-8 right-8 text-white p-3 glass rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center space-y-8 w-full max-w-sm">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-4xl font-black uppercase tracking-tighter transition-all hover:scale-110 flex items-center gap-4",
                      pathname === link.href ? "text-primary scale-110" : "text-gray-500"
                    )}
                  >
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      pathname === link.href ? "bg-primary" : "bg-transparent"
                    )} />
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="w-full pt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-6 rounded-2xl bg-white text-black text-center font-black uppercase tracking-[0.2em] text-sm hover:bg-white/90 active:scale-95 transition-all"
                >
                  Hire Me
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
