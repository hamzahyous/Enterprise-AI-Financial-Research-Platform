import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import { Search, Sparkles, ChevronRight } from "lucide-react";
import { recentReports } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";

export const Route = createFileRoute("/_app/reports/")({
  component: ReportHistory,
});

function ReportHistory() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "running" | "failed">("all");

  const rows = useMemo(
    () =>
      recentReports.filter((r) => {
        const matchesQ =
          !q ||
          r.title.toLowerCase().includes(q.toLowerCase()) ||
          r.tickers.some((t) => t.toLowerCase().includes(q.toLowerCase()));
        const matchesF = filter === "all" || r.status === filter;
        return matchesQ && matchesF;
      }),
    [q, filter],
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Report history</h1>
          <p className="text-muted-foreground mt-1">All research runs across your workspace.</p>
        </div>
        <Button asChild className="shadow-glow">
          <Link to="/research/new">
            <Sparkles className="h-4 w-4 mr-2" /> New research
          </Link>
        </Button>
      </div>

      <Card className="bg-gradient-card border-border/60 overflow-hidden">
        <div className="p-4 flex flex-wrap items-center gap-3 border-b border-border/60">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title or ticker…"
              className="pl-9 bg-background/60"
            />
          </div>
          <div className="flex gap-1 rounded-lg border border-border/60 p-1 bg-background/40">
            {(["all", "completed", "running", "failed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs px-3 py-1.5 rounded-md transition-colors capitalize ${
                  filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground bg-muted/20">
                <th className="text-left font-medium px-6 py-3">Title</th>
                <th className="text-left font-medium px-3 py-3">Tickers</th>
                <th className="text-left font-medium px-3 py-3">Depth</th>
                <th className="text-left font-medium px-3 py-3">Date</th>
                <th className="text-left font-medium px-3 py-3">Confidence</th>
                <th className="text-left font-medium px-3 py-3">Status</th>
                <th className="px-3 py-3 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-6 py-4">
                    <Link
                      to="/reports/$reportId"
                      params={{ reportId: r.id }}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {r.title}
                    </Link>
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{r.id}</p>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex flex-wrap gap-1">
                      {r.tickers.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <Badge variant="outline" className="text-xs">{r.depth}</Badge>
                  </td>
                  <td className="px-3 py-4 text-muted-foreground text-xs font-mono">{r.createdAt}</td>
                  <td className="px-3 py-4 font-mono text-xs">
                    {r.confidence > 0 ? `${r.confidence}%` : "—"}
                  </td>
                  <td className="px-3 py-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-3 py-4">
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-sm text-muted-foreground">
                    No reports match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
