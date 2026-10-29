"use client";

import { motion } from "framer-motion";

export function Ticker() {
  return (
    <div className="overflow-hidden whitespace-nowrap flex-1 relative">
        {/* Gradient masks for smooth fade in/out */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-void to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-void to-transparent z-10" />

      <motion.div
        className="inline-block"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      >
        <span className="text-sm font-mono text-gray-400">
          Total Output: <span className="text-white">12,400 pcs</span> <span className="text-neon-green">(▲ 12%)</span>
          <span className="mx-8 text-gray-600">|</span>
          Critical Delay: <span className="text-neon-red">Style-9901</span>
          <span className="mx-8 text-gray-600">|</span>
          Efficiency: <span className="text-neon-cyan">82%</span>
          <span className="mx-8 text-gray-600">|</span>
          Active Lines: <span className="text-white">18/20</span>
          <span className="mx-8 text-gray-600">|</span>
          Power Status: <span className="text-neon-green">Stable</span>
        </span>
      </motion.div>
    </div>
  );
}

