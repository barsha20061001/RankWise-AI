const express = require("express");
const router = express.Router();

const { searchCandidates } = require("../controllers/searchController");

router.post("/search", searchCandidates);

module.exports = router;