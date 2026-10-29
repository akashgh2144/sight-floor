"use client";

import { useState } from "react";
import { TeamManagement } from "@/components/settings/TeamManagement";
import { CompanyProfile } from "@/components/settings/CompanyProfile";
import { BotConfiguration } from "@/components/settings/BotConfiguration";
import { AutomationRules } from "@/components/settings/AutomationRules";
import { cn } from "@/lib/utils";
import { Bot, Settings2, Users, Building } from "lucide-react";

type Tab = "bot" | "automation" | "team" | "profile";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("bot");

  const tabs = [
    {
      id: "bot",
      label: "Bot Configuration",
      icon: Bot,
      description: "Manage WhatsApp connection and templates",
    },
    {
      id: "automation",
      label: "Automation Rules",
      icon: Settings2,
      description: "Configure scheduling and escalation logic",
    },
    {
      id: "team",
      label: "Team Management",
      icon: Users,
      description: "Manage team members and permissions",
    },
    {
      id: "profile",
      label: "Company Profile",
      icon: Building,
      description: "Update organization details",
    },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Settings
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Control Panel for the WhatsApp Bot and organization preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all",
                activeTab === tab.id
                  ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="flex-1 min-h-[400px]">
          {activeTab === "bot" && <BotConfiguration />}
          {activeTab === "automation" && <AutomationRules />}
          {activeTab === "team" && <TeamManagement />}
          {activeTab === "profile" && <CompanyProfile />}
        </div>
      </div>
    </div>
  );
}
