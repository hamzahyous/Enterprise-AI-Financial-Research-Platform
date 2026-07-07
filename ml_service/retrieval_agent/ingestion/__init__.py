# Answers: 

# How do I get SEC documents and turn them into searchable chunks? 

'''

Only responsibility: build clean chunks

sec_fetcher → gets raw filings
parser → extracts text/sections
chunker → splits text
document_processor → cleans/normalizes
ingestion.py → pipeline orchestration

👉 NO retrieval logic here

''' 