"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { X, MapPin, User, Phone, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AddFactoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddFactoryModal({ isOpen, onClose }: AddFactoryModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    ownerName: "",
    whatsapp: "",
    sendHello: true,
  });

  const handleNext = () => {
    if (step === 1 && formData.name && formData.location) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      onClose();
      setStep(1);
      setFormData({
        name: "",
        location: "",
        ownerName: "",
        whatsapp: "",
        sendHello: true,
      });
    }, 1000);
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
            <GlassCard className="p-0 overflow-hidden border-neon-cyan/30 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white tracking-tight">
                    Add New Factory
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Step {step} of 2: {step === 1 ? "Basic Info" : "Connectivity"}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {step === 1 ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Factory Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                        placeholder="e.g. Dhaka Unit 1"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          required
                          className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                          placeholder="Search address..."
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({ ...formData, location: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="h-40 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center relative overflow-hidden group cursor-crosshair">
                      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/90.4125,23.8103,12,0/600x400?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2xlNyJ9')] bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity" />
                      <div className="relative z-10 flex flex-col items-center text-gray-400">
                        <MapPin className="w-6 h-6 mb-2 text-neon-cyan" />
                        <span className="text-xs">Click to set pin location</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Owner / PM Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          required
                          className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                          placeholder="e.g. Mr. Rahim"
                          value={formData.ownerName}
                          onChange={(e) =>
                            setFormData({ ...formData, ownerName: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        WhatsApp Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                        <input
                          type="tel"
                          required
                          className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                          placeholder="+880..."
                          value={formData.whatsapp}
                          onChange={(e) =>
                            setFormData({ ...formData, whatsapp: e.target.value })
                          }
                        />
                      </div>
                      <p className="text-[10px] text-gray-500">
                        Must include country code (e.g. +880)
                      </p>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-start gap-3 p-3 rounded-lg border border-neon-green/20 bg-neon-green/5 cursor-pointer">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-500 checked:border-neon-green checked:bg-neon-green transition-all"
                            checked={formData.sendHello}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                sendHello: e.target.checked,
                              })
                            }
                          />
                          <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-black opacity-0 peer-checked:opacity-100" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            Send "Hello" Template
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Immediately start the 24h session window
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex items-center justify-between">
                  {step === 2 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step === 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!formData.name || !formData.location}
                      className="px-6 py-2 rounded-lg bg-neon-cyan text-black text-sm font-bold hover:bg-neon-cyan/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-neon-green text-black text-sm font-bold hover:bg-neon-green/90 transition-colors flex items-center gap-2"
                    >
                      Connect Factory
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

