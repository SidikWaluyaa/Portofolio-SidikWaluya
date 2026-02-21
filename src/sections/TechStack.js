"use client";

import React from "react";
import { motion } from "framer-motion";
import profile from "@/data/profile.json";

export default function TechStack() {
  return (
    <section className="py-24 px-6 bg-white/[0.02] border-y border-glass-border overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">
          Powered By Modern Technologies
        </h3>
      </div>
      
      <div className="flex overflow-hidden group">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap gap-12 items-center"
        >
          {[...profile.skills, ...profile.skills, ...profile.skills].map((skill, i) => (
            <div
              key={i}
              className="text-3xl md:text-5xl font-black text-gray-700 hover:text-primary transition-colors cursor-default"
            >
              {skill}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
