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

with open(DATA_FILE, "r", encoding="utf-8") as file:
    candidates = json.load(file)

print("=" * 60)

count = 0

for candidate in candidates:

    education = candidate.get("education", [])

    if education:

        print(education)
        print("-" * 60)

        count += 1

    if count == 10:
        break