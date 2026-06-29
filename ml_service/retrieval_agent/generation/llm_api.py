
# from groq import Groq
# import os

# client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# def generate(prompt):

#     response = client.chat.completions.create(
#         model="llama-3.1-8b-instant",
#         messages=[
#             {
#                 "role": "user",
#                 "content": prompt
#             }
#         ],
#         temperature=0,
#     )

#     return response.choices[0].message.content

# ---------------------------------------------------------------------------------------

# from groq import Groq
# import os

# client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# def generate(prompt):

#     response = client.chat.completions.create(
#         model="llama-3.1-8b-instant",
#         messages=[
#             {"role": "system", "content": "You are a precise financial analyst."},
#             {"role": "user", "content": prompt}
#         ],
#         temperature=0.1
#     )

#     return response.choices[0].message.content

# ---------------------------------------------------------------------------------------

import os
from urllib import response
from groq import Groq


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate(prompt):

    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role":"system",
                "content":
                """
You are a financial SEC analyst.

Return ONLY valid JSON.
No markdown.
No explanation before or after JSON.
"""
            },

            {
                "role":"user",
                "content":prompt
            }
        ],

        temperature=0,

        max_tokens=1500

    )


    output = response.choices[0].message.content

    print("\n===== GROQ OUTPUT =====\n")
    print(output)

    return output