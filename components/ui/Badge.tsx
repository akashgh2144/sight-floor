import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "neon";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-gray-500/10 border-gray-500/20 text-gray-400",
    success: "bg-neon-green/10 border-neon-green/20 text-neon-green",
    warning: "bg-neon-amber/10 border-neon-amber/20 text-neon-amber",
    danger: "bg-neon-red/10 border-neon-red/20 text-neon-red",
    neon: "bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan",
  };

  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wider",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

