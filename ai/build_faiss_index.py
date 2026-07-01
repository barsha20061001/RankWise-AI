import os
import json
import faiss
import numpy as np

print("=" * 50)
print("Building FAISS Index...")
print("=" * 50)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

EMBEDDINGS_FILE = os.path.join(
    BASE_DIR,
    "..",
    "models",
    "embeddings.npy"
)

INDEX_FILE = os.path.join(
    BASE_DIR,
    "..",
    "models",
    "candidate_index.faiss"
)

MAPPING_FILE = os.path.join(
    BASE_DIR,
    "..",
    "models",
    "candidate_mapping.json"
)

print("Loading embeddings...")
embeddings = np.load(EMBEDDINGS_FILE)

print("Embedding shape:", embeddings.shape)

embeddings = embeddings.astype("float32")

dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(dimension)

print("Adding embeddings to index...")
index.add(embeddings)

print("Total vectors:", index.ntotal)

faiss.write_index(index, INDEX_FILE)

print("FAISS index saved!")

with open(MAPPING_FILE, "r", encoding="utf-8") as file:
    mapping = json.load(file)

print("Candidate mapping loaded.")
print("Candidates:", len(mapping))

print("=" * 50)
print("Done!")
print("=" * 50)