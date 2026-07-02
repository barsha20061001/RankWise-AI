import re

from skill_extractor import extract_skills


def parse_job_description(text):

    text_lower = text.lower()

    # Extract skills
    skills = extract_skills(text)

    # Experience
    experience = 0

    match = re.search(
        r"(\d+)\s*\+?\s*years?",
        text_lower
    )

    if match:
        experience = int(match.group(1))

    # Work mode
    work_mode = None

    if "remote" in text_lower:
        work_mode = "remote"

    elif "hybrid" in text_lower:
        work_mode = "hybrid"

    elif "onsite" in text_lower:
        work_mode = "onsite"

    # Degree
    degree = None

    if "ph.d" in text_lower or "phd" in text_lower:
        degree = "ph.d"

    elif "m.tech" in text_lower:
        degree = "m.tech"

    elif "m.e" in text_lower:
        degree = "m.e"

    elif "b.tech" in text_lower:
        degree = "b.tech"

    elif "b.e" in text_lower:
        degree = "b.e"

    return {
        "skills": skills,
        "experience": experience,
        "work_mode": work_mode,
        "degree": degree
    }