import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBriefcase,
  FaCode,
  FaChartLine,
  FaSearch,
  FaArrowRight,
  FaRobot,
  FaCheckCircle,
  FaGraduationCap,
} from "react-icons/fa";

import api from "../api/api";
import "./Dashboard.css";

import ExperienceChart from "../components/ExperienceChart";
import EducationChart from "../components/EducationChart";
import SkillsChart from "../components/SkillsChart";

export default function Dashboard() {

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {

    loadDashboard();

  }, []);

  async function loadDashboard() {

    try {

      const res = await api.get("/analytics");

      setAnalytics(res.data);

    }

    catch (err) {

      console.log(err);

    }

  }

  if (!analytics)
    return <div className="dashboard-loading">Loading Dashboard...</div>;

  /* -------------------------------- */

  const totalCandidates =
    Object.values(analytics.education).reduce(
      (a, b) => a + b,
      0
    );

  const experienceMap = {
    Fresher: 0,
    Junior: 2,
    Mid: 5,
    Senior: 9,
  };

  let weighted = 0;

  Object.entries(analytics.experience).forEach(
    ([level, count]) => {

      weighted += experienceMap[level] * count;

    }
  );

  const averageExperience = (
    weighted / totalCandidates
  ).toFixed(1);

  const topSkill = analytics.topSkills[0][0];

  const maxSkill = analytics.topSkills[0][1];

  return (

    <div className="dashboard-page">

      {/* HERO */}

      <section className="hero-section">

        <div>

        

          <p>

            AI-powered recruitment insights to help you
            discover, rank and hire top talent faster.

          </p>

        </div>

        <div className="hero-buttons">

          <Link to="/search">

            <button className="primary-btn">

              <FaSearch />

              Search Candidates

            </button>

          </Link>

          <Link to="/analytics">

            <button className="secondary-btn">

              <FaChartLine />

              Analytics

            </button>

          </Link>

        </div>

      </section>

      {/* KPI */}

      <section className="stats-grid">

        <div className="stat-card">

          <div className="icon blue">

            <FaUsers />

          </div>

          <div>

            <h2>

              {totalCandidates.toLocaleString()}

            </h2>

            <span>Total Candidates</span>

            <small>

              AI Indexed Database

            </small>

          </div>

        </div>

        <div className="stat-card">

          <div className="icon green">

            <FaBriefcase />

          </div>

          <div>

            <h2>

              {averageExperience} yrs

            </h2>

            <span>Average Experience</span>

            <small>

              Across all profiles

            </small>

          </div>

        </div>

        <div className="stat-card">

          <div className="icon orange">

            <FaCode />

          </div>

          <div>

            <h2>

              {topSkill}

            </h2>

            <span>Most Popular Skill</span>

            <small>

              {maxSkill.toLocaleString()} Candidates

            </small>

          </div>

        </div>

        <div className="stat-card">

          <div className="icon purple">

            <FaRobot />

          </div>

          <div>

            <h2>

              {analytics.topSkills.length}

            </h2>

            <span>Trending Skills</span>

            <small>

              AI detected

            </small>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="dashboard-content">

        {/* LEFT */}

        <div className="left-column">

          <SkillsChart
  skills={analytics.topSkills}
/>

          <ExperienceChart
  data={analytics.experience}
/>

        </div>

        {/* RIGHT */}

        <div className="right-column">

          {/* QUICK ACTIONS */}

          <div className="dashboard-card">

            <h2>

              Quick Actions

            </h2>

            <div className="action-grid">

              <Link to="/search">

                <button>

                  <FaSearch />

                  Search

                </button>

              </Link>

              <Link to="/candidates">

                <button>

                  <FaUsers />

                  Candidates

                </button>

              </Link>

              <Link to="/analytics">

                <button>

                  <FaChartLine />

                  Analytics

                </button>

              </Link>

              <Link to="/settings">

                <button>

                  <FaArrowRight />

                  Settings

                </button>

              </Link>

            </div>

          </div>

          {/* AI INSIGHTS */}

          <div className="dashboard-card">

            <h2>

              AI Insights

            </h2>

            <ul className="insight-list">

              <li>

                <FaCheckCircle />

                Database contains

                <strong>

                  {totalCandidates.toLocaleString()}

                </strong>

                indexed candidates.

              </li>

              <li>

                <FaCheckCircle />

                Average experience is

                <strong>

                  {averageExperience} years.

                </strong>

              </li>

              <li>

                <FaCheckCircle />

                Most demanded skill is

                <strong>

                  {topSkill}.

                </strong>

              </li>

              <li>

                <FaCheckCircle />

                Senior professionals dominate the
                talent pool.

              </li>

              <li>

                <FaCheckCircle />

                Education spans

                <strong>

                  {
                    Object.keys(
                      analytics.education
                    ).length
                  }

                </strong>

                degree categories.

              </li>

            </ul>

          </div>

          <EducationChart
  data={analytics.education}
/>

        </div>

      </section>

    </div>

  );

}