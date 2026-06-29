
from .parser import read_filing, clean_sec_text
from .chunker import chunk_text
from ..retrieval.embeddings import embed_chunks
from ..retrieval.vectordb import build_index
import pickle


filepath = "/workspace/ml_service/sec-edgar-filings/NVDA/10-K/0001045810-26-000021/full-submission.txt"


text = read_filing(filepath)

clean_text = clean_sec_text(text)


chunks = chunk_text(
    clean_text,
    section_name="Risk Factors"
)


embeddings = embed_chunks(chunks)


index = build_index(
    embeddings
)


faiss_path = "faiss_index.bin"


import faiss

faiss.write_index(
    index,
    faiss_path
)


with open("chunks.pkl", "wb") as f:
    pickle.dump(
        chunks,
        f
    )


print("Saved new index + chunks")