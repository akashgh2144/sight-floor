import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CRITICAL_ALERTS = [
  {
    id: 1,
    styleRef: "SUM-2025",
    factory: "Desh Garments",
    issue: "Sewing Late",
    severity: "high",
  },
  {
    id: 2,
    styleRef: "WIN-992",
    factory: "Alpha Textiles",
    issue: "Fabric Delay",
    severity: "medium",
  },
  {
    id: 3,
    styleRef: "KID-882",
    factory: "Beta Fashions",
    issue: "Quality Fail",
    severity: "high",
  },
];

export function RedList() {
  return (
    <GlassCard className="h-full flex flex-col p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight">
            Critical Alerts
          </h3>
          <p className="text-sm text-gray-400">Immediate attention required</p>
        </div>
        <Badge variant="danger" className="animate-pulse">
          {CRITICAL_ALERTS.length} Issues
        </Badge>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="pb-3 font-medium">Style Ref</th>
              <th className="pb-3 font-medium">Factory</th>
              <th className="pb-3 font-medium">Issue</th>
              <th className="pb-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {CRITICAL_ALERTS.map((alert) => (
              <tr key={alert.id} className="group">
                <td className="py-4 font-medium text-white">
                  {alert.styleRef}
                </td>
                <td className="py-4 text-gray-400">{alert.factory}</td>
                <td className="py-4">
                  <span className="text-neon-red font-medium">
                    {alert.issue}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <Link
                    href={`/orders/${alert.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-neon-cyan hover:text-white transition-colors"
                  >
                    View <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

