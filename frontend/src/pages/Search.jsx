import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function SearchPage() {

  const [query, setQuery] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {

    if (!query.trim()) return;

    try {

      setLoading(true);

      const res = await api.post("/search", {
        query,
      });

      console.log(res.data);

      localStorage.setItem(
        "searchResults",
        JSON.stringify(res.data)
      );

      alert("Search completed successfully!");

    } catch (err) {

    console.error("FULL ERROR:", err);

    if (err.response) {
        console.log("Response:", err.response.data);
        console.log("Status:", err.response.status);
    }

    alert("Search failed");


    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-6xl mx-auto">

      <motion.div
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        className="rounded-3xl bg-[#0F172A] border border-white/10 p-10"
      >

        <div className="flex items-center gap-3 mb-3">

          <Sparkles className="text-cyan-400"/>

          <h1 className="text-4xl font-bold">

            AI Candidate Search

          </h1>

        </div>

        <p className="text-gray-400 mb-8">

          Paste a complete job description below.

        </p>

        <textarea

          rows={12}

          value={query}

          onChange={(e)=>setQuery(e.target.value)}

          placeholder="Example:

Looking for a Python Backend Developer with Docker, FastAPI, REST APIs and AWS..."

          className="w-full rounded-2xl bg-[#07101F] border border-white/10 p-6 text-lg outline-none"

        />

        <button

          onClick={handleSearch}

          disabled={loading}

          className="mt-8 flex items-center gap-3 rounded-xl bg-cyan-500 px-8 py-4 text-lg font-semibold hover:bg-cyan-600 transition"

        >

          <Search/>

          {

            loading

            ?

            "Searching..."

            :

            "Search Candidates"

          }

        </button>

      </motion.div>

    </div>

  );

}