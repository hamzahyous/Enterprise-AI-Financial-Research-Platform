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

## Running Locally

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
http://localhost:5173
```

---

### Future Note

Docker-based local development will be added later so contributors will not need to manually install Bun, Node.js, and other local dependencies directly on their machine.
