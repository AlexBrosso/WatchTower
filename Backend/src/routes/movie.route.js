const express = require("express");
const router = express.Router();
const {getPopularMovies, getUpcomingMovies, getMovieDetails, getMoviesSearchField, getRecommendedMovies, getTrendingMovies, getMovieCredits} = require("../controllers/movie.controller");

const validate = require("../middlewares/validate.middleware");
const { movieIdParams, trendingParams, pageQuery, searchQuery } = require("../validations/movies.validation")

router.get("/popular", validate(pageQuery, "query"), getPopularMovies);
router.get("/upcoming", validate(pageQuery, "query"), getUpcomingMovies);
router.get("/search", validate(searchQuery, "query"), getMoviesSearchField);
router.get("/trending/:timeWindow", validate(trendingParams, "params"), getTrendingMovies);
router.get("/:id/recommendations", validate(movieIdParams, "params"), validate(pageQuery, "query"), getRecommendedMovies);
router.get("/:id/credits", validate(movieIdParams, "params"), getMovieCredits);
router.get("/:id", validate(movieIdParams, "params"), getMovieDetails);

module.exports = router;