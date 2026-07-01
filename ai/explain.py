def generate_explanation(
    candidate,
    semantic_similarity,
    skill_match,
    query
):

    explanation = []

    # Semantic similarity
    if semantic_similarity >= 80:
        explanation.append(
            "Excellent semantic match with the job description."
        )
    elif semantic_similarity >= 60:
        explanation.append(
            "Strong semantic similarity."
        )
    else:
        explanation.append(
            "Relevant profile based on semantic search."
        )

    # Experience
    years = candidate["experience_months"] // 12

    explanation.append(
        f"{years} years of professional experience."
    )

    # Matched skills
    query_words = {
        word.lower()
        for word in query.split()
    }

    matched = [
        skill
        for skill in candidate["skills"]
        if skill.lower() in query_words
    ]

    if matched:
        explanation.append(
            "Matched skills: " + ", ".join(matched[:5])
        )

    # Education
    if candidate["education"]:
        degree = candidate["education"][0].get(
            "degree",
            ""
        )

        if degree:
            explanation.append(
                degree
            )

    return explanation