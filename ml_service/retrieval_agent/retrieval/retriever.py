
from sentence_transformers import SentenceTransformer, CrossEncoder
import faiss
import pickle
import numpy as np
from pathlib import Path


# -------------------------
# Models
# -------------------------

embedding_model = SentenceTransformer(
    "sentence-transformers/all-MiniLM-L6-v2"
)


reranker = CrossEncoder(
    "cross-encoder/ms-marco-MiniLM-L-6-v2"
)



# -------------------------
# Load Vector DB
# -------------------------

ML_SERVICE_DIR = Path(__file__).resolve().parents[2]

index = faiss.read_index(
    str(ML_SERVICE_DIR / "faiss_index.bin")
)


with open(ML_SERVICE_DIR / "chunks.pkl", "rb") as f:
    chunks = pickle.load(f)



# -------------------------
# Retrieval Function
# -------------------------

def retrieve(query, k=50):


    query_embedding = embedding_model.encode(
        [query]
    )


    distances, indices = index.search(
        np.array(query_embedding),
        k
    )


    retrieved_chunks = []


    # -------------------------
    # Step 1: Metadata Filtering
    # -------------------------

    for distance, idx in zip(
        distances[0],
        indices[0]
    ):

        idx = int(idx)


        chunk = chunks[idx]


        BAD_SECTIONS = [
            "Insider Trading",
            "Code of Conduct",
            "Corporate Governance",
            "Legal Proceedings Policy"
        ]


        if any(
            bad.lower() in chunk["section"].lower()
            for bad in BAD_SECTIONS
        ):
            continue


        if any(
            bad.lower() in chunk["text"].lower()
            for bad in BAD_SECTIONS
        ):
            continue



        if chunk["section"] not in [
            "Risk Factors",
            "Legal Proceedings",
            "Business Overview"
        ]:
            continue



        retrieved_chunks.append({

            "company": chunk["company"],

            "text": chunk["text"],

            "chunk_id": chunk["chunk_id"],

            "section": chunk["section"],

            "filing": chunk["filing"],

            "distance": float(distance)

        })



    if len(retrieved_chunks) == 0:
        return []



    # -------------------------
    # Step 2: Reranking
    # -------------------------

    pairs = [

        [
            query,
            c["text"]
        ]

        for c in retrieved_chunks

    ]


    scores = reranker.predict(
        pairs
    )


    for chunk, score in zip(
        retrieved_chunks,
        scores
    ):

        chunk["rerank_score"] = float(score)



    reranked = sorted(

        retrieved_chunks,

        key=lambda x: x["rerank_score"],

        reverse=True

    )



    # -------------------------
    # Step 3: Final top chunks
    # -------------------------

    final_chunks = []


    seen = set()



    for chunk in reranked:


        if chunk["chunk_id"] not in seen:


            final_chunks.append(chunk)


            seen.add(
                chunk["chunk_id"]
            )


        if len(final_chunks) == 5:
            break



    log_retrieval_metrics(
        query,
        final_chunks
    )


    return final_chunks





# -------------------------
# Metrics
# -------------------------

def log_retrieval_metrics(query, chunks):


    if len(chunks) == 0:
        return



    avg_distance = sum(
        c["distance"]
        for c in chunks
    ) / len(chunks)



    sections = set(

        c["section"]

        for c in chunks

    )


    print("\n===== RETRIEVAL METRICS =====")


    print(
        "Query:",
        query
    )


    print(
        "Chunks returned:",
        len(chunks)
    )


    print(
        "Average distance:",
        round(avg_distance,3)
    )


    print(
        "Section diversity:",
        len(sections)
    )


    print(
        "Top rerank score:",
        round(
            chunks[0]["rerank_score"],
            3
        )
    )


    print("============================\n")

# from sentence_transformers import SentenceTransformer, CrossEncoder
# import faiss
# import pickle
# import numpy as np


# # Embedding model
# embedding_model = SentenceTransformer(
#     "sentence-transformers/all-MiniLM-L6-v2"
# )


# # Reranker model
# reranker = CrossEncoder(
#     "cross-encoder/ms-marco-MiniLM-L-6-v2"
# )


# # Load FAISS
# index = faiss.read_index(
#     "faiss_index.bin"
# )


# # Load chunks
# with open("chunks.pkl", "rb") as f:
#     chunks = pickle.load(f)



# def retrieve(query, k=50):

#     # -------------------------
#     # Step 1: FAISS retrieval
#     # -------------------------

#     query_embedding = embedding_model.encode(
#         [query]
#     )


#     distances, indices = index.search(
#         np.array(query_embedding),
#         k
#     )


#     retrieved_chunks = []

#     for distance, idx in zip(distances[0], indices[0]):

#         idx = int(idx)  # IMPORTANT FIX

#         chunk = chunks[idx]

#         BAD_SECTIONS = [
#             "Insider Trading",
#             "Code of Conduct",
#             "Corporate Governance",
#             "Legal Proceedings Policy"
#         ]

#         if any(bad.lower() in chunk["section"].lower() for bad in BAD_SECTIONS):
#             continue

#         if any(bad.lower() in chunk["text"].lower() for bad in BAD_SECTIONS):
#             continue

#         if chunk["section"] not in [
#             "Risk Factors",
#             "Legal Proceedings",
#             "Business Overview"
#         ]:
#             continue

#         retrieved_chunks.append({
#             "company": chunk["company"],
#             "text": chunk["text"],
#             "chunk_id": chunk["chunk_id"],
#             "section": chunk["section"],
#             "filing": chunk["filing"],
#             "distance": float(distance)
#         }) 

#     return final_chunks

#     # -------------------------
#     # Step 2: Reranking
#     # -------------------------

#     pairs = [

#         [
#             query,
#             c["text"]
#         ]

#         for c in retrieved_chunks

#     ]


#     rerank_scores = reranker.predict(
#         pairs
#     )


#     for chunk, score in zip(
#         retrieved_chunks,
#         rerank_scores
#     ):

#         chunk["rerank_score"] = float(score)



#     # Sort by reranker score

#     reranked = sorted(

#         retrieved_chunks,

#         key=lambda x: x["rerank_score"],

#         reverse=True

#     )


#     # Keep best 5

#     final_chunks = []

#     seen_sections = set()


#     for chunk in reranked:

#         if chunk["chunk_id"] not in seen_sections:

#             final_chunks.append(chunk)

#             seen_sections.add(
#                 chunk["chunk_id"]
#             )


#         if len(final_chunks) == 5:
#             break



#     # -------------------------
#     # Retrieval metrics
#     # -------------------------

#     log_retrieval_metrics(
#         query,
#         final_chunks
#     )


#     return final_chunks





# def log_retrieval_metrics(
#     query,
#     chunks
# ):


#     avg_distance = sum(
#         c["distance"]
#         for c in chunks
#     ) / len(chunks)



#     sections = set(

#         c["section"]

#         for c in chunks

#     )


#     print("\n===== RETRIEVAL METRICS =====")

#     print(
#         "Query:",
#         query
#     )

#     print(
#         "Chunks returned:",
#         len(chunks)
#     )

#     print(
#         "Average distance:",
#         round(avg_distance,3)
#     )

#     print(
#         "Section diversity:",
#         len(sections)
#     )

#     print(
#         "Top rerank score:",
#         round(
#             chunks[0]["rerank_score"],
#             3
#         )
#     )

#     print("============================\n")
