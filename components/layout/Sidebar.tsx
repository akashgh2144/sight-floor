"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  List,
  CheckSquare,
  Building2,
  Settings,
  ScanEye,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/orders", label: "Active Orders", icon: List },
  { href: "/inbox", label: "Approvals", icon: CheckSquare, badge: 4 },
  { href: "/factories", label: "Factory Directory", icon: Building2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ width: 64 }}
      animate={{ width: isExpanded ? 240 : 64 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col border-r border-glass-edge bg-glass-panel backdrop-blur-xl"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-center border-b border-glass-edge relative overflow-hidden shrink-0">
        <div className="flex items-center gap-3 px-4 w-full">
            <div className="min-w-[32px] flex justify-center">
                <ScanEye className="w-8 h-8 text-neon-cyan" />
            </div>
            <AnimatePresence>
            {isExpanded && (
                <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold tracking-widest text-white whitespace-nowrap"
                >
                Ironclad
                </motion.span>
            )}
            </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 flex flex-col gap-2 px-2 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden",
                isActive
                  ? "bg-neon-cyan/10 text-neon-cyan shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
                {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-cyan shadow-[0_0_10px_#00f0ff]" />
                )}
              <Icon className={cn("w-6 h-6 min-w-[24px]", isActive && "text-neon-cyan")} />
              <AnimatePresence>
                {isExpanded && (
                  <div className="flex flex-1 items-center justify-between overflow-hidden">
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="whitespace-nowrap font-medium"
                    >
                      {item.label}
                    </motion.span>
                    {item.badge && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="px-2 py-0.5 rounded-full bg-neon-cyan text-black text-xs font-bold"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-glass-edge shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
            <div className="min-w-[32px] h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center text-neon-cyan font-bold text-xs border border-neon-cyan/50 shrink-0">
                MR
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col overflow-hidden"
                    >
                        <span className="text-sm font-medium text-white whitespace-nowrap truncate">Mark R.</span>
                        <span className="text-xs text-gray-400 whitespace-nowrap truncate">View Profile</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
