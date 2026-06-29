
import faiss
import pickle


index = faiss.read_index(
    "faiss_index.bin"
)

with open("chunks.pkl","rb") as f:
    chunks = pickle.load(f)

print(chunks[0])

