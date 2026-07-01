import json
import sys

from search_engine import search

if len(sys.argv) < 2:
    print(json.dumps({"error": "Missing search query"}))
    sys.exit(1)

query = " ".join(sys.argv[1:])

results = search(query, 10)

print(json.dumps(results))