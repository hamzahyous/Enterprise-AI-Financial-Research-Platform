# from ..generation.llm_api import generate


# def faithfulness_score(chunks, llm_output):

#     context_text = "\n".join([c["text"] for c in chunks])

#     prompt = f"""
# You are a strict evaluator.

# Check if the following answer is fully supported by the context.

# Return ONLY a number between 0 and 1.

# Rules:
# - 1.0 = fully grounded in context
# - 0.0 = hallucinated or not supported
# - penalize any unsupported claims

# CONTEXT:
# {context_text}

# ANSWER:
# {llm_output}

# Return only a float.
# """

#     response = generate(prompt)

#     try:
#         return float(response.strip())
#     except:
#         return 0.0

# ========================================================================================

from ..generation.llm_api import generate
import json
import re



def faithfulness_score(chunks, llm_output):


    context_text = "\n".join(
        [
            c["text"]
            for c in chunks
        ]
    )


    answer_text = json.dumps(
        llm_output,
        indent=2
    )


    prompt = f"""

You are a strict financial AI evaluator.

Determine whether the answer is supported by the SEC filing context.

Return ONLY a number between 0 and 1.

Scoring:

1.0 = Every claim is supported by context

0.5 = Mostly supported but some weak claims

0.0 = Hallucinated or unsupported


CONTEXT:

{context_text}


ANSWER:

{answer_text}


Score:

"""


    response = generate(prompt)


    match = re.search(
        r"0\.\d+|1\.0|0",
        response
    )


    if match:

        return float(
            match.group()
        )


    return 0.0