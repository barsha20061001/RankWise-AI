import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA = os.path.join(
    BASE_DIR,
    "..",
    "data",
    "processed",
    "processed_candidates.json"
)

with open(DATA, encoding="utf-8") as f:
    candidates = json.load(f)

count = 0

for candidate in candidates:

    certs = candidate.get("certifications", [])

    if certs:

        print(certs)
        print("-" * 60)

        count += 1

    if count == 10:
        break