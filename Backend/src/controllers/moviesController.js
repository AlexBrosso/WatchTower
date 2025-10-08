const tmdb = require('../services/tmdbClient');
const AppError = require('../utils/AppError');

const getPopularMovies = async (req, res) => {
  const { page } = req.query;

  const { data } = await tmdb.get('/movie/popular', { 
    params: { 
      language: "pt-BR",
      page: page || 1 
    } 
  });
  res.json(data.results);
};

const getUpcomingMovies = async (req, res) => {
  const { page } = req.query;

  const { data } = await tmdb.get('/movie/upcoming', { 
    params: { 
      language: "pt-BR",
      page: page || 1 
    } 
  });
  res.json(data);
};

const getMovieDetails = async (req, res) => {
    const movieId = req.params.id;

    const { data } = await tmdb.get(`/movie/${movieId}`, { params: { language: "pt-BR" } });
    res.json(data);
};

const getMoviesSearchField = async (req, res) => {
  const { query, year, page } = req.query;

  const { data } = await tmdb.get('/search/movie', {
    params: {
      query: query,
      include_adult: true,
      language: 'pt-BR',
      page: page || 1,
      primary_release_year: year
    }
  });

  res.json(data);
};

const getRecommendedMovies = async (req, res) => {
  const movieId = req.params.id;
  const { page } = req.query;

  const { data } = await tmdb.get(`/movie/${movieId}/recommendations`, { 
    params: { 
      language: "pt-BR",
      page: page || 1 
    } 
  });

  res.json(data);
};

const getTrendingMovies = async (req, res) => {
  const timeWindow = req.params.timeWindow;

  const { data } = await tmdb.get(`/trending/movie/${timeWindow}`, { 
    params: { 
      language: "pt-BR",
    } 
  });

  res.json(data);
};

module.exports = {getPopularMovies, getUpcomingMovies, getMovieDetails, getMoviesSearchField, getRecommendedMovies, getTrendingMovies}