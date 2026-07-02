import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_FILE = os.path.join(
    BASE_DIR,
    "..",
    "data",
    "processed",
    "processed_candidates.json"
)


def load_skill_vocabulary():

    with open(DATA_FILE, "r", encoding="utf-8") as file:
        candidates = json.load(file)

    vocabulary = set()

    for candidate in candidates:

        for skill in candidate.get("skills", []):

            vocabulary.add(
                skill.lower().strip()
            )

    return vocabulary


SKILL_VOCABULARY = load_skill_vocabulary()


def extract_skills(query):

    words = query.lower().replace(",", " ").split()

    extracted = []

    for word in words:

        if word in SKILL_VOCABULARY:

            extracted.append(word)

    return extracted