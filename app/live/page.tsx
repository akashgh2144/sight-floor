import { TerminalFeed } from "@/components/live/TerminalFeed";

export default function LivePage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Live Matrix
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Real-time floor operations feed
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <TerminalFeed />
      </div>
    </div>
  );
}

