
import re
def extract_risk_factors(text):

    matches = list(
        re.finditer(
            r"Item 1A\. Risk Factors",
            text
        )
    )


    selected_start = None


    for match in matches:

        start = match.start()

        preview = text[start:start+1000].lower()

        if (
            "the following risk factors should be considered"
            in preview
        ):
            selected_start = start
            break


    if selected_start is None:
        return None


    risk_text = text[selected_start:]


    # remove risk summary
    summary_end = risk_text.find(
        "Risks Related to Our Industry and Markets"
    )

    if summary_end != -1:
        risk_text = risk_text[summary_end:]


    # stop at next section
    end = risk_text.find(
        "Item 1B. Unresolved Staff Comments"
    )


    if end != -1:
        risk_text = risk_text[:end]


    return risk_text