import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  FileText,
  Database,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { recentReports, stats } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const statCards = [
    { label: "Reports generated", value: stats.reportsGenerated.toLocaleString(), delta: "+12.4%", icon: FileText },
    { label: "Documents indexed", value: stats.documentsIndexed.toLocaleString(), delta: "+3.1K today", icon: Database },
    { label: "Evaluation score", value: stats.evaluationScore.toFixed(1), delta: "+1.8 pts", icon: ShieldCheck },
    { label: "Avg confidence", value: `${stats.avgConfidence}%`, delta: "Stable", icon: TrendingUp },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Good morning, Alex</h1>
          <p className="text-muted-foreground mt-1">Here's what's moving in your coverage today.</p>
        </div>
        <Button asChild className="shadow-glow">
          <Link to="/research/new">
            <Sparkles className="h-4 w-4 mr-2" /> New research
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Card key={s.label} className="p-5 bg-gradient-card border-border/60">
            <div className="flex items-start justify-between">
              <div className="h-9 w-9 rounded-lg bg-gradient-accent-soft border border-border/60 flex items-center justify-center">
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-success">{s.delta}</span>
            </div>
            <p className="mt-4 text-2xl font-semibold tracking-tight">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Quick query + recent */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-6 bg-gradient-card border-border/60">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="font-semibold">Quick research</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Ask anything — Lumen will route across filings, transcripts, metrics, and news.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="e.g. Compare NVDA and AMD AI accelerator economics for FY26"
              className="h-11 bg-background/60"
            />
            <Button size="lg" asChild>
              <Link to="/research/new">
                Run <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Bull case for $MSFT", "$TSLA FSD monetization", "$LLY GLP-1 supply"].map((s) => (
              <Badge
                key={s}
                variant="outline"
                className="text-xs cursor-pointer hover:border-primary/60 transition-colors"
              >
                {s}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/60">
          <h2 className="font-semibold mb-1">Coverage health</h2>
          <p className="text-xs text-muted-foreground mb-5">Last 7 days</p>
          <div className="space-y-4">
            {[
              ["Faithfulness", 94],
              ["Citation density", 88],
              ["Source coverage", 91],
            ].map(([l, v]) => (
              <div key={l as string}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">{l}</span>
                  <span className="font-mono">{v}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-primary" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent reports */}
      <Card className="bg-gradient-card border-border/60 overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-border/60">
          <div>
            <h2 className="font-semibold">Recent reports</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Your team's last 7 runs</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/reports">
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="divide-y divide-border/60">
          {recentReports.slice(0, 5).map((r) => (
            <Link
              key={r.id}
              to="/reports/$reportId"
              params={{ reportId: r.id }}
              className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors"
            >
              <div className="h-9 w-9 rounded-lg bg-muted/50 border border-border/60 flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{r.title}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {r.tickers.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{r.depth}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{r.createdAt}</span>
                </div>
              </div>
              <StatusBadge status={r.status} />
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
