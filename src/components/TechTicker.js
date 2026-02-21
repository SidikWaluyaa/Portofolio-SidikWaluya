"use client";

import { motion } from "framer-motion";

const tech = [
  "React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", 
  "System Architecture", "UI/UX Design", "Product Strategy", "High Performance"
];

export default function TechTicker() {
  return (
    <div className="w-full py-20 overflow-hidden relative z-20">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-white/[0.02] to-background pointer-events-none" />
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-20 pr-20"
        >
          {[...tech, ...tech].map((item, i) => (
            <div
              key={i}
              className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-500 hover:text-white transition-colors cursor-default"
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
