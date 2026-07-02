import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Brain,
  Award,
  ArrowRight,
} from "lucide-react";

import api from "../services/api";

export default function Dashboard() {
  const [dashboard, setDashboard] =useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const res = await api.get("/dashboard");
      setDashboard(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center text-white text-2xl mt-20">
        Loading Dashboard...
      </div>
    );
  }

  const stats = [
    {
      title: "Candidates",
      value: dashboard.totalCandidates,
      icon: Users,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Average Experience",
      value: `${dashboard.averageExperience} Years`,
      icon: TrendingUp,
      color: "from-violet-500 to-purple-600",
    },
    {
      title: "Top Skills",
      value: dashboard.topSkills.length,
      icon: Brain,
      color: "from-emerald-500 to-green-600",
    },
    {
      title: "AI Search Ready",
      value: "100%",
      icon: Award,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-600/20 via-blue-500/10 to-violet-600/20 p-10"
      >
        <p className="text-cyan-300 font-semibold">
          Welcome Back 👋
        </p>

        <h1 className="mt-3 text-5xl font-black">
          AI Powered Candidate Ranking
        </h1>

        <p className="mt-5 text-gray-300 max-w-3xl">
          Search thousands of candidates using semantic search,
          AI ranking, recruiter signals and explainable AI.
        </p>

        <button
          className="mt-8 flex items-center gap-3 rounded-xl
          bg-cyan-500 px-6 py-4 font-semibold
          hover:bg-cyan-600 transition"
        >
          Start Searching
          <ArrowRight size={18} />
        </button>
      </motion.div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl bg-[#0F172A]
              border border-white/10 p-6"
            >

              <div
                className={`mb-6 flex h-14 w-14
                items-center justify-center rounded-xl
                bg-gradient-to-r ${item.color}`}
              >

                <Icon size={26} />

              </div>

              <p className="text-gray-400">

                {item.title}

              </p>

              <h2 className="mt-2 text-4xl font-bold">

                {item.value}

              </h2>

            </motion.div>

          );

        })}

      </div>

      {/* Bottom Section */}

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Top Skills */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl bg-[#0F172A]
          border border-white/10 p-7"
        >

          <h2 className="text-2xl font-bold mb-6">

            Top Skills In Dataset

          </h2>

          <div className="space-y-4">

            {dashboard.topSkills.map(([skill, count]) => (

              <div
                key={skill}
                className="flex items-center justify-between
                rounded-xl bg-white/5 p-4"
              >

                <span className="capitalize">

                  {skill}

                </span>

                <span
                  className="rounded-full
                  bg-cyan-500 px-3 py-1 text-sm"
                >

                  {count}

                </span>

              </div>

            ))}

          </div>

        </motion.div>

        {/* Project Info */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl bg-[#0F172A]
          border border-white/10 p-7"
        >

          <h2 className="text-2xl font-bold mb-6">

            AI Pipeline

          </h2>

          <div className="space-y-5">

            <div className="rounded-xl bg-white/5 p-4">
              ✅ Semantic Search (Sentence Transformers)
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              ✅ FAISS Vector Search
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              ✅ Intelligent Ranking Engine
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              ✅ Recruiter Signal Analysis
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              ✅ Explainable AI
            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}