
from sentence_transformers import SentenceTransformer


model = SentenceTransformer(
    "sentence-transformers/all-MiniLM-L6-v2"
)



def embed_chunks(chunks):

    texts = [
        chunk["text"]
        for chunk in chunks
    ]


    embeddings = model.encode(
        texts,
        show_progress_bar=True,
        normalize_embeddings=True
    )


    return embeddings
