const express = require("express");
const cors = require("cors");

const searchRoutes = require("./routes/searchRoutes");

const app = express();



const dashboardRoutes=require("./routes/dashboardRoutes");

const candidateRoutes=require("./routes/candidateRoutes");

const analyticsRoutes=require("./routes/analyticsRoutes");

// =============================
// Middleware
// =============================

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============================
// Routes
// =============================

app.use("/api/dashboard",dashboardRoutes);

app.use("/api/candidates",candidateRoutes);

app.use("/api/analytics",analyticsRoutes);

app.use("/api", searchRoutes);

app.get("/", (req, res) => {
  res.send("RankWise AI Backend Running");
});

// =============================
// Server
// =============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});