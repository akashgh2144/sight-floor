import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Clock, AlertCircle, CheckCircle2, PlayCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "alert",
    message: "Line 4 stopped: Material Shortage",
    time: "2 min ago",
    status: "critical",
  },
  {
    id: 2,
    type: "success",
    message: "Order #4492 completed ahead of schedule",
    time: "15 min ago",
    status: "success",
  },
  {
    id: 3,
    type: "info",
    message: "Shift B started on Line 2",
    time: "1 hour ago",
    status: "default",
  },
  {
    id: 4,
    type: "warning",
    message: "Efficiency drop detected on Line 1",
    time: "1.5 hours ago",
    status: "warning",
  },
  {
    id: 5,
    type: "info",
    message: "Maintenance scheduled for Cutter 03",
    time: "2 hours ago",
    status: "default",
  },
];

export function RecentActivity() {
  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight">
            Live Activity
          </h3>
          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500">
            Floor Events
          </p>
        </div>
        <Badge variant="neon">Live Feed</Badge>
      </div>

      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group"
          >
            <div className="mt-1">
              {activity.status === "critical" && (
                <AlertCircle className="w-4 h-4 text-neon-red" />
              )}
              {activity.status === "success" && (
                <CheckCircle2 className="w-4 h-4 text-neon-green" />
              )}
              {activity.status === "warning" && (
                <AlertCircle className="w-4 h-4 text-neon-amber" />
              )}
              {activity.status === "default" && (
                <PlayCircle className="w-4 h-4 text-neon-cyan" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-200 group-hover:text-white transition-colors">
                {activity.message}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-mono text-gray-500">
                  {activity.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

