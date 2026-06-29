BAD_SECTIONS = {
    "Insider Trading",
    "Code of Conduct",
    "Corporate Governance"
}

ALLOWED_SECTIONS = {
    "Risk Factors",
    "Legal Proceedings",
    "Business Overview"
}

def filter_chunks(chunks):
    cleaned = []

    for c in chunks:
        if c["section"] not in ALLOWED_SECTIONS:
            continue

        if any(bad.lower() in c["text"].lower() for bad in BAD_SECTIONS):
            continue

        cleaned.append(c)

    return cleaned 