import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaGithub,
  FaUsers,
  FaClock,
  FaMoneyBillWave,
  FaArrowLeft,
} from "react-icons/fa";

import api from "../api/api";
import "./CandidateDetails.css";

export default function CandidateDetails() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    api.get(`/candidate/${id}`).then((res) => setCandidate(res.data));
  }, [id]);

  if (!candidate)
    return <div className="loading">Loading Candidate...</div>;

  const career = candidate.career_history?.[0];
  const education = candidate.education?.[0];
  const signals = candidate.signals;

  const experience = (
    candidate.experience_months / 12
  ).toFixed(1);

  return (
    <div className="candidate-details">

      <Link to="/candidates" className="back-btn">
        <FaArrowLeft /> Back to Candidates
      </Link>

      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-left">

            <div className="avatar">
              {(career?.title || "P").charAt(0)}
            </div>

            <div>

              <h1>{career?.title || "Professional"}</h1>

              <p>{career?.company}</p>

              <span>
                <FaMapMarkerAlt /> Toronto, Canada
              </span>

            </div>

          </div>

          <div className="match-score">
            <small>AI MATCH</small>
            <h2>{signals.profile_completeness_score}%</h2>
          </div>

        </div>

        <div className="summary">
          <h3>Professional Summary</h3>

          <p>{candidate.profile_text}</p>
        </div>

        <div className="skills">

          <h3>Skills</h3>

          <div className="skill-list">

            {candidate.skills.map((skill) => (
              <span className="skill" key={skill}>
                {skill}
              </span>
            ))}

          </div>

        </div>

        <div className="info-grid">

          <div className="info-card">

            <FaBriefcase />

            <h4>Experience</h4>

            <p>{experience} Years</p>

          </div>

          <div className="info-card">

            <FaGraduationCap />

            <h4>Education</h4>

            <p>
              {education
                ? education.degree
                : "Not Available"}
            </p>

          </div>

          <div className="info-card">

            <FaGithub />

            <h4>GitHub Score</h4>

            <p>{signals.github_activity_score}</p>

          </div>

          <div className="info-card">

            <FaUsers />

            <h4>Recruiter Saves</h4>

            <p>{signals.saved_by_recruiters_30d}</p>

          </div>

          <div className="info-card">

            <FaClock />

            <h4>Notice Period</h4>

            <p>{signals.notice_period_days} Days</p>

          </div>

          <div className="info-card">

            <FaMoneyBillWave />

            <h4>Salary</h4>

            <p>
              ₹
              {signals.expected_salary_range_inr_lpa.min}
              L -
              ₹
              {signals.expected_salary_range_inr_lpa.max}
              LPA
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}