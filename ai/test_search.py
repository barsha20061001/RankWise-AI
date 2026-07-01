from search_engine import search

results = search(
    "Python backend developer with Docker",
    5
)

for r in results:
    print(r["candidate_id"])
    print("Overall Score:", r["overall_score"])
    print("Semantic Similarity:", r["semantic_similarity"])
    print("Skill Match:", r["skill_match"])
    print("Experience:", r["experience_months"] // 12, "years")
    print("Explanation:")
    for line in r["explanation"]:
        print(" •", line)
    print("Skills:", r["skills"][:10])
    print("-"*50)