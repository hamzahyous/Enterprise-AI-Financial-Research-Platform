# def retrieval_score(question, chunks):

#     if not chunks:
#         return 0.0

#     # relevance proxy: reranker score + distance
#     avg_rerank = sum(c.get("rerank_score", 0) for c in chunks) / len(chunks)
#     avg_distance = sum(c.get("distance", 1) for c in chunks) / len(chunks)

#     section_bonus = len(set(c["section"] for c in chunks)) / 3  # normalize

#     score = (
#         0.5 * avg_rerank +
#         0.3 * (1 / (1 + avg_distance)) +
#         0.2 * section_bonus
#     )

#     return round(score, 3)

# ========================================================================================

def retrieval_score(question, chunks):

    if not chunks:
        return 0.0


    avg_distance = sum(
        c.get("distance",1)
        for c in chunks
    ) / len(chunks)


    distance_score = 1 / (1 + avg_distance)


    section_diversity = len(
        set(
            c["section"]
            for c in chunks
        )
    ) / 3


    score = (
        0.6 * distance_score +
        0.4 * min(section_diversity,1)
    )


    return round(score,3)