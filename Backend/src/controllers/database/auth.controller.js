const authService = require("../../services/database/auth.service");
const { decodeObject, verifyRefreshToken, generateToken } = require("../../utils/jwt");
const { setCache, getCache } = require("../../lib/cache");
const AppError = require("../../utils/AppError");
const userRepository = require("../../repositories/user.repository");
const { number } = require("joi");

class AuthController{
    async login(req, res, next) {
        try{
            const result = await authService.login(req.body);
            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next){
        try{
            const authHeader = req.headers.authorization;
            const [,token] = authHeader.split(" ");

            const decoded = decodeObject(token);

            if(!decoded?.exp)
                return res.status(204).send();

            const ttl = decoded.exp - Math.floor(Date.now() / 1000);

            if (ttl > 0)
                await setCache(`bl:${token}`, "true", ttl);
            
            return res.status(204).send();
        }
        catch(err){
            next(err);
        }
    }

    async refresh(req, res, next){

        const refreshToken = req.body.refreshToken;

        let decoded;
        try{
            decoded = verifyRefreshToken(refreshToken);
        }catch{
            throw new AppError("Invalid Refresh Token.", 401);
        }

        const cacheUserId = await getCache(`rt:${refreshToken}`);
        if (!cacheUserId)
            throw new AppError("Refresh Token expired or revoked.", 401);

        const user = await userRepository.findById(Number(decoded.sub));
        if (!user)
            throw new AppError("Invalid Authentication Creditentials.", 401);

        const newAccessToken = generateToken({
            sub: user.id,
            email: user.email,
            username: user.username,
            role: user.role
        });

        return res.json({
            accessToken: newAccessToken
        })
    }
}

module.exports = new AuthController();