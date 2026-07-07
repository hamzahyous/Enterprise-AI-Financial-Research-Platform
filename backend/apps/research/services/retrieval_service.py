from apps.research.adapters.retrieval_agent import call_retrieval_agent


def run_research_query(payload: dict):
    query = payload["query"]
    ticker = payload.get("ticker", "").upper()
    documents = payload.get("documents", [])

    agent_result = call_retrieval_agent(
        query=query,
        ticker=ticker,
        documents=documents,
    )

    return normalize_retrieval_response(
        agent_result=agent_result,
        query=query,
        ticker=ticker,
        documents=documents,
    )


def normalize_retrieval_response(
    agent_result: dict,
    query: str,
    ticker: str = "",
    documents: list[str] | None = None,
):
    documents = documents or []
    citations = _build_citations(agent_result)

    return {
        "query": agent_result.get("question", query),
        "ticker": ticker,
        "company": agent_result.get("company", ticker),
        "risks": _build_risks(agent_result),
        "citations": citations,
        "metadata": {
            "documents": documents,
            "confidence": agent_result.get("confidence"),
            "citation_count": len(citations),
            "retrieved_chunk_count": len(agent_result.get("retrieved_chunks", [])),
        },
    }


def _build_risks(agent_result: dict):
    risks = []

    for risk in agent_result.get("risks", []):
        risks.append({
            "category": risk.get("category"),
            "impact": risk.get("impact"),
            "explanation": risk.get("explanation"),
            "source": _normalize_source(risk.get("source", {})),
        })

    return risks


def _normalize_source(source: dict):
    return {
        "chunk_id": source.get("chunk_id"),
        "section": source.get("section"),
        "filing": source.get("filing"),
    }


def _build_citations(agent_result: dict):
    citations = []
    seen_chunk_ids = set()

    for chunk in agent_result.get("retrieved_chunks", []):
        chunk_id = chunk.get("chunk_id")

        if chunk_id in seen_chunk_ids:
            continue

        seen_chunk_ids.add(chunk_id)
        citations.append({
            "chunk_id": chunk_id,
            "section": chunk.get("section"),
            "filing": chunk.get("filing"),
            "text": chunk.get("text"),
        })

    return citations
