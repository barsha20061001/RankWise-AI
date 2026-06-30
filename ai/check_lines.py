import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

path = os.path.join(BASE_DIR, "..", "data", "raw", "candidates.jsonl")

count = 0

with open(path, "r", encoding="utf-8") as f:
    for line in f:
        count += 1

print("Total lines:", count)