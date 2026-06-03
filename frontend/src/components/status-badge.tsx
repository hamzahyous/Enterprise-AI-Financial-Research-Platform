import { Badge } from "@/components/ui/badge";
import type { ReportStatus } from "@/lib/mock-data";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export function StatusBadge({ status }: { status: ReportStatus }) {
  const map = {
    completed: { label: "Completed", cls: "bg-success/15 text-success border-success/30", Icon: CheckCircle2 },
    running: { label: "Running", cls: "bg-accent/15 text-accent border-accent/30", Icon: Loader2 },
    failed: { label: "Failed", cls: "bg-destructive/15 text-destructive border-destructive/30", Icon: XCircle },
  }[status];
  const { Icon } = map;
  return (
    <Badge variant="outline" className={`${map.cls} gap-1 font-medium`}>
      <Icon className={`h-3 w-3 ${status === "running" ? "animate-spin" : ""}`} />
      {map.label}
    </Badge>
  );
}
