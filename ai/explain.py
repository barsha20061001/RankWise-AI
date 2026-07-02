from skill_extractor import extract_skills

def generate_explanation(
    candidate,
    semantic_similarity,
    skill_match,
    query,
    matched_certifications=None
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

    if years >= 10:
       level = "Senior"

    elif years >= 5:
        level = "Experienced"

    elif years >= 3:
        level = "Mid-level"

    else:
        level = "Early Career"
 
    explanation.append(
       f"{years} years of professional experience ({level})"
    )

    # Matched skills
    query_skills = set(extract_skills(query))

    matched = [
        skill
        for skill in candidate["skills"]
        if skill.lower() in query_skills
    ]

    if matched:
        explanation.append(
            f"Matched {len(matched)} required skills: {', '.join(matched[:5])}"
        )

    # Education
    if candidate["education"]:

        edu = candidate["education"][0]

        degree = edu.get("degree", "")
        field = edu.get("field_of_study", "")
        institution = edu.get("institution", "")

        explanation.append(
        f"{degree} in {field} from {institution}"
        )

        



    signals = candidate.get("signals", {})

    notice = signals.get("notice_period_days")

    if notice is not None:
        explanation.append(
           f"Notice period: {notice} days"
        )

    saved = signals.get("saved_by_recruiters_30d", 0)

    if saved > 0:
        explanation.append(
           f"Saved by recruiters {saved} time(s) in the last 30 days"
        )

    completion = signals.get("interview_completion_rate", 0)

    if completion > 0:
        explanation.append(
           f"Interview completion rate: {round(completion * 100)}%"
        ) 


    if matched_certifications:

        explanation.append(
           "Relevant certifications: "
           + ", ".join(matched_certifications)
        )            

    return explanation