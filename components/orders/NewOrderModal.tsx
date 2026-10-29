"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { X, ChevronDown, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewOrderModal({ isOpen, onClose }: NewOrderModalProps) {
  const [formData, setFormData] = useState({
    buyer: "",
    styleRef: "",
    factory: "",
    triggerNow: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50"
          >
            <GlassCard className="p-6 border-neon-cyan/30 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  New Order Wizard
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Buyer
                    </label>
                    <div className="relative">
                      <select
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-neon-cyan/50"
                        value={formData.buyer}
                        onChange={(e) =>
                          setFormData({ ...formData, buyer: e.target.value })
                        }
                      >
                        <option value="">Select Buyer</option>
                        <option value="hm">H&M</option>
                        <option value="zara">Zara</option>
                        <option value="gap">Gap</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Style Ref
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                      placeholder="e.g. SUM-2025"
                      value={formData.styleRef}
                      onChange={(e) =>
                        setFormData({ ...formData, styleRef: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Factory (Connected Phone)
                    </label>
                    <div className="relative">
                      <select
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:border-neon-cyan/50"
                        value={formData.factory}
                        onChange={(e) =>
                          setFormData({ ...formData, factory: e.target.value })
                        }
                      >
                        <option value="">Select Factory</option>
                        <option value="dhaka-1">Dhaka Unit 1 (+880 1711...)</option>
                        <option value="ctg-epz">Chittagong EPZ-2 (+880 1811...)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-neon-cyan/5 border border-neon-cyan/20">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center h-5">
                      <input
                        id="triggerNow"
                        type="checkbox"
                        checked={formData.triggerNow}
                        onChange={(e) =>
                          setFormData({ ...formData, triggerNow: e.target.checked })
                        }
                        className="w-4 h-4 rounded border-gray-600 text-neon-cyan focus:ring-neon-cyan bg-black/40"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="triggerNow" className="text-sm font-medium text-white flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-neon-cyan" />
                        Send WhatsApp Request Immediately
                      </label>
                      <p className="text-xs text-gray-400 mt-1">
                        This will trigger the "Demo Standard" workflow (Fabric, Cutting, Sewing) and send the first request to the factory's phone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-sm font-bold bg-neon-cyan text-black hover:bg-neon-cyan/90 transition-colors shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                  >
                    Create & Trigger
                  </button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
