import os
import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

from ranking import (
    final_score,
    skill_match_score
)

from explain import generate_explanation

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

INDEX = faiss.read_index(
    os.path.join(BASE_DIR, "..", "models", "candidate_index.faiss")
)

with open(
    os.path.join(BASE_DIR, "..", "models", "candidate_mapping.json"),
    encoding="utf-8"
) as f:
    candidate_mapping = json.load(f)

with open(
    os.path.join(
        BASE_DIR,
        "..",
        "data",
        "processed",
        "processed_candidates.json"
    ),
    encoding="utf-8"
) as f:
    candidates = json.load(f)

candidate_lookup = {
    c["candidate_id"]: c
    for c in candidates
}


def search(query, k=10):

    embedding = MODEL.encode(
        [query],
        convert_to_numpy=True
    ).astype("float32")

    distances, indices = INDEX.search(embedding, k)

    results = []

    for distance, idx in zip(distances[0], indices[0]):

        cid = candidate_mapping[idx]

        candidate = candidate_lookup[cid]

    # Convert FAISS distance into a similarity value (0-1)
        semantic_similarity = 1 / (1 + float(distance))

        skill_score = skill_match_score(
            query,
            candidate["skills"]
        )

        overall = final_score(
            semantic_similarity,
            candidate["experience_months"],
            candidate["education"],
            skill_score
        )

        explanation = generate_explanation(
        candidate,
        semantic_similarity * 100,
        skill_score,
        query
        )

        results.append({

            "candidate_id": cid,

            "semantic_similarity": round(semantic_similarity * 100, 2),

            "skill_match": round(skill_score, 2),

            "overall_score": overall,

            "explanation": explanation,

            "profile_text": candidate["profile_text"],

            "skills": candidate["skills"],

            "experience_months": candidate["experience_months"],

            "education": candidate["education"]

        })

    results.sort(
        key=lambda x: x["overall_score"],
        reverse=True
    )

    return results