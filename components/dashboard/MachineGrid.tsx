import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

const machines = [
    { id: "L-01", status: "active", efficiency: 92 },
    { id: "L-02", status: "active", efficiency: 88 },
    { id: "L-03", status: "warning", efficiency: 76 },
    { id: "L-04", status: "active", efficiency: 95 },
    { id: "L-05", status: "error", efficiency: 0 },
    { id: "L-06", status: "active", efficiency: 89 },
    { id: "L-07", status: "active", efficiency: 91 },
    { id: "L-08", status: "active", efficiency: 94 },
    { id: "L-09", status: "warning", efficiency: 72 },
    { id: "L-10", status: "active", efficiency: 98 },
    { id: "L-11", status: "active", efficiency: 85 },
    { id: "L-12", status: "active", efficiency: 90 },
    { id: "L-13", status: "error", efficiency: 0 },
    { id: "L-14", status: "active", efficiency: 93 },
    { id: "L-15", status: "active", efficiency: 87 },
    { id: "L-16", status: "active", efficiency: 96 },
    { id: "L-17", status: "warning", efficiency: 78 },
    { id: "L-18", status: "active", efficiency: 92 },
    { id: "L-19", status: "active", efficiency: 89 },
    { id: "L-20", status: "active", efficiency: 94 },
];

export function MachineGrid() {
  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight">
            Line Status
          </h3>
          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500">
            Active Units
          </p>
        </div>
        <div className="flex gap-2">
            <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                <span className="text-[10px] text-gray-500">OK</span>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-amber" />
                <span className="text-[10px] text-gray-500">WARN</span>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-red" />
                <span className="text-[10px] text-gray-500">ERR</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {machines.map((machine) => (
          <div
            key={machine.id}
            className={cn(
              "aspect-square rounded-md border flex flex-col items-center justify-center gap-1 transition-all hover:scale-105 cursor-pointer",
              machine.status === "active" && "bg-neon-green/5 border-neon-green/20 hover:bg-neon-green/10 hover:border-neon-green/40",
              machine.status === "warning" && "bg-neon-amber/5 border-neon-amber/20 hover:bg-neon-amber/10 hover:border-neon-amber/40",
              machine.status === "error" && "bg-neon-red/5 border-neon-red/20 hover:bg-neon-red/10 hover:border-neon-red/40"
            )}
          >
            <span className={cn(
                "text-xs font-bold",
                machine.status === "active" && "text-neon-green",
                machine.status === "warning" && "text-neon-amber",
                machine.status === "error" && "text-neon-red"
            )}>
                {machine.id}
            </span>
            <span className="text-[10px] font-mono text-gray-400">
                {machine.efficiency}%
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
