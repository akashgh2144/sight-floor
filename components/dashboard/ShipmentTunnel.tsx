"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { week: "Wk 52", safe: 45000, atRisk: 2000 },
  { week: "Wk 01", safe: 38000, atRisk: 5000 },
  { week: "Wk 02", safe: 42000, atRisk: 12000 },
  { week: "Wk 03", safe: 35000, atRisk: 8000 },
];

export function ShipmentTunnel() {
  return (
    <GlassCard className="h-full flex flex-col p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white tracking-tight">
          Shipments by Week
        </h3>
        <p className="text-sm text-gray-400">
          Projected output vs. risk analysis
        </p>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="week"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend />
            <Bar
              dataKey="safe"
              name="On Track"
              stackId="a"
              fill="#00f0ff" // neon-cyan
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="atRisk"
              name="At Risk"
              stackId="a"
              fill="#ff003c" // neon-red
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

