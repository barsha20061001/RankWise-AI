# ============================
# Create Profile Text
# ============================

def create_profile_text(profile):
    """
    Combines important profile fields into one text
    for semantic search (embeddings).
    """

    parts = []

    if profile.get("headline"):
        parts.append(profile["headline"])

    if profile.get("summary"):
        parts.append(profile["summary"])

    if profile.get("current_title"):
        parts.append(f"Current Role: {profile['current_title']}")

    if profile.get("current_company"):
        parts.append(f"Company: {profile['current_company']}")

    if profile.get("location"):
        parts.append(f"Location: {profile['location']}")

    if profile.get("country"):
        parts.append(f"Country: {profile['country']}")

    return "\n".join(parts)


# ============================
# Clean Skills
# ============================

def clean_skills(skills):
    """
    Extract only skill names.
    """

    cleaned = []

    for skill in skills:
        name = skill.get("name", "").strip().lower()

        if name:
            cleaned.append(name)

    return list(set(cleaned))


# ============================
# Calculate Total Experience
# ============================

def total_experience(career_history):
    """
    Returns total experience in months.
    """

    total = 0

    for job in career_history:
        total += job.get("duration_months", 0)

    return total