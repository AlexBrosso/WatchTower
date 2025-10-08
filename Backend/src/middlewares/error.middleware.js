const AppError = require('../utils/AppError');

function errorMiddleware(err,req,res,next) {

    if (!(err instanceof AppError)) {
        err = new AppError('Internal Server Error - ' + err.message);
    }

    console.error(`[${err.statusCode}] ${err.message}`);

    return res.status(err.statusCode).json({
        status:"error",
        message: err.message
    });

}

module.exports = errorMiddleware;