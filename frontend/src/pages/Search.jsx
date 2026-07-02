import { useState } from "react";
import { FaSearch, FaBriefcase, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./Search.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const res = await api.post("/search", {
        query,
        k: 10,
      });

      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">

      <div className="search-header">

        <h1>AI Candidate Search</h1>

        <p>
          Search candidates using semantic AI matching,
          experience, recruiter signals and skills.
        </p>

      </div>

      <div className="search-box">

        <input
          type="text"
          placeholder="Example: Python Backend Developer with Docker and FastAPI..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        <button onClick={handleSearch}>
          <FaSearch />
          Search
        </button>

      </div>

      {loading && (
        <div className="loading-box">
          Searching candidates...
        </div>
      )}

      {!loading && results.length > 0 && (

        <div className="results-container">

          {results.map((candidate) => (

            <div
              className="candidate-card"
              key={candidate.candidate_id}
            >

              <div className="candidate-top">

                <div>

                  <h2>{candidate.candidate_id}</h2>

                  <span>
                    {Math.floor(candidate.experience_months / 12)}
                    {" "}Years Experience
                  </span>

                </div>

                <div className="score-badge">

                  {candidate.overall_score}

                </div>

              </div>

              <p className="profile">

                {candidate.profile_text.substring(0, 180)}...

              </p>

              <div className="skill-list">

                {candidate.skills.slice(0, 8).map((skill) => (

                  <span
                    className="skill-chip"
                    key={skill}
                  >
                    {skill}
                  </span>

                ))}

              </div>

              <div className="stats">

                <div>

                  <FaSearch />

                  Semantic

                  <strong>

                    {candidate.semantic_similarity}%

                  </strong>

                </div>

                <div>

                  <FaBriefcase />

                  Skills

                  <strong>

                    {candidate.skill_match}%

                  </strong>

                </div>

                <div>

                  <FaStar />

                  Overall

                  <strong>

                    {candidate.overall_score}

                  </strong>

                </div>

              </div>

              <div className="candidate-actions">

                <Link
                  to={`/candidate/${candidate.candidate_id}`}
                >

                  <button>

                    View Profile

                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

      {!loading && results.length === 0 && (

        <div className="empty-search">

          Start by searching for a job description.

        </div>

      )}

    </div>
  );
}