import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Sparkles,
  FileText,
  Mic,
  BarChart3,
  Newspaper,
  X,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/_app/research/new")({
  component: NewResearch,
});

const DEPTHS = [
  { id: "Basic", desc: "Quick scan · ~30s · 1 filing", time: "30s" },
  { id: "Standard", desc: "Balanced report · ~90s · 5 sources", time: "90s" },
  { id: "Deep", desc: "Comprehensive · ~4m · 20+ sources", time: "4m" },
] as const;

const SOURCES = [
  { id: "sec", label: "SEC filings", desc: "10-K, 10-Q, 8-K, proxies", icon: FileText },
  { id: "transcripts", label: "Earnings transcripts", desc: "Last 8 quarters", icon: Mic },
  { id: "metrics", label: "Financial metrics", desc: "Fundamentals, ratios", icon: BarChart3 },
  { id: "news", label: "News", desc: "Reuters, WSJ, FT", icon: Newspaper },
];

function NewResearch() {
  const nav = useNavigate();
  const [depth, setDepth] = useState<"Basic" | "Standard" | "Deep">("Standard");
  const [sources, setSources] = useState<string[]>(["sec", "transcripts", "metrics"]);
  const [tickers, setTickers] = useState<string[]>(["NVDA", "AMD"]);
  const [tickerInput, setTickerInput] = useState("");

  const toggleSource = (id: string) =>
    setSources((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const addTicker = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tickerInput.trim()) {
      e.preventDefault();
      const t = tickerInput.trim().toUpperCase();
      if (!tickers.includes(t)) setTickers([...tickers, t]);
      setTickerInput("");
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 text-xs text-primary mb-3">
          <Sparkles className="h-3 w-3" /> New research
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">What do you want to know?</h1>
        <p className="text-muted-foreground mt-1">
          Be specific. Lumen routes your query across the sources you select.
        </p>
      </div>

      <Card className="p-6 bg-gradient-card border-border/60 space-y-6">
        <div>
          <Label htmlFor="query" className="text-xs uppercase tracking-wider text-muted-foreground">
            Research query
          </Label>
          <Textarea
            id="query"
            placeholder="e.g. How durable is NVIDIA's data-center moat versus AMD's MI300 ramp through FY26? Include pricing power, capacity constraints, and customer concentration risk."
            className="mt-2 min-h-[140px] bg-background/60 resize-none text-base"
            defaultValue="How durable is NVIDIA's data-center moat versus AMD's MI300 ramp through FY26? Include pricing power, capacity constraints, and customer concentration risk."
          />
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Company tickers
          </Label>
          <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg border border-border/60 bg-background/60 p-2 min-h-11">
            {tickers.map((t) => (
              <Badge key={t} variant="secondary" className="font-mono gap-1 px-2 py-1">
                {t}
                <button onClick={() => setTickers(tickers.filter((x) => x !== t))}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Input
              value={tickerInput}
              onChange={(e) => setTickerInput(e.target.value)}
              onKeyDown={addTicker}
              placeholder="Add ticker…"
              className="flex-1 min-w-[120px] border-0 bg-transparent h-7 p-0 focus-visible:ring-0 shadow-none"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Research depth
          </Label>
          <div className="mt-2 grid sm:grid-cols-3 gap-2">
            {DEPTHS.map((d) => (
              <button
                key={d.id}
                onClick={() => setDepth(d.id)}
                className={`text-left rounded-xl border p-4 transition-all ${
                  depth === d.id
                    ? "border-primary bg-gradient-accent-soft shadow-glow"
                    : "border-border/60 hover:border-border bg-background/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{d.id}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">~{d.time}</span>
                </div>
                <p className="text-xs text-muted-foreground">{d.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">
            Sources
          </Label>
          <div className="mt-2 grid sm:grid-cols-2 gap-2">
            {SOURCES.map((s) => {
              const active = sources.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSource(s.id)}
                  className={`flex items-center gap-3 text-left rounded-xl border p-3 transition-all ${
                    active
                      ? "border-primary/60 bg-gradient-accent-soft"
                      : "border-border/60 hover:border-border bg-background/40"
                  }`}
                >
                  <div
                    className={`h-9 w-9 rounded-lg flex items-center justify-center border ${
                      active ? "bg-primary/15 border-primary/40 text-primary" : "bg-muted/40 border-border/60 text-muted-foreground"
                    }`}
                  >
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{s.desc}</p>
                  </div>
                  <div
                    className={`h-4 w-4 rounded border ${
                      active ? "bg-primary border-primary" : "border-border"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/60">
          <p className="text-xs text-muted-foreground">
            Estimated runtime <span className="font-mono text-foreground">~{DEPTHS.find((d) => d.id === depth)?.time}</span>
            {" · "}{sources.length} sources
          </p>
          <Button
            size="lg"
            className="shadow-glow"
            onClick={() => nav({ to: "/reports/$reportId", params: { reportId: "rpt_001" } })}
          >
            Run research <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
