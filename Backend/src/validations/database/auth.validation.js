const Joi = require("joi");

const loginBody = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(64).required()
});

const refreshBody = Joi.object({
    refreshToken: Joi.string().required()
})

module.exports = {
    loginBody,
    refreshBody
}