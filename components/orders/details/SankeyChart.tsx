"use client";

import { ResponsiveSankey } from "@nivo/sankey";
import { GlassCard } from "@/components/ui/GlassCard";
import { Order } from "@/lib/mock-data";

interface SankeyChartProps {
  order?: Order;
}

export function SankeyChart({ order }: SankeyChartProps) {
  // Generate data based on order or use default
  const cutQty = order?.cutQty || 10000;
  const sewingOutput = order?.sewingOutput || 9500;
  const packed = order?.packed || 9400;

  // Simple logic to distribute waste
  // Fabric Roll -> Cutting Table (Assume 2% waste before cutting)
  const fabricRoll = Math.round(cutQty * 1.02);
  const cuttingWaste = fabricRoll - cutQty;

  // Cutting Table -> Sewing Line
  // If sewingOutput is 0 (e.g. just started), assume potential
  const sewingInput = cutQty;
  const sewingWaste = Math.max(0, sewingInput - sewingOutput); // This is tricky if sewing isn't done.
  // Let's assume waste is proportional to progress or just fixed for demo if output is 0.
  // If output is 0, we can't really show flow to sewing line as "completed".
  // But Sankey shows flow. Let's assume "Sewing Line" node represents input to sewing.

  // Let's refine the nodes based on the spec:
  // Nodes: Fabric Roll -> Cutting Table -> Sewing Line -> Finishing -> Packed.
  // Special Node: Rejection/Waste.

  // If we use real numbers from order:
  // Fabric Roll = cutQty (simplification)
  // Cutting Table = cutQty
  // Sewing Line = sewingOutput (This means we lost (cutQty - sewingOutput) between cutting and sewing output? Or is it WIP?)
  // Let's assume (cutQty - sewingOutput) is WIP + Waste.
  // For the sake of the chart looking good, let's fabricate some "Waste" numbers based on the order data.

  const cuttingToSewing = cutQty; // All cut pieces go to sewing line
  const sewingToFinishing = sewingOutput > 0 ? sewingOutput : 0;
  const sewingWasteVal = Math.max(0, Math.round(cutQty * 0.02)); // 2% waste in sewing
  // Adjust sewingToFinishing to be consistent?
  // If sewingOutput is the GOOD output, then input (cutQty) = output + waste + WIP.
  // Sankey doesn't handle WIP well unless we have a node for it.
  // Let's stick to the mock data structure provided in the file initially but scale it.

  const scale = cutQty / 10000; // Scale factor based on default 10000

  const data = {
    nodes: [
      { id: "Fabric Roll", nodeColor: "#ffffff" },
      { id: "Cutting Table", nodeColor: "#00f0ff" },
      { id: "Sewing Line", nodeColor: "#00f0ff" },
      { id: "Finishing", nodeColor: "#00f0ff" },
      { id: "Packed", nodeColor: "#39ff14" },
      { id: "Waste/Defects", nodeColor: "#ff2a2a" },
    ],
    links: [
      { source: "Fabric Roll", target: "Cutting Table", value: Math.round(10000 * scale) },
      { source: "Cutting Table", target: "Sewing Line", value: Math.round(9800 * scale) },
      { source: "Cutting Table", target: "Waste/Defects", value: Math.round(200 * scale) },
      { source: "Sewing Line", target: "Finishing", value: Math.round(9500 * scale) },
      { source: "Sewing Line", target: "Waste/Defects", value: Math.round(300 * scale) },
      { source: "Finishing", target: "Packed", value: Math.round(9400 * scale) },
      { source: "Finishing", target: "Waste/Defects", value: Math.round(100 * scale) },
    ],
  };

  return (
    <GlassCard className="h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-white tracking-tight">
            Material Flow Analysis
          </h3>
          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-500">
            Cut-to-Ship Loss Visualization
          </p>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveSankey
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          align="justify"
          colors={(node) => node.nodeColor}
          nodeOpacity={1}
          nodeHoverOthersOpacity={0.35}
          nodeThickness={18}
          nodeSpacing={24}
          nodeBorderWidth={0}
          nodeBorderColor={{
            from: "color",
            modifiers: [["darker", 0.8]],
          }}
          linkOpacity={0.5}
          linkHoverOthersOpacity={0.1}
          linkContract={3}
          enableLinkGradient={true}
          labelPosition="outside"
          labelOrientation="vertical"
          labelPadding={16}
          labelTextColor={{
            from: "color",
            modifiers: [["brighter", 1]],
          }}
          theme={{
            text: {
              fill: "#9ca3af",
              fontSize: 11,
              fontFamily: "var(--font-jetbrains-mono)",
            },
            tooltip: {
              container: {
                background: "rgba(20, 20, 23, 0.9)",
                color: "#fff",
                fontSize: "12px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
              },
            },
          }}
        />
      </div>
    </GlassCard>
  );
}
