print("Running:", __file__)

import json
import os

from utils import (
    create_profile_text,
    clean_skills,
    total_experience
)


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

INPUT_FILE = os.path.join(
    BASE_DIR,
    "..",
    "data",
    "raw",
    "candidates.jsonl"
)

OUTPUT_FILE = os.path.join(
    BASE_DIR,
    "..",
    "data",
    "processed",
    "processed_candidates.json"
)

processed_candidates = []


with open(INPUT_FILE, "r", encoding="utf-8") as file:
    for i, line in enumerate(file, start=1):
        try:
            candidate = json.loads(line)

            profile = candidate.get("profile", {})
            career = candidate.get("career_history", [])
            skills = candidate.get("skills", [])
            education = candidate.get("education", [])
            certifications = candidate.get("certifications", [])
            languages = candidate.get("languages", [])
            signals = candidate.get("redrob_signals", {})

            processed_candidate = {
                "candidate_id": candidate.get("candidate_id"),
                "profile_text": create_profile_text(profile),
                "skills": clean_skills(skills),
                "experience_months": total_experience(career),
                "career_history": career,
                "education": education,
                "certifications": certifications,
                "languages": languages,
                "signals": signals
            }

            processed_candidates.append(processed_candidate)

            if i % 10000 == 0:
                print(f"Read {i} candidates")

        except Exception as e:
            print(f"Error on candidate {i}: {e}")
            raise




with open(OUTPUT_FILE, "w", encoding="utf-8") as file:

    json.dump(
        processed_candidates,
        file,
        indent=4
    )

print("Processing Completed!")

print("Candidates Processed:", len(processed_candidates))