"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function GlassCard({ children, className, hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "glass rounded-3xl p-8 transition-shadow hover:shadow-2xl hover:shadow-primary/5",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
