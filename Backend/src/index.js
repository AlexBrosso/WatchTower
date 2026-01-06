const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { createRedisClient } = require("./services/redisClient");
const moviesRoutes = require("./routes/movie.route");
const genresRoutes = require("./routes/genre.route");
const usersRoutes = require("./routes/database/user.route");
const authRoutes = require("./routes/database/auth.route");
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));

(async () => {
    try {
        await createRedisClient();
    } catch (err) {
        console.warn("Redis initialization failed — continuing without cache.");
    }
})();