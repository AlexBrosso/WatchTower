const { verifyToken } = require("../utils/jwt");
const userRepository = require("../repositories/user.repository");
const AppError = require("../utils/AppError");
const { getCache } = require("../lib/cache");

async function authMiddleware(req, res, next) {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader)
            throw new AppError("Authorization Token is missing.", 401);

        const [, token] = authHeader.split(" ");

        if(!token)
            throw new AppError("Authorization Token is missing.", 401);

        const isBlackListed = await getCache(`bl:${token}`);
        if(isBlackListed)
            throw new AppError("Token has been revoked.", 401);

        const decoded = verifyToken(token);
        const user = await userRepository.findById(Number(decoded.sub));

        if(!user)
            throw new AppError("Invalid Authentication Creditentials.", 401);

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        return next();
    }catch(err){
        next(err);
    }
}

module.exports = authMiddleware;