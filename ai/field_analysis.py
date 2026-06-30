import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(BASE_DIR, "..", "data", "raw", "candidates.jsonl")

with open(path, "r", encoding="utf-8") as f:
    first = json.loads(f.readline())

for key, value in first.items():
    print("\n" + "=" * 60)
    print(f"FIELD: {key}")
    print(f"TYPE : {type(value)}")

    if isinstance(value, dict):
        print("Keys:")
        for k in value.keys():
            print(" -", k)

    elif isinstance(value, list):
        print("Length:", len(value))
        if len(value) > 0:
            print("First item:")
            print(value[0])

    else:
        print(value)