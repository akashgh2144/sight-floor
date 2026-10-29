"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const RISKS = [
  { id: 1, text: "Style #101 | Delay: 3 Days | Last Msg: 'Machine Broken' | Action: [Call Owner]" },
  { id: 2, text: "Style #205 | Delay: 1 Day | Last Msg: 'Fabric Shortage' | Action: [Check Inventory]" },
  { id: 3, text: "Style #309 | Quality Fail | Last Msg: 'Shade Variation' | Action: [Request Sample]" },
  { id: 4, text: "Style #412 | Shipment Risk | Last Msg: 'Strike in Port' | Action: [Re-route]" },
];

export function RiskTicker() {
  return (
    <GlassCard className="flex items-center overflow-hidden border-neon-red/30 bg-neon-red/5 h-12">
      <div className="bg-neon-red/20 px-4 h-full flex items-center gap-2 border-r border-neon-red/30 z-10 shrink-0">
        <AlertTriangle className="w-5 h-5 text-neon-red animate-pulse" />
        <span className="font-bold text-neon-red whitespace-nowrap text-sm">CRITICAL ALERTS</span>
      </div>

      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <motion.div
            className="flex gap-12 whitespace-nowrap absolute pl-4"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            style={{ width: "max-content" }}
        >
            {[...RISKS, ...RISKS, ...RISKS].map((risk, i) => (
                <span key={i} className="text-sm text-white font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-neon-red rounded-full"></span>
                    {risk.text}
                </span>
            ))}
        </motion.div>
      </div>
    </GlassCard>
  );
}

