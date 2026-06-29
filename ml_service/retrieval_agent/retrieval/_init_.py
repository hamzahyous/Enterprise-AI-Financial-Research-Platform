# Answers: 

# How do I find the best evidence?

''' 
Retrieval flow becomes: 

User Question 

⬇️

retriever.py
(FAISS top 50)

⬇️

retrieval_policy.py
(remove irrelevant sections)

⬇️

reranker.py
(CrossEncoder scoring)

⬇️

Top 5 chunks
''' 

'''
This is your MOST IMPORTANT folder

retriever.py
FAISS search ONLY
returns top_k raw candidates
embeddings.py
embedding model loading
encoding logic ONLY
vectordb.py
FAISS index load/save
vector search wrapper
❗ NEW: reranker.py
cross encoder scoring
rerank top 50 → top 5
❗ NEW: retrieval_policy.py

This is your enterprise upgrade

Controls:

allowed sections
banned sections
diversity rules
per-query retrieval strategy
''' 