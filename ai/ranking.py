
from skill_extractor import extract_skills

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


def experience_match_score(candidate_months, required_years):

    if required_years == 0:
        return 5

    candidate_years = candidate_months / 12

    if candidate_years >= required_years:
        return 10

    gap = required_years - candidate_years

    if gap <= 1:
        return 7

    elif gap <= 2:
        return 4

    return 0


def work_mode_score(signals, required_mode):

    if not required_mode:
        return 3

    candidate_mode = (
        signals.get("preferred_work_mode", "")
        .lower()
    )

    if candidate_mode == required_mode.lower():
        return 5

    return 0


def education_score(education):

    if not education:
        return 0

    score = 0

    degree_points = {
        "ph.d": 10,
        "phd": 10,
        "m.tech": 8,
        "m.e.": 8,
        "m.e": 8,
        "m.sc": 7,
        "m.s.": 7,
        "m.s": 7,
        "b.tech": 6,
        "b.e.": 6,
        "b.e": 6,
        "b.sc": 5,
    }

    tier_points = {
        "tier_1": 5,
        "tier_2": 4,
        "tier_3": 3,
        "tier_4": 2
    }

    best = 0

    for edu in education:

        degree = edu.get("degree", "").lower()
        tier = edu.get("tier", "").lower()

        current = 0

        current += degree_points.get(degree, 3)
        current += tier_points.get(tier, 0)

        if current > best:
            best = current

    return best



def recruiter_signal_score(signals):

    if not signals:
        return 0

    score = 0

    # Recruiter interest
    if signals.get("saved_by_recruiters_30d", 0) >= 10:
        score += 4
    elif signals.get("saved_by_recruiters_30d", 0) >= 5:
        score += 2

    # Search visibility
    if signals.get("search_appearance_30d", 0) >= 500:
        score += 3
    elif signals.get("search_appearance_30d", 0) >= 200:
        score += 2

    # Interview completion
    completion = signals.get("interview_completion_rate", 0)

    if completion >= 0.90:
        score += 3
    elif completion >= 0.70:
        score += 2
    elif completion >= 0.50:
        score += 1

    # Short notice period
    notice = signals.get("notice_period_days", 999)

    if notice <= 30:
        score += 2
    elif notice <= 60:
        score += 1

    return score


def skill_match_score(query, candidate_skills):

    query_skills = set(extract_skills(query))

    candidate_skills = {
        skill.lower().strip()
        for skill in candidate_skills
    }

    if not query_skills:
        return 0

    matched = query_skills.intersection(candidate_skills)

    return round(
        (len(matched) / len(query_skills)) * 100,
        2
    )


def final_score(
    semantic_similarity,
    experience_months,
    education,
    skill_score,
    signals,
    certification_score_value,
    required_experience=0,
    required_work_mode=None
):

    semantic = semantic_similarity * 100

    exp = experience_score(experience_months)

    edu = education_score(education)

    recruiter = recruiter_signal_score(signals)

    exp_match = experience_match_score(
        experience_months,
        required_experience
    )

    work_mode = work_mode_score(
        signals,
        required_work_mode
    )

    cert = certification_score_value

    score = (
    semantic * 0.45 +
    exp * 0.15 +
    skill_score * 0.20 +
    edu * 0.10 +
    recruiter +
    exp_match +
    work_mode +
    cert
    )

    return round(score, 2)