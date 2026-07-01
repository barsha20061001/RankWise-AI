import json
import os
import numpy as np

from tqdm import tqdm
from sentence_transformers import SentenceTransformer

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

INPUT_FILE = os.path.join(
    BASE_DIR,
    "..",
    "data",
    "processed",
    "processed_candidates.json"
)

MODELS_DIR = os.path.join(
    BASE_DIR,
    "..",
    "models"
)

EMBEDDINGS_FILE = os.path.join(
    MODELS_DIR,
    "embeddings.npy"
)

MAPPING_FILE = os.path.join(
    MODELS_DIR,
    "candidate_mapping.json"
)


os.makedirs(MODELS_DIR, exist_ok=True)

print("=" * 50)
print("Loading processed candidates...")

with open(INPUT_FILE, "r", encoding="utf-8") as file:
    candidates = json.load(file)

print(f"Loaded {len(candidates)} candidates.")
print("=" * 50)


print("Loading embedding model...")

model = SentenceTransformer("all-MiniLM-L6-v2")

print("Embedding model loaded successfully!")
print("=" * 50)


embeddings = []
candidate_mapping = []


print("Generating embeddings...")
print("=" * 50)

BATCH_SIZE = 128

for start in tqdm(
    range(0, len(candidates), BATCH_SIZE),
    desc="Embedding Candidates"
):

    batch = candidates[start:start + BATCH_SIZE]

    texts = [
        candidate["profile_text"]
        for candidate in batch
    ]

    batch_embeddings = model.encode(
        texts,
        convert_to_numpy=True,
        show_progress_bar=False
    )

    embeddings.extend(batch_embeddings)

    candidate_mapping.extend(
        candidate["candidate_id"]
        for candidate in batch
    )


print("=" * 50)
print("Converting embeddings to NumPy array...")

embeddings = np.array(
    embeddings,
    dtype=np.float32
)

print("Embedding matrix shape:", embeddings.shape)


print("=" * 50)
print("Saving embeddings...")

np.save(
    EMBEDDINGS_FILE,
    embeddings
)

print("Embeddings saved successfully!")


print("=" * 50)
print("Saving candidate mapping...")

with open(
    MAPPING_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        candidate_mapping,
        file,
        indent=4
    )

print("Candidate mapping saved successfully!")


print("=" * 50)
print("Embedding generation completed successfully!")
print(f"Total candidates: {len(candidate_mapping)}")
print(f"Embedding shape: {embeddings.shape}")
print("=" * 50)
