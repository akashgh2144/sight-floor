import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { MOCK_ORDERS } from "@/lib/mock-data";

export function FactoryStatusMap() {
  // Derive factory status from MOCK_ORDERS
  const factoryMap = new Map<
    string,
    { status: "on-track" | "critical" | "warning"; statusText: string }
  >();

  // Initialize with default factories from spec if not present in orders, or just use orders
  // Spec says: "Dhaka Unit 1", "Chittagong Unit B", "Gazipur Line 4"
  // Mock data has: "Dhaka Unit 1", "Chittagong EPZ-2", "Gazipur Wash Plant"
  // I will use the ones from mock data + the ones from spec if I can map them, but let's stick to mock data names for consistency with other pages.

  // Default states
  factoryMap.set("Dhaka Unit 1", { status: "on-track", statusText: "On Track" });
  factoryMap.set("Chittagong EPZ-2", { status: "on-track", statusText: "On Track" });
  factoryMap.set("Gazipur Wash Plant", { status: "on-track", statusText: "On Track" });

  // Update based on orders
  MOCK_ORDERS.forEach((order) => {
    const current = factoryMap.get(order.factory.name);
    if (!current) return;

    if (order.isDelayed) {
      // If any order is delayed, mark factory as warning or critical
      // Let's say delayed = warning for now, unless efficiency is low
      if (order.efficiency < 80) {
        factoryMap.set(order.factory.name, { status: "critical", statusText: "Critical Delay" });
      } else {
        // Only upgrade to warning if not already critical
        if (current.status !== "critical") {
          factoryMap.set(order.factory.name, { status: "warning", statusText: "Delay Risk" });
        }
      }
    } else if (order.efficiency < 80) {
      if (current.status !== "critical") {
        factoryMap.set(order.factory.name, { status: "warning", statusText: "Low Efficiency" });
      }
    }
  });

  const factories = Array.from(factoryMap.entries()).map(
    ([name, data], index) => ({
      id: index,
      name,
      ...data,
    })
  );

  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight">
            Factory Status Map
          </h3>
          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500">
            Unit Health
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {factories.map((factory) => (
          <div
            key={factory.id}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-glass-highlight transition-all"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]",
                  factory.status === "on-track" && "bg-neon-green text-neon-green",
                  factory.status === "critical" && "bg-neon-red text-neon-red",
                  factory.status === "warning" && "bg-neon-amber text-neon-amber"
                )}
              />
              <span className="text-sm font-medium text-white">
                {factory.name}
              </span>
            </div>
            <span
              className={cn(
                "text-xs font-mono uppercase tracking-wider",
                factory.status === "on-track" && "text-neon-green",
                factory.status === "critical" && "text-neon-red",
                factory.status === "warning" && "text-neon-amber"
              )}
            >
              {factory.statusText}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
