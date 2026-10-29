"use client";

import { useState } from "react";
import { MOCK_TEAM } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Plus, MoreHorizontal, Shield, Mail, Bell } from "lucide-react";
import { AddMemberModal } from "./AddMemberModal";

export function TeamManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Section A: Team Members */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Team Members</h2>
            <p className="text-sm text-gray-400">
              Manage access and roles for your organization
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-neon-cyan text-black font-bold rounded-lg hover:bg-neon-cyan/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </button>
        </div>

        <GlassCard className="overflow-hidden p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-glass-edge bg-white/5 text-gray-400">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-edge">
              {MOCK_TEAM.map((member) => (
                <tr key={member.id} className="group hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center text-neon-cyan font-bold text-xs border border-neon-cyan/50">
                        {member.avatar}
                      </div>
                      <span className="font-medium text-white">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-gray-500" />
                      {member.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Shield className="w-3 h-3 text-neon-amber" />
                      {member.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={member.status === "Active" ? "success" : "warning"}
                    >
                      {member.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </section>

      {/* Section B: Notification Preferences */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Notification Preferences</h2>
        <GlassCard className="p-6 space-y-6">
          <div className="space-y-6">
            <div className="flex items-start justify-between pb-6 border-b border-glass-edge">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-neon-cyan" />
                  Critical Order Alerts
                </h3>
                <p className="text-xs text-gray-500">
                  Email me when an Order turns Critical.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
              </label>
            </div>

            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-neon-cyan" />
                  Evidence Uploads
                </h3>
                <p className="text-xs text-gray-500">
                  Email me when a Factory uploads a photo.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
              </label>
            </div>
          </div>
        </GlassCard>
      </section>

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
