import { useEffect, useState } from "react";
import {
  FaUsers,
  FaBriefcase,
  FaGraduationCap,
  FaChartLine,
  FaCode,
} from "react-icons/fa";

import api from "../api/api";
import "./Analytics.css";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    api.get("/analytics").then((res) => {
      setAnalytics(res.data);
    });
  }, []);

  if (!analytics) {
    return <div className="loading">Loading Analytics...</div>;
  }

  /* ===========================
      Derived Analytics
  =========================== */

  const totalCandidates = Object.values(
    analytics.education
  ).reduce((sum, value) => sum + value, 0);

  const experienceWeight = {
    Fresher: 0,
    Junior: 2,
    Mid: 5,
    Senior: 9,
  };

  let weightedExperience = 0;

  Object.entries(analytics.experience).forEach(
    ([level, count]) => {
      weightedExperience +=
        experienceWeight[level] * count;
    }
  );

  const averageExperience = (
    weightedExperience / totalCandidates
  ).toFixed(1);

  const topSkill =
    analytics.topSkills?.[0]?.[0] || "N/A";

  const maxExperience = Math.max(
    ...Object.values(analytics.experience)
  );

  const maxEducation = Math.max(
    ...Object.values(analytics.education)
  );

  return (
    <div className="analytics-page">

      <div className="analytics-header">

        <h1>Recruitment Analytics</h1>

        <p>
          AI-powered insights from your candidate database.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="analytics-cards">

        <div className="stat-card">

          <FaUsers />

          <h2>{totalCandidates.toLocaleString()}</h2>

          <p>Total Candidates</p>

        </div>

        <div className="stat-card">

          <FaBriefcase />

          <h2>{averageExperience} yrs</h2>

          <p>Average Experience</p>

        </div>

        <div className="stat-card">

          <FaGraduationCap />

          <h2>
            {Object.keys(analytics.education).length}
          </h2>

          <p>Education Types</p>

        </div>

        <div className="stat-card">

          <FaChartLine />

          <h2>{topSkill}</h2>

          <p>Top Skill</p>

        </div>

      </div>

      {/* Graph Section */}

      <div className="analytics-grid">

        {/* Experience */}

        <div className="analytics-box">

          <h2>Experience Distribution</h2>

          {Object.entries(analytics.experience).map(
            ([level, count]) => (

              <div
                className="progress-item"
                key={level}
              >

                <div className="progress-header">

                  <span>{level}</span>

                  <strong>{count}</strong>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        (count / maxExperience) * 100
                      }%`,
                    }}
                  ></div>

                </div>

              </div>
            )
          )}

        </div>

        {/* Education */}

        <div className="analytics-box">

          <h2>Education Distribution</h2>

          {Object.entries(analytics.education).map(
            ([degree, count]) => (

              <div
                className="progress-item"
                key={degree}
              >

                <div className="progress-header">

                  <span>{degree}</span>

                  <strong>{count}</strong>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        (count / maxEducation) * 100
                      }%`,
                    }}
                  ></div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

      {/* Top Skills */}

      <div className="analytics-box">

        <h2 className="section-title">
               <FaCode />
    Top Trending Skills
           </h2>

        <div className="skills-grid">

          {analytics.topSkills.map(
            ([skill, count]) => (

              <div
                className="skill-card"
                key={skill}
              >

                <h4>{skill}</h4>

                <span>
                  {count.toLocaleString()} Candidates
                </span>

              </div>

            )
          )}

        </div>

      </div>

      {/* AI Insights */}

      <div className="insight-box">

        <h2>AI Insights</h2>

        <ul>

          <li>

            Database contains{" "}
            <strong>
              {totalCandidates.toLocaleString()}
            </strong>{" "}
            indexed candidates.

          </li>

          <li>

            Average candidate experience is{" "}
            <strong>{averageExperience} years</strong>.

          </li>

          <li>

            Most demanded skill is{" "}
            <strong>{topSkill}</strong>.

          </li>

          <li>

            <strong>Senior</strong> professionals form
            the largest experience segment.

          </li>

          <li>

            Education is well distributed across
            undergraduate and postgraduate degrees.

          </li>

        </ul>

      </div>

    </div>
  );
}