import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[4]


def call_retrieval_agent(query: str, ticker: str | None = None, documents: list[str] | None = None):
    if str(REPO_ROOT) not in sys.path:
        sys.path.insert(0, str(REPO_ROOT))

    try:
        from ml_service.retrieval_agent.generation.rag_pipeline import answer_question
    except Exception as exc:
        raise RuntimeError(f"Retrieval agent is unavailable: {exc}") from exc

    # The current retrieval agent only accepts question text. Keep ticker/documents
    # in this adapter signature so the API is ready when the agent supports them.
    return answer_question(query)
