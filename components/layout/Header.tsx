"use client";

import { usePathname } from "next/navigation";
import { Ticker } from "@/components/ui/Ticker";
import { User } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  // Simple breadcrumb logic
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = ["Home", ...segments.map(s => s.charAt(0).toUpperCase() + s.slice(1))];

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-glass-edge bg-glass-panel backdrop-blur-xl flex items-center px-6 gap-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm font-mono text-gray-400 min-w-fit">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-600">/</span>}
            <span className={index === breadcrumbs.length - 1 ? "text-neon-cyan" : ""}>
              {crumb}
            </span>
          </div>
        ))}
      </div>

      {/* Ticker */}
      <div className="flex-1 flex items-center border-l border-r border-glass-edge px-6 h-8 overflow-hidden">
        <Ticker />
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3 min-w-fit">
        <div className="text-right hidden sm:block">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Role</div>
            <div className="text-sm font-bold text-white">Admin View</div>
        </div>
        <div className="w-10 h-10 rounded-full bg-glass-highlight border border-glass-edge flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.1)]">
            <User className="w-5 h-5 text-neon-cyan" />
        </div>
      </div>
    </header>
  );
}

