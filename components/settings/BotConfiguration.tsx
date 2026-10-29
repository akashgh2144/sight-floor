"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Activity, CheckCircle, RefreshCw } from "lucide-react";
import { useState } from "react";

export function BotConfiguration() {
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success">("idle");

  const handleTestConnection = () => {
    setIsTesting(true);
    // Simulate API call
    setTimeout(() => {
      setIsTesting(false);
      setConnectionStatus("success");
      setTimeout(() => setConnectionStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Section A: Connection Status */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Connection Status</h2>
        <GlassCard className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-neon-green rounded-full animate-ping opacity-50" />
                </div>
                <span className="text-neon-green font-medium">System Online</span>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-400">Connected Number</p>
                <p className="text-lg font-mono text-white">+880 1712 345678</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-400">Provider</p>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                    Meta Cloud API
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <button
                onClick={handleTestConnection}
                disabled={isTesting}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-50"
              >
                {isTesting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Activity className="w-4 h-4" />
                )}
                {isTesting ? "Testing..." : "Test Connection"}
              </button>
              {connectionStatus === "success" && (
                <span className="text-xs text-neon-green flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                  <CheckCircle className="w-3 h-3" />
                  Success (120ms)
                </span>
              )}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Section B: Message Templates */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Message Templates</h2>
          <Badge variant="default" className="text-xs">Read-Only</Badge>
        </div>

        <GlassCard className="p-0 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-glass-edge bg-white/5 text-gray-400">
                <th className="px-6 py-3 font-medium">Template Name</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Language</th>
                <th className="px-6 py-3 font-medium">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-edge">
              <tr className="group hover:bg-white/5">
                <td className="px-6 py-4 font-mono text-white">daily_update_request</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="success" className="inline-flex items-center gap-1 whitespace-nowrap">
                    <CheckCircle className="w-3 h-3" /> Approved
                  </Badge>
                </td>
                <td className="px-6 py-4 text-gray-300">English / Bangla</td>
                <td className="px-6 py-4 text-gray-400">2 days ago</td>
              </tr>
              <tr className="group hover:bg-white/5">
                <td className="px-6 py-4 font-mono text-white">urgent_nudge</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="success" className="inline-flex items-center gap-1 whitespace-nowrap">
                    <CheckCircle className="w-3 h-3" /> Approved
                  </Badge>
                </td>
                <td className="px-6 py-4 text-gray-300">English</td>
                <td className="px-6 py-4 text-gray-400">1 week ago</td>
              </tr>
              <tr className="group hover:bg-white/5">
                <td className="px-6 py-4 font-mono text-white">image_rejection</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="success" className="inline-flex items-center gap-1 whitespace-nowrap">
                    <CheckCircle className="w-3 h-3" /> Approved
                  </Badge>
                </td>
                <td className="px-6 py-4 text-gray-300">English</td>
                <td className="px-6 py-4 text-gray-400">1 month ago</td>
              </tr>
            </tbody>
          </table>
        </GlassCard>
      </section>
    </div>
  );
}
