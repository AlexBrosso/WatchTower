const express = require("express")
const router = express.Router();
const { getPopularMovies } = require("../controllers/moviesController");

router.get("/popular", getPopularMovies);

module.exports = router;