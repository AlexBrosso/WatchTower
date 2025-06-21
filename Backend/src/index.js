const express = require("express");
const cors = require("cors");
require("dotenv").config();

const moviesRoutes = require("./routes/movies");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));