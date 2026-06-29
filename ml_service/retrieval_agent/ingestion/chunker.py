
def chunk_text(text, section_name="unknown", chunk_size=400, chunk_overlap=50):

    words = text.split()
    chunks = []
    start = 0
    chunk_id = 0

    while start < len(words):

        end = start + chunk_size
        chunk = " ".join(words[start:end])

        chunks.append({
        "text": chunk,
        "section": section_name,
        "company": "NVIDIA",
        "year": "2026",
        "filing": "10-K",
        "chunk_id": chunk_id
    })

        chunk_id += 1
        start += chunk_size - chunk_overlap

    return chunks 