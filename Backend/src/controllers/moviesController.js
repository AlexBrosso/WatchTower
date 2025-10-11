const tmdb = require("../services/tmdbClient");
const { getCache, setCache, secondsUntilTomorrow, secondsUntilNextSunday } = require("../utils/cache")

const getPopularMovies = async (req, res) => {
  const { page } = req.query;
  const cacheKey = `popular_page_${page || 1}`;
  
  const cached = await getCache(cacheKey);
  if(cached) return res.json(cached);

  const { data } = await tmdb.get("/movie/popular", { 
    params: { 
      language: "pt-BR",
      page: page || 1 
    } 
  });

  const result = {
    page: data.page,
    total_pages: data.total_pages,
    total_results: data.total_results,
    results: data.results
  };

  await setCache(cacheKey, result, secondsUntilTomorrow());
  res.json(result);

};

const getUpcomingMovies = async (req, res) => {
  const { page } = req.query;
  const cacheKey = `upcoming_page_${page || 1}`;
  
  const cached = await getCache(cacheKey);
  if(cached) return res.json(cached);

  const { data } = await tmdb.get("/movie/upcoming", { 
    params: { 
      language: "pt-BR",
      page: page || 1 
    } 
  });

  const result = {
    page: data.page,
    total_pages: data.total_pages,
    total_results: data.total_results,
    results: data.results
  };

  await setCache(cacheKey, result, secondsUntilTomorrow());
  res.json(result);

};

const getMovieDetails = async (req, res) => {
    const movieId = req.params.id;

    const { data } = await tmdb.get(`/movie/${movieId}`, { params: { language: "pt-BR" } });
    res.json(data);
};

const getMoviesSearchField = async (req, res) => {
  const { query, year, page } = req.query;

  const { data } = await tmdb.get("/search/movie", {
    params: {
      query: query,
      include_adult: true,
      language: 'pt-BR',
      page: page || 1,
      primary_release_year: year
    }
  });

  res.json({
    page: data.page,
    total_pages: data.total_pages,
    total_results: data.total_results,
    results: data.results
  });

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

  res.json({
    page: data.page,
    total_pages: data.total_pages,
    total_results: data.total_results,
    results: data.results
  });

};

const getTrendingMovies = async (req, res) => {
  const timeWindow = req.params.timeWindow;
  const cacheKey = `trending_timeWindow_${timeWindow}`;

  const cached = await getCache(cacheKey);
  if (cached) return res.json(cached);

  const { data } = await tmdb.get(`/trending/movie/${timeWindow}`, { 
    params: { 
      language: "pt-BR",
    } 
  });

  const result = {
    page: 1,
    total_pages: 1,
    total_results: data.results.length,
    results: data.results
  };

  await setCache(cacheKey, result, timeWindow == "day" ? secondsUntilTomorrow() : secondsUntilNextSunday());
  res.json(result);
  
};

const getMovieCredits = async (req, res) => {
  const movieId = req.params.id;

  const { data } = await tmdb.get(`/movie/${movieId}/credits`, { 
    params: { 
      language: "pt-BR",
    } 
  });

  res.json(data);
};

module.exports = {getPopularMovies, getUpcomingMovies, getMovieDetails, getMoviesSearchField, getRecommendedMovies, getTrendingMovies, getMovieCredits}