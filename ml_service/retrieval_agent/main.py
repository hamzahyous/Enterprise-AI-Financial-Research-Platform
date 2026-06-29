
from .generation.rag_pipeline import answer_question


question = "What are NVIDIA's biggest risks?" 

answer = answer_question(
    question
)


print("\nFINAL ANSWER\n")

print(answer) 