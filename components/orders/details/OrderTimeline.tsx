import { GlassCard } from "@/components/ui/GlassCard";
import { CheckCircle2, Circle, Loader2, CheckCheck, Check, MessageCircle, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Order } from "@/lib/mock-data";

interface OrderTimelineProps {
  order?: Order;
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  if (!order) return null;

  const steps = order.timelineSteps || [];

  return (
    <GlassCard className="w-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white tracking-tight">
          Production Timeline
        </h3>
        <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500">
          Live Status Tracking
        </p>
      </div>

      <div className="relative flex flex-col gap-4">
        {/* Vertical Connecting Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-800 -z-10" />

        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex gap-4">
              {/* Status Icon Column */}
              <div className="relative flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full border-2 flex items-center justify-center bg-void z-10",
                  step.status === "completed" && "border-neon-green text-neon-green shadow-[0_0_10px_rgba(57,255,20,0.3)]",
                  step.status === "in-progress" && "border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)]",
                  step.status === "pending" && "border-gray-700 text-gray-600"
                )}>
                  {step.status === "completed" && <CheckCircle2 className="w-5 h-5" />}
                  {step.status === "in-progress" && <Loader2 className="w-5 h-5 animate-spin" />}
                  {step.status === "pending" && <Circle className="w-5 h-5" />}
                </div>
                {!isLast && (
                  <div className={cn(
                    "w-0.5 flex-1 my-2",
                    step.status === "completed" ? "bg-neon-green/50" : "bg-gray-800"
                  )} />
                )}
              </div>

              {/* Smart Card */}
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className={cn(
                        "font-bold text-sm uppercase tracking-wider",
                        step.status === "completed" && "text-neon-green",
                        step.status === "in-progress" && "text-neon-cyan",
                        step.status === "pending" && "text-gray-400"
                      )}>
                        {step.label}
                      </h4>
                      {step.status === "in-progress" && (
                        <span className="px-2 py-0.5 rounded bg-neon-cyan/10 text-neon-cyan text-[10px] font-bold border border-neon-cyan/20">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 font-mono">
                      {step.date}
                    </p>
                  </div>

                  {/* Middle: Message State */}
                  <div className="flex-1 flex items-center justify-center">
                    {step.messageStatus && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/20 border border-white/5">
                        {step.messageStatus === "read" && <CheckCheck className="w-4 h-4 text-neon-cyan" />}
                        {step.messageStatus === "delivered" && <CheckCheck className="w-4 h-4 text-gray-400" />}
                        {step.messageStatus === "sent" && <Check className="w-4 h-4 text-gray-500" />}
                        {step.messageStatus === "replied" && <MessageCircle className="w-4 h-4 text-neon-green" />}
                        {step.messageStatus === "failed" && <Circle className="w-4 h-4 text-neon-red" />}

                        <span className="text-xs text-gray-300">
                          {step.messageText}
                        </span>
                      </div>
                    )}

                    {step.status === "pending" && !step.messageStatus && (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-xs">Waiting for reply...</span>
                        <button className="ml-2 text-[10px] text-neon-cyan hover:underline">
                          [Resend Template]
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right: Thumbnail / Action */}
                  <div className="w-24 flex justify-end">
                    {step.thumbnail ? (
                      <div className="group relative w-12 h-12 rounded-lg overflow-hidden border border-white/20 cursor-pointer">
                        <img
                          src={step.thumbnail}
                          alt="Evidence"
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ImageIcon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ) : (
                      step.status === "completed" && (
                        <div className="text-right">
                          <div className="text-[10px] text-gray-500 uppercase">Claimed</div>
                          <div className="text-sm font-mono text-white">5,200 pcs</div>
                          <div className="text-[10px] text-neon-green flex items-center justify-end gap-1">
                            <MessageCircle className="w-3 h-3" />
                            Via WhatsApp
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
