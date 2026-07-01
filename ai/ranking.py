def experience_score(months):

    years = months / 12

    if years >= 10:
        return 100

    elif years >= 7:
        return 90

    elif years >= 5:
        return 80

    elif years >= 3:
        return 70

    elif years >= 1:
        return 50

    return 20


def education_score(education):

    if not education:
        return 50

    tier = education[0].get("tier", "").lower()

    scores = {
        "tier_1": 100,
        "tier_2": 85,
        "tier_3": 70,
        "tier_4": 55
    }

    return scores.get(tier, 50)


def skill_match_score(query, candidate_skills):

    query_words = set(query.lower().split())

    candidate_words = {
        skill.lower()
        for skill in candidate_skills
    }

    matches = query_words.intersection(candidate_words)

    if len(query_words) == 0:
        return 0

    percentage = len(matches) / len(query_words)

    return percentage * 100


def final_score(
    semantic_similarity,
    experience_months,
    education,
    skill_score
):

    semantic = semantic_similarity * 100

    exp = experience_score(experience_months)

    edu = education_score(education)

    score = (
        semantic * 0.50 +
        exp * 0.20 +
        skill_score * 0.20 +
        edu * 0.10
    )

    return round(score, 2)