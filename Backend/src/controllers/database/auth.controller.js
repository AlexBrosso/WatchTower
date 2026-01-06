const authService = require("../../services/database/auth.service");
const { decodeObject } = require("../../utils/jwt");
const { setCache } = require("../../lib/cache")

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
                await setCache(`bl:${token}`, "true", ttl)

            return res.status(204).send();
        }
        catch(err){
            next(err);
        }
    }
}

module.exports = new AuthController();