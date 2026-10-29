"use client";

import { Factory } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { MessageCircle, Send, Edit } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FactoryCardProps {
  factory: Factory;
}

export function FactoryCard({ factory }: FactoryCardProps) {
  const getBorderColor = (status: Factory["status"]) => {
    switch (status) {
      case "Online":
        return "border-neon-green/50 hover:border-neon-green";
      case "Offline":
        return "border-neon-red/50 hover:border-neon-red";
      default:
        return "border-white/10 hover:border-white/30";
    }
  };

  const getStatusColor = (status: Factory["status"]) => {
    switch (status) {
      case "Online":
        return "text-neon-green";
      case "Offline":
        return "text-neon-red";
      default:
        return "text-gray-400";
    }
  };

  return (
    <GlassCard
      className={cn(
        "p-0 flex flex-col h-full group transition-all duration-300 border-2",
        getBorderColor(factory.status)
      )}
    >
      {/* Header */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {factory.name}
            </h3>
            <p className="text-xs text-gray-400 mt-1">{factory.location}</p>
          </div>
          <Badge
            variant={
              factory.riskGrade === "A"
                ? "success"
                : factory.riskGrade === "B"
                ? "warning"
                : "danger"
            }
          >
            Grade {factory.riskGrade}
          </Badge>
        </div>
      </div>

      {/* The Pulse (Middle) */}
      <div className="p-6 flex-1 flex flex-col items-center justify-center text-center space-y-3">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center bg-white/5",
            getStatusColor(factory.status)
          )}
        >
          <MessageCircle className="w-6 h-6" />
        </div>

        <div>
          <p className="text-sm font-mono text-white font-medium">
            {factory.phone}
          </p>
          <p className={cn("text-xs mt-1", getStatusColor(factory.status))}>
            {factory.status === "Online"
              ? `Active (Last msg: ${factory.lastReply})`
              : factory.status === "Offline"
              ? "Session Expired (Send Template)"
              : "Pending Invite"}
          </p>
        </div>
      </div>

      {/* Footer (Metrics) */}
      <div className="p-4 bg-white/5 border-t border-white/5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Running Orders</p>
            <p className="text-lg font-bold text-white">{factory.runningOrders}</p>
          </div>
          <div className="text-center border-l border-white/10">
            <p className="text-xs text-gray-500 mb-1">Avg Response</p>
            <p className="text-lg font-bold text-white">
              {factory.avgResponseTime} <span className="text-xs font-normal text-gray-500">mins</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="flex-1 h-9 rounded-lg bg-neon-cyan/10 text-neon-cyan text-xs font-medium hover:bg-neon-cyan/20 transition-colors flex items-center justify-center gap-2">
            <Send className="w-3 h-3" />
            Ping
          </button>
          <Link
            href={`/factories/${factory.id}`}
            className="flex-1 h-9 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <Edit className="w-3 h-3" />
            Edit
          </Link>
        </div>
      </div>
    </GlassCard>
  );
}

