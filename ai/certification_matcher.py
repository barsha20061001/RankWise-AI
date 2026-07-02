def certification_score(certifications, job):

    if not certifications:
        return 0, []

    required_skills = {
        skill.lower().strip()
        for skill in job.get("skills", [])
    }

    score = 0
    matched = []

    for cert in certifications:

        cert_name = cert.get("name", "").lower()

        for skill in required_skills:

            if skill in cert_name:

                score += 2

                matched.append(cert["name"])

                break

    return min(score, 10), matched