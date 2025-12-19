const Joi = require("joi");

const movieIdParams = Joi.object({
    id: Joi.number().integer().positive().required()
});

const trendingParams = Joi.object({
    timeWindow: Joi.string().valid("day", "week").required()
});

const pageQuery = Joi.object({
    page: Joi.number().integer().min(1).optional()
});

const searchQuery = Joi.object({
    query: Joi.string().trim().min(1).required(),
    year: Joi.number().integer().min(1888).max(new Date().getFullYear() + 1).optional(),
    page: Joi.number().integer().min(1).optional()
});

module.exports = {
    movieIdParams,
    trendingParams,
    pageQuery,
    searchQuery
};