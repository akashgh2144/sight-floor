"use client";

import { OverviewStats } from "@/components/dashboard/OverviewStats";
import { WhatsAppFeed } from "@/components/dashboard/WhatsAppFeed";
import { RiskTicker } from "@/components/dashboard/RiskTicker";
import { useDemoMode } from "@/hooks/useDemoMode";
import dynamic from "next/dynamic";

// Dynamically import OperationsMap to avoid SSR issues with Leaflet
const OperationsMapDynamic = dynamic(
  () => import("@/components/dashboard/OperationsMap").then((mod) => mod.OperationsMap),
  { ssr: false, loading: () => <div className="h-full w-full bg-white/5 animate-pulse rounded-xl" /> }
);

export default function Home() {
  const isDemoMode = useDemoMode();

  return (
    <div className="space-y-6 h-[calc(100vh-120px)] flex flex-col">
      {/* Section A: KPI Cards (The Vitals) */}
      <div className="shrink-0">
        <OverviewStats isDemoMode={isDemoMode} />
      </div>

      {/* Section B & C Grid (The Action) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Section B: Live Operations Map */}
        <div className="lg:col-span-2 h-full min-h-[300px]">
          <OperationsMapDynamic isDemoMode={isDemoMode} />
        </div>
        {/* Section C: Real-Time WhatsApp Feed */}
        <div className="h-full min-h-[300px]">
          <WhatsAppFeed isDemoMode={isDemoMode} />
        </div>
      </div>

      {/* Section D: Critical Alerts (The Risk) */}
      <div className="shrink-0">
        <RiskTicker />
      </div>
    </div>
  );
}
