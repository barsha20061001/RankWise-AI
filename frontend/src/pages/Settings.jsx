import { useState } from "react";
import {
  FaUser,
  FaBell,
  FaLock,
  FaRobot,
  FaMoon,
  FaSave
} from "react-icons/fa";

import "./Settings.css";

export default function Settings() {

  const [settings, setSettings] = useState({

    recruiterName: "Recruiter",

    email: "recruiter@example.com",

    notifications: true,

    aiRanking: true,

    darkMode: true,

    twoFactor: false,

    minimumScore: 70

  });

  function handleChange(e) {

    const { name, value, type, checked } = e.target;

    setSettings({

      ...settings,

      [name]: type === "checkbox" ? checked : value

    });

  }

  function saveSettings() {

    alert("Settings saved successfully!");

    // Later:
    // api.put("/settings", settings)

  }

  return (

    <div className="settings-page">

      <div className="settings-header">

        <h1>Settings</h1>

        <p>
          Manage your recruiter profile and AI preferences.
        </p>

      </div>

      <div className="settings-grid">

        {/* Profile */}

        <div className="settings-card">

          <h2>

            <FaUser />

            Recruiter Profile

          </h2>

          <label>Name</label>

          <input
            type="text"
            name="recruiterName"
            value={settings.recruiterName}
            onChange={handleChange}
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
          />

        </div>

        {/* Notifications */}

        <div className="settings-card">

          <h2>

            <FaBell />

            Notifications

          </h2>

          <div className="toggle-row">

            <span>Email Notifications</span>

            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* AI */}

        <div className="settings-card">

          <h2>

            <FaRobot />

            AI Ranking

          </h2>

          <div className="toggle-row">

            <span>Enable AI Ranking</span>

            <input
              type="checkbox"
              name="aiRanking"
              checked={settings.aiRanking}
              onChange={handleChange}
            />

          </div>

          <label>Minimum Match Score</label>

          <input
            type="range"
            min="50"
            max="100"
            name="minimumScore"
            value={settings.minimumScore}
            onChange={handleChange}
          />

          <div className="score-display">

            {settings.minimumScore}%

          </div>

        </div>

        



        {/* Security */}

        <div className="settings-card full-width">

          <h2>

            <FaLock />

            Security

          </h2>

          <div className="toggle-row">

            <span>Enable Two-Factor Authentication</span>

            <input
              type="checkbox"
              name="twoFactor"
              checked={settings.twoFactor}
              onChange={handleChange}
            />

          </div>

        </div>

      </div>

      <button
        className="save-btn"
        onClick={saveSettings}
      >

        <FaSave />

        Save Settings

      </button>

    </div>

  );

}