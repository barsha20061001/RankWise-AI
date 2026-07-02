import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Candidates from "./pages/Candidates";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import CandidateDetails from "./pages/CandidateDetails";


function App() {
  return (
    <div className="flex min-h-screen bg-[#07101F] text-white">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 p-8">

          <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/search" element={<Search />} />
  <Route path="/candidates" element={<Candidates />} />
  <Route path="/candidate/:id" element={<CandidateDetails />} />
  <Route path="/analytics" element={<Analytics />} />
  <Route path="/candidate/:id" element={<CandidateDetails />} />
  <Route path="/settings" element={<Settings />} />
</Routes>

        </main>

      </div>

    </div>
  );
}

export default App;