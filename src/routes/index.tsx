import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BrainCircuit,
  FileSearch,
  Quote,
  ShieldCheck,
  GitCompareArrows,
  TrendingUp,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — Enterprise AI Financial Research" },
      {
        name: "description",
        content:
          "Citation-grounded AI research reports on public equities. SEC filings, transcripts, and metrics—evaluated for hallucinations.",
      },
      { property: "og:title", content: "Lumen — Enterprise AI Financial Research" },
      {
        property: "og:description",
        content:
          "Citation-grounded AI research reports on public equities, evaluated for hallucinations.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: BrainCircuit,
    title: "AI research reports",
    desc: "Generate institutional-grade equity research in minutes, not weeks. Bull/bear theses, financial trends, and scenario analysis.",
  },
  {
    icon: FileSearch,
    title: "SEC filing retrieval",
    desc: "Indexed 10-Ks, 10-Qs, 8-Ks, proxies, and S-1s. Semantic + structured retrieval across the full EDGAR corpus.",
  },
  {
    icon: Quote,
    title: "Citation-grounded answers",
    desc: "Every claim links back to the source paragraph. No floating numbers, no untraceable assertions.",
  },
  {
    icon: ShieldCheck,
    title: "Hallucination evaluation",
    desc: "Each report ships with a confidence score, unsupported-claim count, and source coverage analytics.",
  },
  {
    icon: GitCompareArrows,
    title: "Competitor comparison",
    desc: "Side-by-side fundamentals, margins, capital structure, and qualitative positioning across peers.",
  },
  {
    icon: TrendingUp,
    title: "Financial trend analysis",
    desc: "Multi-year segment, margin, and capital-allocation deltas auto-extracted from filings.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <TrendingUp className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">Lumen Research</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#trust" className="hover:text-foreground transition-colors">Evaluation</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Enterprise</a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/research/new">Start analysis</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 [background-image:linear-gradient(oklch(0.2_0.02_250/0.4)_1px,transparent_1px),linear-gradient(90deg,oklch(0.2_0.02_250/0.4)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur mb-8">
            <Sparkles className="h-3 w-3 text-primary" />
            New: Blackwell-era earnings call coverage live
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] max-w-4xl mx-auto">
            Institutional-grade research,
            <br />
            <span className="text-gradient">grounded in every filing.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Lumen turns SEC filings, earnings transcripts, and financial metrics into auditable research reports —
            with citation-level grounding and a per-report hallucination score.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild className="shadow-glow">
              <Link to="/research/new">
                Start analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/dashboard">View dashboard</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              ["480K+", "SEC documents indexed"],
              ["92.4", "Avg. faithfulness score"],
              ["1,200+", "Tickers covered"],
              ["< 90s", "Median report time"],
            ].map(([v, l]) => (
              <div key={l} className="text-left md:text-center">
                <div className="text-2xl font-semibold text-gradient">{v}</div>
                <div className="text-xs text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-primary mb-3">Platform</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              An analyst's workbench, rebuilt on retrieval-grounded AI.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every output is traceable to a source document. Every report ships with an evaluation panel.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-border/60 bg-gradient-card p-6 hover:border-primary/40 transition-all hover:shadow-elegant"
              >
                <div className="h-10 w-10 rounded-lg bg-gradient-accent-soft border border-border/60 flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="py-24 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary mb-3">Evaluation</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Built for compliance teams, not just analysts.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Faithfulness, answer relevance, context precision, and unsupported-claim detection run on every report.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Per-claim citation lineage",
                "Confidence score with breakdown",
                "Unsupported-claim flagging",
                "Source coverage report",
                "Versioned, auditable runs",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border/60 bg-gradient-card p-6 shadow-elegant">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-muted-foreground">Report evaluation</p>
                <p className="font-semibold">NVDA vs AMD — Deep</p>
              </div>
              <span className="text-xs rounded-full bg-success/15 text-success px-2 py-0.5 border border-success/30">
                Passed
              </span>
            </div>
            <div className="space-y-5">
              {[
                ["Faithfulness", 96],
                ["Answer relevance", 93],
                ["Context precision", 89],
                ["Source coverage", 91],
              ].map(([label, val]) => (
                <div key={label as string}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono">{val}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary"
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border/60 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-semibold">142</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Citations</p>
              </div>
              <div>
                <p className="text-xl font-semibold">2</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Unsupported</p>
              </div>
              <div>
                <p className="text-xl font-semibold">94%</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Confidence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="py-24 border-t border-border/40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="rounded-3xl border border-border/60 bg-gradient-card p-12 shadow-elegant relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-accent-soft opacity-60" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Run your first deep report in under two minutes.
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Start with a ticker. Lumen handles retrieval, synthesis, and evaluation.
              </p>
              <Button size="lg" asChild className="mt-8 shadow-glow">
                <Link to="/research/new">
                  Start analysis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Lumen Research. For institutional use. Not investment advice.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Security</a>
            <a href="#" className="hover:text-foreground">Compliance</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
