const axios = require("axios");

const getPopularMovies = async(req, res) => {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: "pt-BR",
                page: 1
            }
        });
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch popular movies. " });
    }
};

module.exports = {getPopularMovies}