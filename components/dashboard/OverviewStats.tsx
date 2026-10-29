"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Layers, DollarSign, AlertTriangle, FileCheck, Activity } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

function NumberTicker({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => `${prefix}${Math.round(current).toLocaleString()}${suffix}`);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

export function OverviewStats({ isDemoMode }: { isDemoMode: boolean }) {
    const [stats, setStats] = useState({
        activeValue: 1250000,
        responsiveness: 92,
        throughput: 12500,
        proofs: 12
    });

    useEffect(() => {
        if (!isDemoMode) return;
        const interval = setInterval(() => {
            setStats(prev => ({
                activeValue: prev.activeValue + Math.floor(Math.random() * 10000) - 5000,
                responsiveness: Math.min(100, Math.max(0, prev.responsiveness + Math.floor(Math.random() * 5) - 2)),
                throughput: prev.throughput + Math.floor(Math.random() * 100),
                proofs: prev.proofs + (Math.random() > 0.8 ? 1 : 0)
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, [isDemoMode]);

	const items = [
		{
			label: "Active Production Value",
			value: stats.activeValue,
            prefix: "$",
			subtext: "▲ 2 New Orders",
			icon: Activity,
			color: "text-neon-green",
			href: "/orders",
            visual: "sparkline"
		},
		{
			label: "Factory Responsiveness",
			value: stats.responsiveness,
            suffix: "%",
            subtext: "3 Factories typing...",
			icon: Layers,
			color: "text-neon-cyan",
			href: "/orders?risk=high",
            visual: "pulse"
		},
		{
			label: "Today's Throughput",
			value: stats.throughput,
            suffix: " pcs",
            subtext: "Cutting Reports Incoming",
			icon: FileCheck,
			color: "text-white",
			href: "/orders?status=critical",
            visual: "progress"
		},
		{
			label: "Proofs to Approve",
			value: stats.proofs,
			subtext: "12 Pending Review",
			icon: AlertTriangle,
			color: "text-neon-red",
			href: "/inbox",
            visual: "alert"
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{items.map((stat, i) => {
				const Icon = stat.icon;
				return (
					<Link key={i} href={stat.href || "#"}>
						<GlassCard className="p-6 hover:bg-white/5 transition-colors cursor-pointer group relative overflow-hidden">
                            {/* Background Effect based on visual */}
                            {stat.visual === 'sparkline' && (
                                <svg className="absolute bottom-0 left-0 w-full h-16 opacity-10 text-neon-green" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0 10 Q 25 15 50 5 T 100 10 V 20 H 0 Z" fill="currentColor" />
                                    <path d="M0 10 Q 25 15 50 5 T 100 10" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            )}

							<div className="flex items-start justify-between relative z-10">
								<div>
									<p className="text-sm font-medium text-gray-400">
										{stat.label}
									</p>
									<div className="mt-2 flex items-baseline gap-2">
										<span
											className={`text-2xl font-bold tracking-tight ${stat.color}`}
										>
											<NumberTicker value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
										</span>
									</div>
                                    <div className="mt-1 flex items-center gap-2">
                                        {stat.visual === 'pulse' && (
                                            <span className="relative flex h-2 w-2">
                                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                                              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                                            </span>
                                        )}
                                        <span className="text-xs font-medium text-gray-500">
                                            {stat.subtext}
                                        </span>
                                    </div>
								</div>
								<div
									className={`p-3 rounded-xl bg-white/5 ring-1 ring-white/10 group-hover:ring-neon-cyan/50 transition-all`}
								>
									<Icon className={`w-6 h-6 ${stat.color}`} />
								</div>
							</div>
						</GlassCard>
					</Link>
				);
			})}
		</div>
	);
}
