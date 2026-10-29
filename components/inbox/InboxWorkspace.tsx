"use client";

import { ApprovalItem } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Check,
  X,
  RotateCw,
  Box,
  AlertTriangle,
  MessageCircle,
  FileAudio,
  FileVideo,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InboxWorkspaceProps {
  item: ApprovalItem;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const REJECTION_REASONS = [
  {
    id: "blur",
    label: "Blurry Photo",
    text: "The photo is blurry. Please send a clear picture of the Challan.",
  },
  {
    id: "qty",
    label: "Wrong Quantity",
    text: "The quantity does not match the Order. Please check and re-send.",
  },
  {
    id: "doc",
    label: "Wrong Document",
    text: "This is the wrong document. Please send the correct one.",
  },
];

export function InboxWorkspace({
  item,
  onApprove,
  onReject,
}: InboxWorkspaceProps) {
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [rotation, setRotation] = useState(0);

  const isMediaSupported = item.mediaType === "photo";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.key.toLowerCase() === "a") {
        if (isMediaSupported && !isRejectOpen) {
          onApprove(item.id);
        }
      } else if (e.key.toLowerCase() === "r") {
        if (!isRejectOpen) {
          setIsRejectOpen(true);
        }
      } else if (e.key === "Escape") {
        if (isRejectOpen) {
          setIsRejectOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item.id, isMediaSupported, isRejectOpen, onApprove]);

  const handleRotate = () => setRotation((prev) => prev + 90);

  const handleRejectSubmit = (reasonText: string) => {
    console.log(`Rejecting ${item.id} with message: ${reasonText}`);
    onReject(item.id);
    setIsRejectOpen(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Verifying: Style #{item.styleRef}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {item.taskName} • {item.factory}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${item.whatsappNumber?.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-bold">Open WhatsApp Web</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Left: Image Preview */}
        <div className="lg:col-span-2 relative group rounded-xl overflow-hidden border border-glass-edge bg-black/50">
          {isMediaSupported ? (
            <>
              <img
                src={item.image}
                alt="Verification Evidence"
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-300"
                style={{ transform: `rotate(${rotation}deg)` }}
              />

              {/* Overlays */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs text-white/80 border border-white/10">
                  Source: WhatsApp
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleRotate}
                  className="p-2 rounded-lg bg-black/60 backdrop-blur text-white hover:bg-white/20 transition-colors"
                  title="Rotate Image"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                {item.mediaType === "audio" ? (
                  <FileAudio className="w-8 h-8 text-gray-400" />
                ) : (
                  <FileVideo className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                ⚠️ Media Type Not Supported
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                This media cannot be played in the dashboard.
              </p>
              <a
                href={`https://wa.me/${item.whatsappNumber?.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Open in WhatsApp to View
              </a>
            </div>
          )}
        </div>

        {/* Right: Data Comparison */}
        <div className="space-y-4">
          <GlassCard className="p-5 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Data Validation
            </h3>

            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider mb-1">
                  <Box className="w-3 h-3" />
                  Quantity Check
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {item.claimed.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Claimed</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-400">
                      {item.required.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Required</div>
                  </div>
                </div>
                {item.claimed !== item.required && (
                  <div className="mt-2 flex items-center gap-2 text-neon-amber text-xs font-medium">
                    <AlertTriangle className="w-3 h-3" />
                    Mismatch Detected
                  </div>
                )}
              </div>
            </div>
          </GlassCard>

          <div className="p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20">
            <h4 className="text-neon-cyan font-bold text-sm mb-2">
              AI Analysis
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Image analysis confirms fabric roll count matches claimed quantity
              within 98% confidence interval. No visible defects detected in
              random sampling.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer Actions */}
      <div className="mt-6 pt-6 border-t border-glass-edge flex justify-end gap-4">
        <button
          onClick={() => setIsRejectOpen(true)}
          className="px-6 py-3 rounded-xl border-2 border-neon-red text-neon-red font-bold hover:bg-neon-red hover:text-black transition-all duration-200 flex items-center gap-2"
        >
          <X className="w-5 h-5" />
          Request Re-Submission
        </button>

        <button
          onClick={() => onApprove(item.id)}
          disabled={!isMediaSupported}
          className="px-8 py-3 rounded-xl bg-neon-green text-black font-bold hover:bg-neon-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
        >
          <Check className="w-5 h-5" />
          Approve & Log
        </button>
      </div>

      {/* Reject Modal */}
      <AnimatePresence>
        {isRejectOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Why are you rejecting this?
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Select a message to send back to the factory.
              </p>

              <div className="space-y-2 mb-6">
                {REJECTION_REASONS.map((reason) => (
                  <button
                    key={reason.id}
                    onClick={() => handleRejectSubmit(reason.text)}
                    className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group"
                  >
                    <div className="font-medium text-white mb-1">
                      {reason.label}
                    </div>
                    <div className="text-xs text-gray-500 group-hover:text-gray-400">
                      Bot sends: "{reason.text}"
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsRejectOpen(false)}
                className="w-full py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
