# RankWise AI 

> AI-powered Resume Ranking & Semantic Candidate Search using FAISS, Sentence Transformers, and Explainable AI.

##  Overview

RankWise AI is an intelligent recruitment platform that helps recruiters find the most relevant candidates from a large resume database using AI-powered semantic search instead of traditional keyword matching.

Unlike conventional Applicant Tracking Systems (ATS), RankWise AI understands the meaning behind job descriptions and resumes, ranks candidates intelligently, and explains why each candidate was recommended.

---

#  Features

###  Semantic Candidate Search

- Uses Sentence Transformers (all-MiniLM-L6-v2)
- Understands context instead of exact keyword matches
- Retrieves candidates using FAISS vector search

---

###  Intelligent Candidate Ranking

Candidates are ranked using multiple weighted factors:

- Semantic Similarity
- Skill Match
- Experience Score
- Education Score
- Recruiter Signals
- Experience Requirement Match
- Work Mode Match
- Certification Match

---

###  Explainable AI

Every recommendation includes AI-generated explanations such as:

- Relevant profile based on semantic search
- Experience level
- Matched skills
- Education details
- Recruiter activity
- Notice period
- Interview completion rate
- Relevant certifications

This makes the ranking transparent and recruiter-friendly.

---

###  Score Breakdown

Every candidate includes a detailed score breakdown:

- Semantic Similarity
- Skill Match
- Experience
- Education
- Recruiter Signals
- Certification Score
- Experience Match
- Work Mode Match

---

###  Fast Retrieval

Uses Facebook AI Similarity Search (FAISS) for efficient nearest-neighbor search over large candidate datasets.

Supports searching across 100,000+ candidate profiles in seconds.

---

#  Project Architecture

```
RankWise-AI
│
├── ai/
│   ├── preprocess.py
│   ├── generate_embeddings.py
│   ├── build_faiss_index.py
│   ├── search_engine.py
│   ├── ranking.py
│   ├── explain.py
│   ├── certification_matcher.py
│   ├── skill_extractor.py
│   ├── job_parser.py
│   ├── search_api.py
│   └── test_search.py
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── data/
│   ├── raw/
│   └── processed/
│
├── models/
│   ├── candidate_index.faiss
│   ├── candidate_mapping.json
│   └── embeddings.npy
│
├── requirements.txt
└── README.md
```

---

#  Tech Stack

### AI

- Python
- Sentence Transformers
- FAISS
- NumPy

### Backend

- Node.js
- Express.js

### Data

- JSON
- NumPy

---

#  AI Pipeline

```
Candidate Dataset
        │
        ▼
Preprocessing
        │
        ▼
Sentence Embeddings
        │
        ▼
FAISS Index
        │
        ▼
Job Description
        │
        ▼
Semantic Search
        │
        ▼
Dynamic Ranking Engine
        │
        ▼
Explainable AI
        │
        ▼
Top Ranked Candidates
```

---

#  Ranking Formula

Overall candidate ranking is calculated using:

```
Overall Score =
0.45 × Semantic Similarity +
0.20 × Skill Match +
0.15 × Experience +
0.10 × Education +
Recruiter Signals +
Experience Match +
Work Mode Match +
Certification Score
```

---

#  Installation

## Clone Repository

```bash
git clone https://github.com/<your-username>/RankWise-AI.git

cd RankWise-AI
```

---

## Install Python Dependencies

```bash
pip install -r requirements.txt
```

---

## Install Backend Dependencies

```bash
cd backend

npm install
```

---

# ▶ Running the AI Engine

Generate embeddings

```bash
python ai/generate_embeddings.py
```

Build FAISS Index

```bash
python ai/build_faiss_index.py
```

Test semantic search

```bash
python ai/test_search.py
```

---

# ▶ Running Backend

```bash
cd backend

npm start
```

Backend runs on

```
http://localhost:5000
```

---

#  API

## Search Candidates

### POST

```
/api/search
```

### Request

```json
{
    "query": "Python backend developer with Docker and AWS"
}
```

### Response

```json
{
    "results":[
        {
            "candidate_id":"CAND_001",
            "overall_score":84.2,
            "semantic_similarity":73.5,
            "skill_match":80,
            "score_breakdown":{},
            "explanation":[]
        }
    ]
}
```

---

#  Explainable AI Example

```
Relevant profile based on semantic search.

8 years of professional experience (Experienced)

Matched required skills:
Docker
Python

M.Tech in Computer Science from IIT Delhi

Saved by recruiters 18 times

Interview completion rate: 92%
```

---

#  Dataset

The project uses a structured candidate dataset containing:

- Candidate Profile
- Skills
- Experience
- Education
- Certifications
- Recruiter Signals
- Notice Period
- Work Mode
- Resume Metadata

---

#  Current Progress

##  Completed

- Candidate preprocessing
- Resume embedding generation
- FAISS indexing
- Semantic search
- Dynamic job parser
- Skill extraction
- Experience scoring
- Education scoring
- Recruiter signal scoring
- Experience requirement matching
- Work mode matching
- Certification matching
- Explainable AI
- Express backend API
- Backend testing

##  In Progress

- React Frontend
- Candidate Dashboard
- Search Interface
- Visualization
- Deployment

---

#  Future Improvements

- Resume Upload
- PDF Parsing
- LLM-powered Resume Summaries
- Recruiter Authentication
- Candidate Shortlisting
- Advanced Analytics Dashboard
- Cloud Deployment
- Multi-language Resume Support

---

# 👨‍💻 Author

Developed as an AI-powered recruitment platform for hackathon and learning purposes.

---

#  If you found this project useful, consider giving it a star!
