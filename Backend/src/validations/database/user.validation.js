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

const changePasswordBody = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).max(64).required()
})

const forgotPasswordBody = Joi.object({
    email: Joi.string().email().required()
})

const resetPasswordBody = Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string().min(8).max(64).required()
})

module.exports = {
    userIdParam,
    createUserBody,
    updateUserBody,
    changePasswordBody,
    forgotPasswordBody,
    resetPasswordBody
};


