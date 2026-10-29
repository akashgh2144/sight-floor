"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { MOCK_FEED } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Terminal, ImageIcon } from "lucide-react";

export function TerminalFeed() {
  return (
    <GlassCard className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-neon-cyan" />
          <div>
            <h3 className="text-lg font-semibold text-white tracking-tight">
              Live Terminal
            </h3>
            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500">
              System Event Log
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs font-mono text-neon-green">LIVE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
        {MOCK_FEED.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-glass-highlight transition-colors group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="font-mono text-xs text-gray-500 shrink-0 pt-1">
                [{item.timestamp}]
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-neon-cyan">
                    {item.source}
                  </span>
                  <span className="text-gray-600 hidden sm:inline">|</span>
                  <span className="text-sm text-gray-200">
                    {item.event}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      item.aiStatus === "MATCH CONFIRMED" ? "success" :
                      item.aiStatus === "ANOMALY DETECTED" ? "danger" :
                      "warning"
                    }
                  >
                    {item.aiStatus}
                  </Badge>

                  {item.image && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <ImageIcon className="w-3 h-3" />
                      <span>Image Payload</span>
                    </div>
                  )}
                </div>

                {item.image && (
                  <div className="mt-2 relative rounded-md overflow-hidden border border-glass-edge w-fit group-hover:border-glass-highlight transition-colors">
                    <img
                      src={item.image}
                      alt="Event payload"
                      className="h-24 w-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

