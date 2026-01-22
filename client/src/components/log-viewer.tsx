import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "success" | "warning" | "error";
  message: string;
  details?: string;
}

const MOCK_LOGS: LogEntry[] = [
  { id: "1", timestamp: "09:00:01", level: "info", message: "Workflow started via Cron trigger", details: "Schedule: Daily 09:00 PST" },
  { id: "2", timestamp: "09:00:05", level: "info", message: "RSS Feed Fetched", details: "Found 14 items from Google News" },
  { id: "3", timestamp: "09:00:06", level: "info", message: "Date Filter Applied", details: "10 items discarded (>24h old)" },
  { id: "4", timestamp: "09:00:07", level: "info", message: "Deduplication Check", details: "3 items previously processed. 1 candidate remaining." },
  { id: "5", timestamp: "09:00:08", level: "info", message: "Processing Item", details: "Title: 'New Study Shows Benefits of Mindfulness for Stress'" },
  { id: "6", timestamp: "09:00:15", level: "info", message: "AI Content Generation", details: "Model: GPT-4o-mini" },
  { id: "7", timestamp: "09:00:18", level: "success", message: "Caption Generated", details: "Length: 1,450 chars (Safe)" },
  { id: "8", timestamp: "09:00:19", level: "success", message: "Safety Checks Passed", details: "No forbidden medical claims found." },
  { id: "9", timestamp: "09:00:20", level: "info", message: "Updating Audit Log", details: "Google Doc ID: 1xA...7bK" },
];

export function LogViewer() {
  return (
    <div className="bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 font-mono text-sm h-[400px] flex flex-col">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
          </div>
          <span className="ml-3 text-slate-400 text-xs">system_output.log</span>
        </div>
        <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700 h-5 text-[10px] px-2">
          LIVE
        </Badge>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {MOCK_LOGS.map((log) => (
            <div key={log.id} className="group flex gap-3 hover:bg-slate-900/50 -mx-2 px-2 py-1 rounded transition-colors">
              <span className="text-slate-500 shrink-0 w-20">{log.timestamp}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "uppercase text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded shrink-0 w-16 text-center",
                    log.level === "info" && "bg-blue-500/10 text-blue-400",
                    log.level === "success" && "bg-emerald-500/10 text-emerald-400",
                    log.level === "warning" && "bg-amber-500/10 text-amber-400",
                    log.level === "error" && "bg-red-500/10 text-red-400",
                  )}>
                    {log.level}
                  </span>
                  <span className="text-slate-300 font-medium truncate">{log.message}</span>
                </div>
                {log.details && (
                  <p className="text-slate-500 mt-1 pl-[76px] text-xs font-mono">{log.details}</p>
                )}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 animate-pulse pl-[104px] pt-2">
            <span className="h-4 w-2 bg-emerald-500/50 block" />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}