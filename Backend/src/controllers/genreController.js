const tmdb = require("../services/tmdbClient");
const AppError = require("../utils/AppError");

const getGenres = async (req, res) => {
    const { data } = await tmdb.get('/genre/movie/list', {
        params: {
            lenguage: "pt-BR",
        }
    });

    const genreMap = {};
    data.genres.forEach(item => { genreMap[item.id] = item.name })

    res.json(genreMap)
}

module.exports = getGenres 