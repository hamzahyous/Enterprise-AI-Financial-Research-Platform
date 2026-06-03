import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Download,
  Share2,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  FileText,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import { sampleCitations, competitorRows } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/reports/$reportId")({
  component: ReportResults,
});

function ReportResults() {
  const { reportId } = Route.useParams();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-3 -ml-3">
            <Link to="/reports">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to reports
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="secondary" className="font-mono">NVDA</Badge>
            <Badge variant="secondary" className="font-mono">AMD</Badge>
            <Badge variant="outline">Deep</Badge>
            <Badge className="bg-success/15 text-success border-success/30 border" variant="outline">
              Completed
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-3xl">
            NVIDIA AI accelerator moat vs AMD MI300 — FY26 outlook
          </h1>
          <p className="text-xs text-muted-foreground mt-2 font-mono">
            {reportId} · Generated May 24, 2026 · 3m 42s · 142 citations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export PDF
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Executive summary */}
          <Card className="p-6 bg-gradient-card border-border/60">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Executive summary</h2>
            </div>
            <div className="prose prose-sm prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                NVIDIA's data-center franchise enters FY26 with a structural advantage that is narrower than
                consensus implies but still durable. Blackwell ramp combined with CUDA lock-in supports
                gross margins above 73% through 1H FY26 <sup className="text-primary">[1][2]</sup>, while
                AMD's MI300X is closing the raw-FLOPs gap but remains software-constrained at hyperscaler
                deployment <sup className="text-primary">[3]</sup>.
              </p>
              <p className="mt-3">
                We see three durable advantages: (1) CoWoS packaging allocation through 2026
                <sup className="text-primary">[5]</sup>, (2) NVLink/InfiniBand systems integration, and
                (3) developer mindshare. Risks: ASIC competition (Trainium, TPU), customer concentration
                (top 4 = 46% of DC revenue), and China export restrictions.
              </p>
            </div>
          </Card>

          {/* Financial trends */}
          <Card className="p-6 bg-gradient-card border-border/60">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Financial trends</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                ["DC revenue YoY", "+217%", "up"],
                ["Non-GAAP GM", "76.7%", "up"],
                ["Op margin", "61.9%", "flat"],
              ].map(([l, v, dir]) => (
                <div key={l} className="rounded-xl border border-border/60 bg-background/40 p-4">
                  <p className="text-xs text-muted-foreground">{l}</p>
                  <p className="text-2xl font-semibold mt-1">{v}</p>
                  <p className={`text-xs mt-1 ${dir === "up" ? "text-success" : "text-muted-foreground"}`}>
                    {dir === "up" ? "↗ Above consensus" : "→ In line"}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 h-32 rounded-xl bg-gradient-accent-soft border border-border/60 flex items-end gap-1 p-4">
              {[40, 52, 48, 65, 78, 82, 88, 94, 100, 96, 110, 124].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-primary opacity-80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </Card>

          {/* Bull / Bear */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-card border-border/60 border-l-4 border-l-success">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-success" />
                <h3 className="font-semibold">Bull case</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Blackwell allocation booked into 2H 2026 <sup className="text-primary">[2]</sup></li>
                <li>• Sovereign AI TAM &gt; $50B by 2027</li>
                <li>• Networking attach (Spectrum-X) accretive to GM</li>
                <li>• CUDA developer base ~5M, growing 40% YoY</li>
              </ul>
            </Card>
            <Card className="p-6 bg-gradient-card border-border/60 border-l-4 border-l-destructive">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <h3 className="font-semibold">Bear case</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Hyperscaler in-house silicon (TPU v6, Trainium2)</li>
                <li>• MI325X price/perf approaching parity <sup className="text-primary">[3]</sup></li>
                <li>• Inference workload commoditization risk</li>
                <li>• Customer concentration: top 4 = 46% of DC</li>
              </ul>
            </Card>
          </div>

          {/* Competitor table */}
          <Card className="p-6 bg-gradient-card border-border/60">
            <h2 className="font-semibold mb-4">Competitor comparison</h2>
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="text-left font-medium py-2">Metric</th>
                    <th className="text-right font-medium py-2 font-mono">NVDA</th>
                    <th className="text-right font-medium py-2 font-mono">AMD</th>
                    <th className="text-right font-medium py-2 font-mono">MSFT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {competitorRows.map((r) => (
                    <tr key={r.metric}>
                      <td className="py-3 text-muted-foreground">{r.metric}</td>
                      <td className="text-right font-mono py-3">{r.a}</td>
                      <td className="text-right font-mono py-3">{r.b}</td>
                      <td className="text-right font-mono py-3">{r.c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          {/* Evaluation */}
          <Card className="p-6 bg-gradient-card border-border/60">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <h2 className="font-semibold">Evaluation</h2>
              </div>
              <Badge variant="outline" className="bg-success/15 text-success border-success/30">
                Passed
              </Badge>
            </div>
            <div className="text-center py-4 border-b border-border/60">
              <p className="text-4xl font-semibold text-gradient">94%</p>
              <p className="text-xs text-muted-foreground mt-1">Confidence score</p>
            </div>
            <div className="space-y-4 mt-5">
              {[
                ["Faithfulness", 96],
                ["Answer relevance", 93],
                ["Context precision", 89],
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
            <div className="mt-5 pt-5 border-t border-border/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Citations</span>
                <span className="font-mono">142</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <AlertTriangle className="h-3 w-3 text-warning" /> Unsupported claims
                </span>
                <span className="font-mono">2</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Source diversity</span>
                <span className="font-mono">High</span>
              </div>
            </div>
          </Card>

          {/* Citations */}
          <Card className="p-6 bg-gradient-card border-border/60">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-primary" />
              <h2 className="font-semibold">Citations</h2>
            </div>
            <div className="space-y-3">
              {sampleCitations.map((c) => (
                <div
                  key={c.id}
                  className="rounded-lg border border-border/60 bg-background/40 p-3 hover:border-primary/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono text-primary">[{c.id}]</span>
                    <Badge variant="outline" className="text-[10px] py-0 h-4">
                      {c.type}
                    </Badge>
                  </div>
                  <p className="text-xs font-medium">{c.source}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                    "{c.excerpt}"
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1.5 font-mono">{c.date}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
