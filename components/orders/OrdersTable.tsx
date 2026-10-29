"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { MOCK_ORDERS, type Order } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { Factory, Edit, Trash2, MessageCircle, Check, CheckCheck, AlertCircle, Clock } from "lucide-react";
import Link from "next/link";

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("lastCommunication", {
    header: "Last Communication",
    cell: (info) => {
      const comm = info.getValue();
      if (!comm) return <span className="text-gray-500">-</span>;

      let icon;
      let colorClass;

      switch (comm.status) {
        case "replied":
          icon = <MessageCircle className="w-4 h-4" />;
          colorClass = "text-neon-green";
          break;
        case "read":
          icon = <CheckCheck className="w-4 h-4" />;
          colorClass = "text-neon-cyan";
          break;
        case "delivered":
          icon = <CheckCheck className="w-4 h-4" />;
          colorClass = "text-gray-400";
          break;
        case "sent":
          icon = <Check className="w-4 h-4" />;
          colorClass = "text-gray-500";
          break;
        case "failed":
          icon = <AlertCircle className="w-4 h-4" />;
          colorClass = "text-neon-red";
          break;
        default:
          icon = <Clock className="w-4 h-4" />;
          colorClass = "text-gray-500";
      }

      return (
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-full bg-white/5", colorClass)}>
            {icon}
          </div>
          <div className="flex flex-col">
            <span className={cn("text-xs font-medium", colorClass)}>
              {comm.text}
            </span>
            <span className="text-[10px] text-gray-500">{comm.timestamp}</span>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("style", {
    header: "Style / Buyer",
    cell: (info) => (
      <div className="flex flex-col">
        <span className="font-bold text-white">{info.getValue()}</span>
        <span className="text-xs text-gray-400">{info.row.original.buyer}</span>
      </div>
    ),
  }),
  columnHelper.accessor("factory", {
    header: "Factory",
    cell: (info) => (
      <Link
        href="#"
        className="flex items-center gap-2 text-neon-cyan hover:text-white transition-colors"
      >
        <Factory className="w-4 h-4" />
        <span>{info.getValue().name}</span>
      </Link>
    ),
  }),
  columnHelper.accessor("currentStep", {
    header: "Current Step",
    cell: (info) => {
      const isDelayed = info.row.original.isDelayed;
      return (
        <div className="flex flex-col gap-1">
          <span className="text-white text-sm">{info.getValue()}</span>
          <span
            className={cn(
              "text-[10px] uppercase tracking-wider font-bold w-fit px-1.5 py-0.5 rounded",
              isDelayed
                ? "bg-neon-red/10 text-neon-red border border-neon-red/20"
                : "bg-neon-amber/10 text-neon-amber border border-neon-amber/20"
            )}
          >
            {isDelayed ? "Overdue" : "Due Today"}
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor("shipDate", {
    header: "Ship Date",
    cell: (info) => (
      <span className="font-mono text-gray-300">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("progress", {
    header: "Progress",
    cell: (info) => {
      const value = info.getValue();
      return (
        <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-neon-cyan rounded-full transition-all duration-500"
            style={{ width: `${value}%` }}
          />
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded hover:bg-neon-cyan/20 transition-colors text-xs font-medium">
          View
        </button>
        <button className="px-3 py-1.5 bg-white/5 text-gray-300 border border-white/10 rounded hover:bg-white/10 transition-colors text-xs font-medium flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          Nudge
        </button>
      </div>
    ),
  }),
];

export function OrdersTable() {
  const router = useRouter();
  const table = useReactTable({
    data: MOCK_ORDERS,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <GlassCard className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-glass-edge bg-white/5">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-[10px] uppercase tracking-wider font-bold text-gray-500 font-sans"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => router.push(`/orders/${row.original.id}`)}
                className="border-b border-glass-edge/50 hover:bg-white/5 transition-colors cursor-pointer group h-10"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-xs">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
