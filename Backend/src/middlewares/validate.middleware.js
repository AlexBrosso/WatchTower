const AppError = require("../utils/AppError");

function validateMiddleware(schema, property = "body"){
    return(req, res, next) => {
        const { error, value } = schema.validate(req[property], {
            abortEarly : false,
            allowUnknown: false,
            stripUnknown: true,
        });

        if (error) {
            const message = error.details.map(item => item.message).join(",");

            return next(new AppError(message, 400));
        }

        req[property] = value;
        next();
    };
}

module.exports = validateMiddleware;