import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-5 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-glass-highlight",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

