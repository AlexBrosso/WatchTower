const tmdb = require('../services/tmdbClient');

exports.getPopularMovies = async (req, res) => {
  const { data } = await tmdb.get('/movie/popular', { params: { page: 1 } });
  res.json(data.results);
};