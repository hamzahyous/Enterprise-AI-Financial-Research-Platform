# def risk_relevance_score(llm_output):

#     bad_keywords = [
#         "accounting policy",
#         "code of conduct",
#         "insider trading",
#         "social media",
#         "press release"
#     ]

#     risks = llm_output.get("risks", [])

#     if not risks:
#         return 0.0

#     penalty = 0

#     for r in risks:
#         text = r["category"].lower()

#         if any(b in text for b in bad_keywords):
#             penalty += 1

#     score = 1 - (penalty / len(risks))

#     return round(max(score, 0), 3)

# ========================================================================================

def risk_relevance_score(llm_output):

    bad_keywords = [
        "accounting",
        "policy",
        "insider",
        "code of conduct",
        "social media"
    ]


    risks = llm_output.get(
        "risks",
        []
    )


    if not risks:
        return 0.0


    penalty = 0


    for r in risks:

        text = (
            r["category"]
            +
            " "
            +
            r["explanation"]
        ).lower()


        if any(
            bad in text
            for bad in bad_keywords
        ):
            penalty += 1



    score = 1 - (
        penalty / len(risks)
    )


    return round(
        max(score,0),
        3
    )