from ..retrieval.retriever import retrieve
from ..retrieval.retrieval_policy import filter_chunks
from ..retrieval.reranker import rerank

from .context_builder import build_context
from .llm_api import generate
from ..core.schemas import RiskReport

from .prompts import create_risk_prompt



def calculate_confidence(chunks):

    if len(chunks) == 0:
        return 0


    avg_distance = sum(
        c["distance"]
        for c in chunks
    ) / len(chunks)


    confidence = 1 / (1 + avg_distance)


    return round(confidence, 2)




def answer_question(question, debug=False):


    # -----------------------------
    # 1. Retrieve candidates
    # -----------------------------

    chunks = retrieve(
        question
    )


    # -----------------------------
    # 2. Apply retrieval policy
    # Remove irrelevant SEC sections
    # -----------------------------

    chunks = filter_chunks(
        chunks
    )


    # -----------------------------
    # 3. Rerank chunks
    # Cross encoder
    # -----------------------------

    chunks = rerank(
        question,
        chunks
    )


    # -----------------------------
    # 4. Build LLM context
    # -----------------------------

    context = build_context(
        chunks
    )


    if debug:

        print("\n===== CONTEXT SENT TO LLM =====")

        print(context)

        print("==============================")



    # -----------------------------
    # 5. Create prompt
    # -----------------------------

    prompt = create_risk_prompt(
        question,
        context
    )



    # -----------------------------
    # 6. Call LLM
    # -----------------------------

    response = generate(
        prompt
    )



    if debug:

        print("\n===== RAW LLM OUTPUT =====")

        print(response)



    # -----------------------------
    # 7. Validate JSON
    # -----------------------------

    try:


        parsed = RiskReport.model_validate_json(
            response
        )


        result = parsed.model_dump()



        # add retrieval confidence

        result["confidence"] = calculate_confidence(
            chunks
        )


        result["retrieved_chunks"] = chunks

        return result


    except Exception as e:


        return {

            "error":
            "Invalid model output",

            "details":
            str(e),

            "raw_output":
            response
        }