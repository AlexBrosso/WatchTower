const AppError = require("../utils/AppError")

function validateMovieId(req,res,next){
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
        throw new AppError("Invalid movie ID format", 400);
    }

    next();
}


function validateTrendingParams(req, res, next) {
  const { timeWindow } = req.params;

  if (!["day", "week"].includes(timeWindow)) {
    throw new AppError("Parameter 'timeWindow' must be 'day' or 'week'", 400);
  }

  next();
}

function validateSearchParams(req, res, next) {
  const { query, year, page } = req.query;

  if (!query || query.trim() === "") {
    throw new AppError("Query parameter 'query' is required", 400);
  }

  if (year !== undefined && (!/^\d{4}$/.test(year) || year < 1888 || year > new Date().getFullYear() + 1)) {
    throw new AppError("Parameter 'year' must be a valid year", 400);
  }

  next();
}

function validatePageParam(req, res, next){
    const { page } = req.query;

    if (page !== undefined && (!/^\d+$/.test(page) || parseInt(page) < 1)) {
        throw new AppError("Parameter 'page' must be a positive integer", 400);
    }

    next();
}

module.exports = {
  validateTrendingParams,
  validateSearchParams,
  validateMovieId,
  validatePageParam
};