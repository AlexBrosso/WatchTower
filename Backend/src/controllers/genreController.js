const tmdb = require("../services/tmdbClient");
const { getCache, setCache, secondsUntilTomorrow } = require("../utils/cache");

const getGenres = async (req, res) => {
    const cacheKey = "genres"

    const cached = await getCache(cacheKey);
    if(cached){
        console.log(`Cache HIT: ${cacheKey}`);
        return res.json(cached);
    };

    const { data } = await tmdb.get("/genre/movie/list", {
        params: {
            lenguage: "pt-BR",
        }
    });

    const genreMap = {};
    data.genres.forEach(item => { genreMap[item.id] = item.name });

    setCache(cacheKey, genreMap, secondsUntilTomorrow());
    console.log(`Cache MISS: ${cacheKey}`);
    res.json(genreMap)
}

module.exports = getGenres 