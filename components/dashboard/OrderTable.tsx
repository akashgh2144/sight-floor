import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

const orders = [
  { id: "ORD-2024-001", client: "TechWear Inc.", quantity: 5000, progress: 85, status: "active" },
  { id: "ORD-2024-002", client: "Urban Style", quantity: 2500, progress: 45, status: "warning" },
  { id: "ORD-2024-003", client: "Future Fit", quantity: 10000, progress: 12, status: "active" },
  { id: "ORD-2024-004", client: "Neo Textiles", quantity: 1500, progress: 100, status: "completed" },
  { id: "ORD-2024-005", client: "Cyber Garments", quantity: 3000, progress: 0, status: "pending" },
];

export function OrderTable() {
  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight">
            Active Orders
          </h3>
          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500">
            Production Queue
          </p>
        </div>
        <Badge variant="default">5 Active</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-glass-edge">
              <th className="py-3 text-[10px] uppercase tracking-wider font-bold text-gray-500">Order ID</th>
              <th className="py-3 text-[10px] uppercase tracking-wider font-bold text-gray-500">Client</th>
              <th className="py-3 text-[10px] uppercase tracking-wider font-bold text-gray-500 text-right">Qty</th>
              <th className="py-3 text-[10px] uppercase tracking-wider font-bold text-gray-500">Progress</th>
              <th className="py-3 text-[10px] uppercase tracking-wider font-bold text-gray-500 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-glass-edge/50 hover:bg-white/5 transition-colors group">
                <td className="py-3 text-xs font-mono text-neon-cyan group-hover:text-white transition-colors">{order.id}</td>
                <td className="py-3 text-sm text-gray-300">{order.client}</td>
                <td className="py-3 text-xs font-mono text-gray-300 text-right">{order.quantity.toLocaleString()}</td>
                <td className="py-3">
                  <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full ${
                            order.status === 'completed' ? 'bg-neon-green' : 
                            order.status === 'warning' ? 'bg-neon-amber' : 'bg-neon-cyan'
                        }`}
                        style={{ width: `${order.progress}%` }}
                    />
                  </div>
                </td>
                <td className="py-3 text-right">
                    <Badge variant={
                        order.status === 'completed' ? 'success' :
                        order.status === 'warning' ? 'warning' :
                        order.status === 'pending' ? 'default' : 'neon'
                    }>
                        {order.status}
                    </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

