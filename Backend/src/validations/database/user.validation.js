const Joi = require("joi");

const userIdParam = Joi.object({
    id: Joi.number().integer().positive().required()
});

const createUserBody = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9._-]+$/).required(),
    password: Joi.string().min(8).max(64).required(),
    imageUrl: Joi.string().uri().allow(null).optional()
});

const updateUserBody = Joi.object({
    username: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9._-]+$/).required(),
    imageUrl: Joi.string().uri().allow(null)
}).min(1);

module.exports = {
    userIdParam,
    createUserBody,
    updateUserBody 
};


