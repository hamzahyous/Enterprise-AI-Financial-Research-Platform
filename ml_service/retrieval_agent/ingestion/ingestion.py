
import argparse
import pickle
from pathlib import Path

import faiss

from .chunker import chunk_text
from .parser import clean_sec_text, read_filing
from ..retrieval.embeddings import embed_chunks
from ..retrieval.vectordb import build_index


ML_SERVICE_DIR = Path(__file__).resolve().parents[2]
DEFAULT_FILING_PATH = (
    ML_SERVICE_DIR
    / "sec-edgar-filings"
    / "NVDA"
    / "10-K"
    / "manual"
    / "full-submission.txt"
)
DEFAULT_INDEX_PATH = ML_SERVICE_DIR / "faiss_index.bin"
DEFAULT_CHUNKS_PATH = ML_SERVICE_DIR / "chunks.pkl"


def run_ingestion(
    filepath: str | Path = DEFAULT_FILING_PATH,
    ticker: str = "NVDA",
    filing_type: str = "10-K",
    section_name: str = "Risk Factors",
):
    filepath = Path(filepath)

    if not filepath.exists():
        raise FileNotFoundError(f"Filing not found: {filepath}")

    text = read_filing(filepath)
    clean_text = clean_sec_text(text)

    chunks = chunk_text(
        clean_text,
        section_name=section_name,
    )

    for chunk in chunks:
        chunk["company"] = ticker.upper()
        chunk["filing"] = filing_type

    embeddings = embed_chunks(chunks)
    index = build_index(embeddings)

    faiss.write_index(index, str(DEFAULT_INDEX_PATH))

    with open(DEFAULT_CHUNKS_PATH, "wb") as f:
        pickle.dump(chunks, f)

    print(f"Read filing from {filepath}")
    print(f"Saved FAISS index to {DEFAULT_INDEX_PATH}")
    print(f"Saved chunks to {DEFAULT_CHUNKS_PATH}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--filepath", default=str(DEFAULT_FILING_PATH))
    parser.add_argument("--ticker", default="NVDA")
    parser.add_argument("--filing-type", default="10-K")
    parser.add_argument("--section-name", default="Risk Factors")
    args = parser.parse_args()

    run_ingestion(
        filepath=args.filepath,
        ticker=args.ticker,
        filing_type=args.filing_type,
        section_name=args.section_name,
    )


if __name__ == "__main__":
    main()
