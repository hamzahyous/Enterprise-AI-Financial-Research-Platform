# Enterprise AI Financial Research Platform

A multi-service AI platform that researches public companies, retrieves financial documents, generates citation-grounded reports, and evaluates the reliability of AI-generated analysis.

## Overview

This project combines:
- Financial document retrieval
- Retrieval-Augmented Generation (RAG)
- AI evaluation pipelines
- Multi-service backend architecture
- Enterprise-style observability and orchestration

The platform enables users to analyze companies using SEC filings, earnings transcripts, financial metrics, and news sources.

Example query:

```text
Analyze NVIDIA’s recent earnings performance and compare it against AMD.
```

## Running Locally

Clone the repository:

```bash
git clone <repo-url>
cd Enterprise-AI-Financial-Research-Platform
```

### Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
source ~/.zshrc
```

---

### Ensure Node.js is Up To Date

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.zshrc

nvm install 22
nvm use 22
```

---

### Install Dependencies

```bash
bun install
```

---

### Start Development Server

```bash
bun run dev
```

Frontend runs at:

```text
http://localhost:8080
```

---

### Datasets

https://www.alphavantage.co/?gad_source=1&gad_campaignid=22364657752&gbraid=0AAAAA-6A8dOSRfB08h67Di3y5eeAKoH_c&gclid=CjwKCAjwidXQBhAZEiwA4egw6MczDmXsuXjVo6Hb2ailOLvbRTRZNtqDKBYCzOxnhPKDF2ZtQ4rnwRoCIZ4QAvD_BwE

https://massive.com/landing-p/edgar-filings-api?utm_term=edgar%20filings%20api&utm_campaign=Stocks+-+USA+-+PROGRAMMATIC-cid-23532515000&utm_source=adwords&utm_medium=ppc&hsa_acc=4299129556&hsa_cam=1330311037&hsa_grp=196645869350&hsa_ad=796869105350&hsa_src=g&hsa_tgt=kwd-1684535261440&hsa_kw=edgar%20filings%20api&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=23532515000&gbraid=0AAAAADBbJ2jPDTz3EONijX4-P6E0J9i5v&gclid=CjwKCAjwidXQBhAZEiwA4egw6KskATnGlT8iMhHk42JbxJOnG1kklcPpEGHPlE-TQdPJRQJIh7n_IhoC9WkQAvD_BwE

---

### APIs

https://fred.stlouisfed.org/docs/api/fred/ 

---

### Future Note

Docker-based local development will be added later so contributors will not need to manually install Bun, Node.js, and other local dependencies directly on their machine.
