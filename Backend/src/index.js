const express = require("express");
const cors = require("cors");
require("dotenv").config();


const moviesRoutes = require("./routes/movies");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRoutes);


const AppError = require('./utils/AppError');
app.use((err, req, res, _next) => {
  if (!(err instanceof AppError)) {
    err = new AppError('Internal Server Error');
  }

  console.error(`[${err.statusCode}] ${err.message}`);

  res.status(err.statusCode).json({ error: err.message });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));