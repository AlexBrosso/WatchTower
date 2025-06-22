const express = require("express");
const router = express.Router();
const {getPopularMovies, getUpcomingMovies, getMovieDetails, getMoviesSearchField, getRecommendedMovies, getTrendingMovies} = require("../controllers/moviesController");

router.get("/popular", getPopularMovies);
router.get("/upcoming", getUpcomingMovies);
router.get("/search", getMoviesSearchField);
router.get("/trending/:timeWindow", getTrendingMovies);
router.get("/:id/recommendations", getRecommendedMovies);
router.get("/:id", getMovieDetails);

module.exports = router;