"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Clock, Calendar, AlertTriangle } from "lucide-react";

export function AutomationRules() {
  return (
    <div className="space-y-8">
      {/* Section A: Scheduling */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Scheduling</h2>
        <GlassCard className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-neon-cyan" />
                Daily Trigger Time
              </label>
              <input
                type="time"
                defaultValue="09:00"
                className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-cyan/50 w-full"
              />
              <p className="text-xs text-gray-500">
                The time the daily 'Task List' is sent to factories.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neon-cyan" />
                  Weekend Mode
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                </label>
              </div>
              <p className="text-xs text-gray-500">
                If disabled, the bot will stay silent on Fridays.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Section B: Escalation Logic */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Escalation Logic</h2>
        <GlassCard className="p-6 space-y-6">
          <div className="space-y-6">
            <div className="flex items-start justify-between pb-6 border-b border-glass-edge">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-white">Auto-Nudge Unresponsive Factories</h3>
                <p className="text-xs text-gray-500">
                  If no reply by 04:00 PM, send a follow-up warning.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
              </label>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-neon-amber" />
                Mark as Critical after...
              </label>
              <select className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-cyan/50 w-full md:w-1/2">
                <option value="24">24 Hours</option>
                <option value="48">48 Hours</option>
              </select>
              <p className="text-xs text-gray-500">
                Orders will turn Red on the Dashboard if no communication is received for this duration.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

