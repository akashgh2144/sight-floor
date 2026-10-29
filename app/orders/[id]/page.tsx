import { SankeyChart } from "@/components/orders/details/SankeyChart";
import { OrderTimeline } from "@/components/orders/details/OrderTimeline";
import { EvidenceGallery } from "@/components/orders/details/EvidenceGallery";
import { Badge } from "@/components/ui/Badge";
import { MOCK_ORDERS } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const order = MOCK_ORDERS.find((o) => o.id === id) || MOCK_ORDERS[0]; // Fallback for demo

  if (!order) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Order {order.id}
            </h1>
            <Badge variant={order.status === "Sewing" ? "neon" : "default"}>
              {order.status}
            </Badge>
          </div>
          <p className="text-sm text-gray-400">
            {order.style} • {order.factory.name}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <a
            href={`https://wa.me/${order.factory.phone}?text=Regarding Style ${order.style}...`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-lg hover:bg-[#25D366]/20 transition-colors font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Live WhatsApp Link
          </a>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
              Ship Date
            </div>
            <div className="text-xl font-mono text-white">{order.shipDate}</div>
          </div>
        </div>
      </div>

      {/* Section A: Sankey Chart */}
      <SankeyChart order={order} />

      {/* Section B: Timeline */}
      <OrderTimeline order={order} />

      {/* Section C: Evidence Gallery */}
      <div className="h-[700px]">
        <EvidenceGallery />
      </div>
    </div>
  );
}
