"use client";

import { ApprovalItem } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Clock, MessageCircle, FileAudio, FileVideo } from "lucide-react";

interface InboxQueueProps {
  items: ApprovalItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function InboxQueue({ items, selectedId, onSelect }: InboxQueueProps) {
  return (
    <div className="h-full overflow-y-auto pr-2 space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={cn(
            "p-3 rounded-xl border cursor-pointer transition-all duration-200 group",
            selectedId === item.id
              ? "bg-neon-cyan/10 border-neon-cyan/50 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
              : "bg-glass-panel border-glass-edge hover:bg-white/5 hover:border-white/10"
          )}
        >
          <div className="flex gap-3">
            {/* Thumbnail */}
            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden shrink-0 relative flex items-center justify-center">
              {item.mediaType === "photo" ? (
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : item.mediaType === "audio" ? (
                <FileAudio className="w-5 h-5 text-gray-400" />
              ) : (
                <FileVideo className="w-5 h-5 text-gray-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 truncate">
                    {item.factory}
                  </span>
                  <MessageCircle className="w-3 h-3 text-green-500 shrink-0" />
                </div>
                <span
                  className={cn(
                    "text-[10px] whitespace-nowrap ml-2",
                    item.isUrgent ? "text-orange-500 font-medium" : "text-gray-400"
                  )}
                >
                  {item.timestamp}
                </span>
              </div>
              <h4
                className={cn(
                  "font-medium text-sm mb-1 truncate",
                  selectedId === item.id ? "text-white" : "text-gray-300"
                )}
              >
                {item.taskName}
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-neon-cyan font-mono">
                  {item.styleRef}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

