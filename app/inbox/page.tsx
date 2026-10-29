"use client";

import { useState } from "react";
import { InboxQueue } from "@/components/inbox/InboxQueue";
import { InboxWorkspace } from "@/components/inbox/InboxWorkspace";
import { MOCK_APPROVALS } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";

export default function InboxPage() {
  const [items, setItems] = useState(MOCK_APPROVALS);
  const [selectedId, setSelectedId] = useState<string | null>(
    MOCK_APPROVALS[0]?.id || null
  );
  const selectedItem = items.find((item) => item.id === selectedId);

  const handleAction = (id: string) => {
    const newItems = items.filter((i) => i.id !== id);
    setItems(newItems);

    if (newItems.length > 0) {
      setSelectedId(newItems[0].id);
    } else {
      setSelectedId(null);
    }
  };

  const handleApprove = (id: string) => {
    console.log("Approved:", id);
    handleAction(id);
  };

  const handleReject = (id: string) => {
    console.log("Rejected:", id);
    handleAction(id);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      {/* Left Sidebar: The Queue */}
      <div className="w-80 shrink-0 flex flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Pending Queue</h2>
          <span className="px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan text-xs font-bold">
            {items.length}
          </span>
        </div>
        <InboxQueue
          items={items}
          selectedId={selectedId || ""}
          onSelect={setSelectedId}
        />
      </div>

      {/* Right Panel: Workspace */}
      <div className="flex-1 min-w-0">
        <GlassCard className="h-full p-6">
          {selectedItem ? (
            <InboxWorkspace
              item={selectedItem}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <div className="text-xl font-medium mb-2">All caught up!</div>
              <div className="text-sm">No pending approvals in the queue.</div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
