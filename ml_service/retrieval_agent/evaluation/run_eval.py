import json

from ..generation.rag_pipeline import answer_question

from .metrics import evaluate_rag


import json
import os


BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)


dataset_path = os.path.join(
    BASE_DIR,
    "dataset.json"
)


with open(dataset_path) as f:
    dataset = json.load(f)



results = []



for item in dataset:


    question = item["question"]


    print(
        "\nRunning:",
        question
    )


    answer = answer_question(
        question
    )


    metrics = evaluate_rag(
        question,
        answer.get("retrieved_chunks",[]),
        answer
    )


    results.append({

        "question": question,

        "metrics": metrics,

        "answer": answer

    })



print("\n===== EVALUATION RESULTS =====")


for r in results:

    print(
        r["question"]
    )

    print(
        r["metrics"]
    )