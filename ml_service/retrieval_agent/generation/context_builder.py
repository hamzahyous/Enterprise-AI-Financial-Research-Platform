
def build_context(chunks, max_chars=6000):

    context=""


    for chunk in chunks:


        context += f"""

CHUNK {chunk['chunk_id']}

Company:
{chunk['company']}

Section:
{chunk['section']}

Filing:
{chunk['filing']}


TEXT:

{chunk['text']}


"""


        if len(context)>max_chars:
            break


    return context