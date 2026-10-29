"use client"
import { OrdersTable } from "@/components/orders/OrdersTable";
import { Search, Filter, Plus } from "lucide-react";
import { useState } from "react";
import { NewOrderModal } from "@/components/orders/NewOrderModal";

export default function OrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Order Management
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Production pipeline and delivery status
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-black font-bold rounded-lg hover:bg-neon-cyan/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Order
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 p-4 bg-glass-panel border border-glass-edge rounded-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Style, PO, Factory..."
            className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-cyan/50 transition-colors"
          />
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm text-gray-300 transition-colors">
            <Filter className="w-4 h-4" />
            Status: All
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm text-gray-300 transition-colors">
            Buyer: All
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-sm text-gray-300 transition-colors">
            Factory: All
          </button>
        </div>
      </div>

      <OrdersTable />

      <NewOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
