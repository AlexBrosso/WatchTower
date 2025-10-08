const express = require("express");
const router = express.Router();
const {getPopularMovies, getUpcomingMovies, getMovieDetails, getMoviesSearchField, getRecommendedMovies, getTrendingMovies, getMovieCredits} = require("../controllers/moviesController");

const { validateTrendingParams, validateSearchParams, validateMovieId, validatePageParam } = require('../middlewares/validation.middleware');

router.get("/popular", validatePageParam, getPopularMovies);
router.get("/upcoming", validatePageParam, getUpcomingMovies);
router.get("/search", validateSearchParams, getMoviesSearchField);
router.get("/trending/:timeWindow", validateTrendingParams, validatePageParam, getTrendingMovies);
router.get("/:id/recommendations", validateMovieId, validatePageParam, getRecommendedMovies);
router.get("/:id/credits", validateMovieId, getMovieCredits);
router.get("/:id", validateMovieId, getMovieDetails);

module.exports = router;