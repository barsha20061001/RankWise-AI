import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

path = os.path.join(BASE_DIR, "..", "data", "raw", "candidates.jsonl")

with open(path, "r", encoding="utf-8") as f:
    first = json.loads(f.readline())

print(first.keys())