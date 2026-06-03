export type ReportStatus = "completed" | "running" | "failed";

export interface Report {
  id: string;
  title: string;
  tickers: string[];
  depth: "Basic" | "Standard" | "Deep";
  createdAt: string;
  status: ReportStatus;
  confidence: number;
}

export const recentReports: Report[] = [
  { id: "rpt_001", title: "NVIDIA AI accelerator moat vs AMD MI300", tickers: ["NVDA", "AMD"], depth: "Deep", createdAt: "2026-05-24", status: "completed", confidence: 94 },
  { id: "rpt_002", title: "Apple Services margin trajectory FY26", tickers: ["AAPL"], depth: "Standard", createdAt: "2026-05-23", status: "completed", confidence: 88 },
  { id: "rpt_003", title: "Tesla FSD monetization scenarios", tickers: ["TSLA"], depth: "Deep", createdAt: "2026-05-23", status: "running", confidence: 0 },
  { id: "rpt_004", title: "Microsoft Azure vs AWS share shift", tickers: ["MSFT", "AMZN"], depth: "Standard", createdAt: "2026-05-22", status: "completed", confidence: 91 },
  { id: "rpt_005", title: "Snowflake post-Iceberg pricing risk", tickers: ["SNOW"], depth: "Basic", createdAt: "2026-05-21", status: "failed", confidence: 0 },
  { id: "rpt_006", title: "Eli Lilly GLP-1 capacity build", tickers: ["LLY", "NVO"], depth: "Deep", createdAt: "2026-05-20", status: "completed", confidence: 89 },
  { id: "rpt_007", title: "Stripe IPO comp analysis", tickers: ["V", "MA", "PYPL"], depth: "Standard", createdAt: "2026-05-19", status: "completed", confidence: 86 },
];

export const stats = {
  reportsGenerated: 1284,
  documentsIndexed: 482911,
  evaluationScore: 92.4,
  avgConfidence: 89.1,
};

export interface Citation {
  id: number;
  source: string;
  type: "10-K" | "10-Q" | "Earnings Call" | "News" | "Metric";
  excerpt: string;
  date: string;
}

export const sampleCitations: Citation[] = [
  { id: 1, source: "NVDA 10-K FY2025, Item 7", type: "10-K", excerpt: "Data Center revenue grew 217% YoY driven by Hopper and Blackwell architectures...", date: "2025-02-21" },
  { id: 2, source: "NVDA Q4 FY25 Earnings Call", type: "Earnings Call", excerpt: "Jensen Huang: 'Blackwell production is in full gear, demand vastly exceeds supply.'", date: "2025-02-26" },
  { id: 3, source: "AMD 10-Q Q1 2025", type: "10-Q", excerpt: "MI300 series revenue exceeded $1B in the quarter, with hyperscaler customer concentration...", date: "2025-05-01" },
  { id: 4, source: "Gross Margin Trend", type: "Metric", excerpt: "NVDA non-GAAP gross margin: 76.7% Q4 FY25 vs 76.0% Q3 FY25.", date: "2025-02-26" },
  { id: 5, source: "Reuters: TSMC CoWoS capacity", type: "News", excerpt: "TSMC doubling CoWoS advanced packaging capacity through 2026 to meet AI demand.", date: "2025-03-14" },
];

export const competitorRows = [
  { metric: "Revenue (TTM)", a: "$130.5B", b: "$26.9B", c: "$245.1B" },
  { metric: "Gross Margin", a: "75.0%", b: "51.2%", c: "62.4%" },
  { metric: "Operating Margin", a: "61.9%", b: "8.4%", c: "30.1%" },
  { metric: "R&D % of Rev", a: "10.3%", b: "22.1%", c: "12.8%" },
  { metric: "FCF (TTM)", a: "$56.5B", b: "$3.1B", c: "$68.2B" },
  { metric: "Fwd P/E", a: "34.2x", b: "28.7x", c: "26.9x" },
];
