from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from search_engine import (
    search,
    candidates,
    candidate_lookup
)

from collections import Counter

app = FastAPI(title="RankWise AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SearchRequest(BaseModel):
    query: str
    k: int = 10


@app.get("/")
def home():
    return {
        "message": "RankWise AI API Running"
    }


@app.post("/search")
def search_candidates(request: SearchRequest):

    return search(
        request.query,
        request.k
    )


@app.get("/dashboard")
def dashboard():

    total = len(candidates)

    avg_exp = round(
        sum(c["experience_months"] for c in candidates)
        /
        total
        /
        12,
        2
    )

    skill_counter = Counter()

    for c in candidates:
        skill_counter.update(c["skills"])

    return {

        "totalCandidates": total,

        "averageExperience": avg_exp,

        "topSkills": skill_counter.most_common(10)

    }


@app.get("/candidates")
def get_candidates(
    page: int = 1,
    limit: int = 20
):

    start = (page - 1) * limit

    end = start + limit

    return {

        "page": page,

        "limit": limit,

        "total": len(candidates),

        "candidates": candidates[start:end]

    }


@app.get("/candidate/{candidate_id}")
def candidate(candidate_id: str):

    return candidate_lookup.get(
        candidate_id,
        {
            "error": "Candidate not found"
        }
    )


@app.get("/analytics")
def analytics():

    exp = {

        "Fresher": 0,

        "Junior": 0,

        "Mid": 0,

        "Senior": 0

    }

    edu = Counter()

    skills = Counter()

    for c in candidates:

        years = c["experience_months"] / 12

        if years < 1:
            exp["Fresher"] += 1

        elif years < 3:
            exp["Junior"] += 1

        elif years < 7:
            exp["Mid"] += 1

        else:
            exp["Senior"] += 1

        for e in c["education"]:
            edu[e["degree"]] += 1

        skills.update(c["skills"])

    return {

        "experience": exp,

        "education": dict(edu),

        "topSkills": skills.most_common(15)

    }