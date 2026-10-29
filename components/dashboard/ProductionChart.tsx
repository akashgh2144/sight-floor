"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "08:00", actual: 400, target: 1500 },
  { time: "09:00", actual: 1200, target: 1500 },
  { time: "10:00", actual: 2800, target: 1500 },
  { time: "11:00", actual: 4200, target: 1500 },
  { time: "12:00", actual: 5600, target: 1500 },
  { time: "13:00", actual: 5800, target: 1500 }, // Dip for lunch
  { time: "14:00", actual: 7200, target: 1500 },
  { time: "15:00", actual: 8900, target: 1500 },
  { time: "16:00", actual: 10500, target: 1500 },
  { time: "17:00", actual: 12100, target: 1500 },
  { time: "18:00", actual: 13500, target: 1500 },
  { time: "19:00", actual: 14250, target: 1500 },
  { time: "20:00", actual: null, target: 1500 },
];

export function ProductionChart() {
  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight">
            Hourly Production Output (Real-time)
          </h3>
          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500">
            Real-time Performance
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neon-cyan" />
            <span className="text-xs text-gray-400 font-mono">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="text-xs text-gray-400 font-mono">Target</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: "var(--font-jetbrains-mono)" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: "var(--font-jetbrains-mono)" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(20, 20, 23, 0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                backdropFilter: "blur(12px)",
              }}
              itemStyle={{ color: "#fff", fontFamily: "var(--font-jetbrains-mono)", fontSize: "12px" }}
              labelStyle={{ color: "#9ca3af", marginBottom: "4px", fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px" }}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#00f0ff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorActual)"
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="transparent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
