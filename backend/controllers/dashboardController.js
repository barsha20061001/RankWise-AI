const fs = require("fs");
const path = require("path");

exports.getDashboard = async (req, res) => {
  try {

    const filePath = path.join(
      __dirname,
      "../../data/processed/processed_candidates.json"
    );

    const candidates = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );

    const totalCandidates = candidates.length;

    const totalExperience = candidates.reduce(
      (sum, c) => sum + (c.experience_months || 0),
      0
    );

    const averageExperience =
      (totalExperience / totalCandidates / 12).toFixed(1);

    const skills = {};

    candidates.forEach((candidate) => {

      (candidate.skills || []).forEach(skill => {

        skills[skill] = (skills[skill] || 0) + 1;

      });

    });

    const topSkills = Object.entries(skills)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    res.json({

      totalCandidates,

      averageExperience,

      topSkills

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      message: "Dashboard Error"

    });

  }

};