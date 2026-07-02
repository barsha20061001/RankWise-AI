import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaGithub,
  FaUsers,
  FaArrowRight,
  FaSearch,
  FaSpinner,
} from "react-icons/fa";

import api from "../api/api";
import "./Candidates.css";

export default function Candidates() {

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const LIMIT = 12;

  useEffect(() => {

    loadCandidates();

  }, [page]);

  async function loadCandidates() {

    try {

      setLoading(true);

      const res = await api.get(
        `/candidates?page=${page}&limit=${LIMIT}`
      );

      setCandidates(res.data.candidates);

      setTotal(res.data.total);

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  }

  const filteredCandidates = candidates.filter((candidate) => {

    const text = (
      candidate.profile_text +
      " " +
      candidate.skills.join(" ")
    ).toLowerCase();

    return text.includes(search.toLowerCase());

  });

  return (

    <div className="candidates-page">

      <div className="candidate-header">

        <div>

          <h1>Candidate Directory</h1>

          <p>

            Browse AI indexed talent from the candidate database.

          </p>

        </div>

      </div>

      <div className="candidate-search">

        <FaSearch />

        <input

          type="text"

          placeholder="Search by skills, company or profile..."

          value={search}

          onChange={(e) =>

            setSearch(e.target.value)

          }

        />

      </div>

      {

      loading ?

      (

        <div className="loading">

          <FaSpinner className="spin"/>

          Loading candidates...

        </div>

      )

      :

      (

        <>

          <div className="candidate-grid">

            {

            filteredCandidates.map((candidate)=>{

              const career =

              candidate.career_history?.[0];

              const education =

              candidate.education?.[0];

              const signals =

              candidate.signals;

              const experience =

              Math.floor(

              candidate.experience_months/12

              );

              return(

                <div

                  className="candidate-card"

                  key={candidate.candidate_id}

                >

                




                  <div className="candidate-top">

    <div className="candidate-left">

        <div className="avatar">

            {(career?.title || "P")
                .charAt(0)
                .toUpperCase()}

        </div>

        <div>

            <h2>{career?.title || "Professional"}</h2>

            <span>{candidate.candidate_id}</span>

        </div>

    </div>

    <div className="profile-score">

        <span>AI MATCH</span>

        <h3>{signals.profile_completeness_score}%</h3>

    </div>

</div>

                  <div className="company">

                    <FaBriefcase/>

                    {

                    career?.company ||

                    "Unknown Company"

                    }

                  </div>

                  <div className="location">

                    <FaMapMarkerAlt/>

                    {

                    candidate.profile_text.includes("Location:")

                    ?

                    candidate.profile_text

                    .split("Location:")[1]

                    .split("\n")[0]

                    :

                    "Location unavailable"

                    }

                  </div>

                  <div className="experience">

                    {experience} Years Experience

                  </div>

                  <p className="profile-text">

                    {

                    candidate.profile_text.substring(

                    0,

                    180

                    )

                    }...

                  </p>

                  <div className="skills">


                                    {

                  candidate.skills

                  .slice(0,8)

                  .map((skill)=>(

                    <span

                      className="skill"

                      key={skill}

                    >

                      {skill}

                    </span>

                  ))

                  }

                  </div>

                  <div className="candidate-info-grid">

                    <div>

                      <FaGraduationCap/>

                      <span>

                        {

                        education

                        ?

                        `${education.degree} • ${education.institution}`

                        :

                        "Education unavailable"

                        }

                      </span>

                    </div>

                    <div>

                      <FaGithub/>

                      <span>

                        GitHub Score

                        <strong>

                          {

                          signals.github_activity_score

                          }

                        </strong>

                      </span>

                    </div>

                    <div>

                      <FaUsers/>

                      <span>

                        Recruiter Saves

                        <strong>

                          {

                          signals.saved_by_recruiters_30d

                          }

                        </strong>

                      </span>

                    </div>

                  </div>

                  <div className="stats-grid">

                    <div>

                      <small>

                        Interview Rate

                      </small>

                      <strong>

                        {

                        Math.round(

                        signals.interview_completion_rate*100

                        )

                        }%

                      </strong>

                    </div>

                    <div>

                      <small>

                        Notice

                      </small>

                      <strong>

                        {

                        signals.notice_period_days

                        }

                        Days

                      </strong>

                    </div>

                    <div>

                      <small>

                        Work Mode

                      </small>

                      <strong>

                        {

                        signals.preferred_work_mode

                        }

                      </strong>

                    </div>

                  </div>

                  <div className="salary-card">

                    <small>

                      Expected Salary

                    </small>

                    <h3>

                      ₹

                      {

                      signals

                      .expected_salary_range_inr_lpa

                      .min

                      }

                      LPA

                      —

                      ₹

                      {

                      signals

                      .expected_salary_range_inr_lpa

                      .max

                      }

                      LPA

                    </h3>

                  </div>

                  <div className="candidate-footer">

                    <Link

                      to={

                      `/candidate/${candidate.candidate_id}`

                      }

                    >

                      <button>

                        View Profile

                        <FaArrowRight/>

                      </button>

                    </Link>

                  </div>

                </div>

              );

            })

            }

          </div>

                    <div className="pagination">

            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {Math.ceil(total / LIMIT)}
            </span>

            <button
              disabled={page >= Math.ceil(total / LIMIT)}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>

          </div>

        </>

      )

      }

    </div>

  );

}