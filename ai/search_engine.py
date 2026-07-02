import os
import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

from ranking import (
    final_score,
    skill_match_score,
    experience_score,
    education_score,
    recruiter_signal_score,
    experience_match_score,
    work_mode_score
)

from explain import generate_explanation
from job_parser import parse_job_description
from certification_matcher import certification_score

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

    job = parse_job_description(query)

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

        semantic_component = round((semantic_similarity * 100) * 0.45, 2)

        experience_component = round(
          experience_score(candidate["experience_months"]) * 0.15,
           2
        )

        skills_component = round(
          skill_score * 0.20,
           2
        )

        education_component = round(
           education_score(candidate["education"]) * 0.10,
            2
        )       

        recruiter_component = recruiter_signal_score(
           candidate["signals"]
        )

        experience_match_component = experience_match_score(
           candidate["experience_months"],
           job["experience"]   
        )

        work_mode_component = work_mode_score(
            candidate["signals"],
            job["work_mode"]
        )

        cert_component, matched_certifications = certification_score(
              candidate["certifications"],
              job
        )

        overall = final_score(
            semantic_similarity,
            candidate["experience_months"],
            candidate["education"],
            skill_score,
            candidate["signals"],
            cert_component,
            job["experience"],
            job["work_mode"]
        )

        explanation = generate_explanation(
        candidate,
        semantic_similarity * 100,
        skill_score,
        query,
        matched_certifications
        )

        results.append({

           "candidate_id": cid,

           "semantic_similarity": round(
              semantic_similarity * 100,
              2
           ),

           "skill_match": round(
              skill_score,
              2
           ),

           "overall_score": overall,

           "score_breakdown": {

              "semantic": round(
              semantic_similarity * 100,
               2
              ),

              "skills": round(
               skill_score,
               2
               ),

              "experience": experience_score(
                candidate["experience_months"]
               ),   

              "education": education_score(
               candidate["education"]
               ),

              "recruiter_signals": recruiter_signal_score(
                candidate["signals"]
               ),

               "certification_score": cert_component,

              "experience_match": experience_match_score(
                candidate["experience_months"],
                job["experience"]
               ),

              "work_mode": work_mode_score(
                 candidate["signals"],
                 job["work_mode"]
              )
            },

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