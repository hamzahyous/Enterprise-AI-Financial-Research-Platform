from .retrieval_eval import retrieval_score
from .faithfulness import faithfulness_score
from .risk_relevance import risk_relevance_score


# def evaluate_rag(question, chunks, llm_output):

#     return {
#         "retrieval_score": retrieval_score(question, chunks),
#         "faithfulness_score": faithfulness_score(chunks, llm_output),
#         "risk_relevance_score": risk_relevance_score(llm_output),
#     }

# ========================================================================================

def evaluate_rag(question, chunks, llm_output):


    return {

        "retrieval_score":
            retrieval_score(
                question,
                chunks
            ),


        "faithfulness_score":
            faithfulness_score(
                chunks,
                llm_output
            ),


        "risk_relevance_score":
            risk_relevance_score(
                llm_output
            )

    }