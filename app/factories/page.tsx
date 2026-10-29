"use client";

import { useState } from "react";
import { MOCK_FACTORIES, type Factory } from "@/lib/mock-data";
import { FactoryCard } from "@/components/factories/FactoryCard";
import { AddFactoryModal } from "@/components/factories/AddFactoryModal";
import { Search, Plus, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FactoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Online" | "Offline">("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredFactories = MOCK_FACTORIES.filter((factory) => {
    const matchesSearch =
      factory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      factory.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      factory.phone.includes(searchQuery);

    const matchesStatus =
      statusFilter === "All" || factory.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Factory Directory
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Connectivity Hub & Network Grid
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Find Factory, Owner, or Phone..."
              className="w-64 bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-neon-cyan/50 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
            {(["All", "Online", "Offline"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  statusFilter === status
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {status === "Online" ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                    Online
                  </span>
                ) : status === "Offline" ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-red" />
                    Unresponsive
                  </span>
                ) : (
                  "All"
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-neon-cyan text-black text-sm font-bold hover:bg-neon-cyan/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Factory
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFactories.map((factory) => (
          <FactoryCard key={factory.id} factory={factory} />
        ))}
      </div>

      <AddFactoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

