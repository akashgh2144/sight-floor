"use client";

import { useState } from "react";
import { MOCK_FACTORIES } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Link as LinkIcon,
  Clock,
  RefreshCcw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Map as MapIcon,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export default function FactoryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const factory = MOCK_FACTORIES.find((f) => f.id === params.id);
  const [activeTab, setActiveTab] = useState<"connectivity" | "map" | "performance">("connectivity");

  if (!factory) {
    notFound();
  }

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* Sidebar: Factory Info */}
      <div className="w-80 shrink-0 space-y-6">
        <GlassCard className="p-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-white tracking-tight">
              {factory.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
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
              <span className="text-xs text-gray-400">
                ID: {factory.id.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-white">{factory.location}</p>
                  <p className="text-xs text-gray-500">{factory.country}</p>
                  <div className="mt-2 text-[10px] font-mono text-neon-cyan">
                    {factory.coordinates.lat}, {factory.coordinates.lng}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Primary Contact
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <User className="w-4 h-4 text-gray-500" />
                {factory.contactPerson}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-gray-500" />
                {factory.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-gray-500" />
                {factory.email}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-white/10">
          <button
            onClick={() => setActiveTab("connectivity")}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              activeTab === "connectivity"
                ? "border-neon-cyan text-neon-cyan"
                : "border-transparent text-gray-400 hover:text-white"
            )}
          >
            <LinkIcon className="w-4 h-4" />
            Connectivity Health
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              activeTab === "map"
                ? "border-neon-cyan text-neon-cyan"
                : "border-transparent text-gray-400 hover:text-white"
            )}
          >
            <MapIcon className="w-4 h-4" />
            Map & Geo-Fence
          </button>
          <button
            onClick={() => setActiveTab("performance")}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              activeTab === "performance"
                ? "border-neon-cyan text-neon-cyan"
                : "border-transparent text-gray-400 hover:text-white"
            )}
          >
            <Activity className="w-4 h-4" />
            Performance Stats
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pr-2">
          {activeTab === "connectivity" && (
            <div className="space-y-6">
              {/* Status Hero Widget */}
              <GlassCard className="p-8 flex items-center justify-between border-l-4 border-l-neon-green">
                <div className="flex items-center gap-6">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center bg-white/5",
                      factory.status === "Online"
                        ? "text-neon-green"
                        : "text-neon-red"
                    )}
                  >
                    <LinkIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {factory.status === "Online"
                        ? "Connection Active"
                        : "Connection Lost"}
                    </h2>
                    <div className="flex items-center gap-2 mt-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      {factory.status === "Online" ? (
                        <span>Session Valid For: {factory.sessionExpiry}</span>
                      ) : (
                        <span>Session Expired</span>
                      )}
                    </div>
                  </div>
                </div>

                {factory.status !== "Online" && (
                  <button className="px-6 py-3 rounded-lg bg-neon-cyan text-black font-bold hover:bg-neon-cyan/90 transition-colors flex items-center gap-2">
                    <RefreshCcw className="w-4 h-4" />
                    Re-Open Session
                  </button>
                )}
              </GlassCard>

              {/* Communication Log */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Communication Log
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      time: "9:05 AM",
                      event: "User Replied - Session Activated",
                      type: "success",
                    },
                    {
                      time: "9:00 AM",
                      event: "Template Sent (Hello)",
                      type: "info",
                    },
                    {
                      time: "Yesterday",
                      event: "Reminder Failed (Error 404)",
                      type: "error",
                    },
                  ].map((log, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5"
                    >
                      <span className="text-xs font-mono text-gray-500 w-20">
                        {log.time}
                      </span>
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          log.type === "success"
                            ? "bg-neon-green"
                            : log.type === "error"
                            ? "bg-neon-red"
                            : "bg-neon-cyan"
                        )}
                      />
                      <span className="text-sm text-gray-300">{log.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "map" && (
            <div className="space-y-6">
              <GlassCard className="p-0 overflow-hidden h-[500px] relative group">
                <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/90.2576,23.8479,15,0/1000x600?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2xlNyJ9')] bg-cover bg-center opacity-60" />

                {/* Geo-Fence Overlay */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-neon-cyan/50 bg-neon-cyan/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
                </div>

                <div className="absolute bottom-6 left-6 p-4 rounded-lg bg-black/80 backdrop-blur border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-neon-cyan/50 border border-neon-cyan" />
                    <span className="text-sm font-bold text-white">Geo-Fence Active</span>
                  </div>
                  <p className="text-xs text-gray-400">Radius: 500m</p>
                </div>
              </GlassCard>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <GlassCard className="p-6">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                    Response Time Trend
                  </h3>
                  <div className="h-48 flex items-end gap-2">
                    {[15, 12, 10, 18, 12, 8, 12].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-neon-cyan/20 hover:bg-neon-cyan/40 transition-colors rounded-t-sm relative group"
                          style={{ height: `${(val / 20) * 100}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {val}m
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-500">Day {i + 1}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                    Missed Deadlines
                  </h3>
                  <div className="space-y-3">
                    {[
                      { task: "Fabric Check", date: "Dec 28", reason: "No Reply" },
                      { task: "Cutting Report", date: "Dec 25", reason: "Late Submission" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded bg-white/5">
                        <div>
                          <p className="text-sm text-white font-medium">{item.task}</p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                        <Badge variant="danger">{item.reason}</Badge>
                      </div>
                    ))}
                    {/* Empty state if needed */}
                    <div className="pt-4 text-center">
                      <p className="text-xs text-gray-500">No other recent misses</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

