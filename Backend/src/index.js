const express = require("express");
const cors = require("cors");
require("dotenv").config();


const moviesRoutes = require("./routes/movies");
const genresRoutes = require("./routes/genres");
const errorMiddleware = require('./middlewares/error.middleware');


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRoutes);
app.use("/api/genres", genresRoutes);

app.use(errorMiddleware);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));