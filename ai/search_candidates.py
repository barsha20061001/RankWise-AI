import os
import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

print("=" * 60)
print("Loading Search Engine...")
print("=" * 60)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

INDEX_FILE = os.path.join(
    BASE_DIR,
    "..",
    "models",
    "candidate_index.faiss"
)

EMBEDDINGS_FILE = os.path.join(
    BASE_DIR,
    "..",
    "models",
    "embeddings.npy"
)

MAPPING_FILE = os.path.join(
    BASE_DIR,
    "..",
    "models",
    "candidate_mapping.json"
)

PROCESSED_FILE = os.path.join(
    BASE_DIR,
    "..",
    "data",
    "processed",
    "processed_candidates.json"
)

print("Loading model...")
model = SentenceTransformer(MODEL_NAME)

print("Loading FAISS index...")
index = faiss.read_index(INDEX_FILE)

print("Loading candidate mapping...")
with open(MAPPING_FILE, "r", encoding="utf-8") as f:
    candidate_mapping = json.load(f)

print("Loading processed candidates...")
with open(PROCESSED_FILE, "r", encoding="utf-8") as f:
    candidates = json.load(f)

candidate_lookup = {
    candidate["candidate_id"]: candidate
    for candidate in candidates
}

print("Ready!")
print("=" * 60)

while True:

    query = input("\nEnter recruiter search (or 'exit'): ")

    if query.lower() == "exit":
        break

    query_embedding = model.encode(
        [query],
        convert_to_numpy=True
    ).astype("float32")

    distances, indices = index.search(query_embedding, 5)

    print("\nTop Matches\n")

    for rank, idx in enumerate(indices[0], start=1):

        candidate_id = candidate_mapping[idx]

        candidate = candidate_lookup[candidate_id]

        print("=" * 60)
        print(f"Rank #{rank}")
        print("Candidate:", candidate_id)
        print("Distance :", distances[0][rank-1])
        print()

        print(candidate["profile_text"][:300])
        print()

        print("Skills:")
        print(", ".join(candidate["skills"][:15]))
        print("=" * 60)