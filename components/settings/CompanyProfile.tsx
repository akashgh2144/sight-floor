"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Upload, Globe, Building } from "lucide-react";

export function CompanyProfile() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Company Profile</h2>
        <p className="text-sm text-gray-400">
          Update your organization details and branding
        </p>
      </div>

      <GlassCard className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-xl bg-white/5 border border-dashed border-gray-600 flex flex-col items-center justify-center text-gray-400 hover:bg-white/10 hover:border-neon-cyan/50 hover:text-neon-cyan transition-all cursor-pointer group">
              <Upload className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Upload Logo</span>
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="text-sm font-medium text-white">Company Logo</h3>
              <p className="text-xs text-gray-500">
                Recommended size: 400x400px. Max file size: 2MB.
                <br />
                Supported formats: PNG, JPG, SVG.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Company Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  defaultValue="Ironclad Sourcing Ltd."
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-neon-cyan/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Timezone
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <select className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white appearance-none focus:outline-none focus:border-neon-cyan/50">
                  <option>(GMT+06:00) Dhaka</option>
                  <option>(GMT+00:00) London</option>
                  <option>(GMT-05:00) New York</option>
                  <option>(GMT+08:00) Singapore</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-glass-edge flex justify-end">
          <button className="px-6 py-2 rounded-lg bg-neon-cyan text-black font-bold hover:bg-neon-cyan/90 transition-colors shadow-[0_0_10px_rgba(0,240,255,0.3)]">
            Save Changes
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

