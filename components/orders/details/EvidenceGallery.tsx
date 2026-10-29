import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Scan } from "lucide-react";

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=600&auto=format&fit=crop", label: "Line 4 Output", count: 52 },
  { id: 2, src: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop", label: "QC Station B", count: 12 },
  { id: 3, src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop", label: "Cutting Table 2", count: 150 },
  { id: 4, src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop", label: "Packing Zone", count: 45 },
];

export function EvidenceGallery() {
  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight">
            Evidence Gallery
          </h3>
          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500">
            AI Visual Verification
          </p>
        </div>
        <Badge variant="neon">Live Feed</Badge>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group min-h-0 rounded-lg overflow-hidden border border-glass-edge">
            {/* Image */}
            <img
              src={img.src}
              alt={img.label}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
            />

            {/* AI Overlay Box */}
            <div className="absolute inset-4 border-2 border-neon-green/50 shadow-[0_0_20px_rgba(57,255,20,0.2)] flex items-start justify-start">
                <div className="bg-neon-green/90 text-black text-[10px] font-bold px-1.5 py-0.5">
                    COUNT: {img.count}
                </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                    <Scan className="w-3 h-3 text-neon-cyan" />
                    <span className="text-xs font-mono text-white">{img.label}</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
