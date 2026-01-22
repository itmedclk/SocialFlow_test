import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, AlertCircle, XCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProps {
  label: string;
  status: "pending" | "active" | "completed" | "error";
  description?: string;
  index: number;
}

export function PipelineVisualizer() {
  const steps: StepProps[] = [
    { label: "Cron Trigger", status: "completed", description: "09:00 PST", index: 0 },
    { label: "RSS Feed", status: "completed", description: "Google News", index: 1 },
    { label: "Dedupe Filter", status: "completed", description: "1 New Item", index: 2 },
    { label: "AI Generation", status: "completed", description: "Caption & Tags", index: 3 },
    { label: "Safety Check", status: "completed", description: "Claims & Len", index: 4 },
    { label: "Docs Audit", status: "active", description: "Updating...", index: 5 },
    { label: "Image Search", status: "pending", description: "Wikimedia", index: 6 },
    { label: "Postly Sched", status: "pending", description: "11:00 PST", index: 7 },
  ];

  return (
    <div className="w-full overflow-x-auto pb-6 -mx-6 px-6 md:mx-0 md:px-0">
      <div className="min-w-max flex items-center gap-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative group flex flex-col items-center justify-center w-40 h-32 rounded-2xl border-2 transition-all duration-300",
                step.status === "active" && "bg-primary/5 border-primary shadow-[0_0_20px_-5px_var(--color-primary)] scale-105",
                step.status === "completed" && "bg-card border-primary/20",
                step.status === "pending" && "bg-muted/30 border-muted-foreground/10 opacity-60",
                step.status === "error" && "bg-destructive/5 border-destructive shadow-[0_0_20px_-5px_var(--color-destructive)]"
              )}
            >
              {step.status === "active" && (
                <span className="absolute -top-3 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full tracking-wider uppercase shadow-md animate-pulse">
                  Processing
                </span>
              )}
              
              <div className="mb-3">
                {step.status === "completed" && <CheckCircle2 className="h-8 w-8 text-primary" />}
                {step.status === "active" && <ActivityIcon />}
                {step.status === "pending" && <Circle className="h-8 w-8 text-muted-foreground" />}
                {step.status === "error" && <XCircle className="h-8 w-8 text-destructive" />}
              </div>

              <div className="text-center">
                <p className={cn(
                  "font-bold text-sm",
                  step.status === "active" ? "text-primary" : "text-foreground"
                )}>
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1 font-medium">{step.description}</p>
              </div>
            </motion.div>
            
            {i < steps.length - 1 && (
              <div className="w-8 flex justify-center">
                <ArrowRight className={cn(
                  "h-5 w-5",
                  step.status === "completed" ? "text-primary/50" : "text-muted-foreground/20"
                )} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityIcon() {
  return (
    <div className="relative h-8 w-8 flex items-center justify-center">
      <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping" />
      <div className="absolute inset-0 border-2 border-primary rounded-full animate-spin border-t-transparent" />
    </div>
  );
}