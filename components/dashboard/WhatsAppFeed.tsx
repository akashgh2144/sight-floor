"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";

interface Message {
  id: number;
  name: string;
  action: string;
  time: string;
  avatar: string;
  thumbnail: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    name: "Mr. Rahim",
    action: "Uploaded Fabric Challan",
    time: "Just now",
    avatar: "https://i.pravatar.cc/150?u=1",
    thumbnail: "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    name: "Ms. Fatema",
    action: "Reported Machine Breakdown",
    time: "2m ago",
    avatar: "https://i.pravatar.cc/150?u=2",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    name: "Mr. Karim",
    action: "Quality Check Passed",
    time: "5m ago",
    avatar: "https://i.pravatar.cc/150?u=3",
    thumbnail: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=100&q=80",
  },
];

export function WhatsAppFeed({ isDemoMode }: { isDemoMode: boolean }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  useEffect(() => {
    if (!isDemoMode) return;

    const interval = setInterval(() => {
      const newMessage: Message = {
        id: Date.now(),
        name: ["Mr. Rahim", "Ms. Fatema", "Mr. Karim", "John Doe"][Math.floor(Math.random() * 4)],
        action: ["Uploaded Photo", "Delay Alert", "Production Update", "Shipping Doc"][Math.floor(Math.random() * 4)],
        time: "Just now",
        avatar: `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 100)}`,
        thumbnail: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000000)}?auto=format&fit=crop&w=100&q=80`,
      };

      setMessages((prev) => [newMessage, ...prev.slice(0, 4)]);
    }, 5000);

    return () => clearInterval(interval);
  }, [isDemoMode]);

  return (
    <GlassCard className="h-full flex flex-col p-0 overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-neon-green" />
          Incoming Intelligence
        </h3>
        <span className="text-xs text-neon-green animate-pulse">● Live</span>
      </div>

      <div className="flex-1 overflow-hidden relative p-4 space-y-3">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group relative"
            >
              <img src={msg.avatar} alt={msg.name} className="w-8 h-8 rounded-full border border-white/20" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-medium text-white truncate">{msg.name}</p>
                  <span className="text-[10px] text-gray-500">{msg.time}</span>
                </div>
                <p className="text-xs text-gray-400 truncate">{msg.action}</p>
              </div>
              <div className="relative group/img">
                <img
                    src={msg.thumbnail}
                    alt="Proof"
                    className="w-10 h-10 rounded object-cover border border-white/20 cursor-zoom-in"
                />
                {/* Hover Zoom Effect */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 rounded-lg border-2 border-neon-cyan shadow-2xl opacity-0 scale-0 group-hover/img:opacity-100 group-hover/img:scale-100 transition-all duration-200 z-50 pointer-events-none origin-right bg-black">
                    <img src={msg.thumbnail} alt="Zoomed Proof" className="w-full h-full object-cover rounded-lg" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}

