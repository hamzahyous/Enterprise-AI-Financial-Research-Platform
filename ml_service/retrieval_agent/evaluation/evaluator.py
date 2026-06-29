import json

from .metrics import evaluate_rag
from ..generation.rag_pipeline import answer_question


def load_dataset():

    with open(
        "retrieval_agent/evaluation/dataset.json",
        "r"
    ) as f:

        return json.load(f)



def run_evaluation():

    dataset = load_dataset()

    results = []


    for item in dataset:

        question = item["question"]


        print("\n======================")
        print("QUESTION:")
        print(question)
        print("======================")


        # Run your RAG system
        answer = answer_question(question)


        # Extract evaluation pieces
        chunks = answer.get(
            "retrieved_chunks",
            []
        )


        risks = answer


        scores = evaluate_rag(
            question,
            chunks,
            risks
        )


        results.append({

            "question": question,

            "expected_topics": item["expected_topics"],

            "answer": answer,

            "scores": scores

        })



    with open(
        "evaluation_results.json",
        "w"
    ) as f:

        json.dump(
            results,
            f,
            indent=4
        )


    print("\nEvaluation complete.")
    print("Saved evaluation_results.json")



if __name__ == "__main__":

    run_evaluation()