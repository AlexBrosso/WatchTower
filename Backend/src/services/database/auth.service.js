const bcrypt = require("bcrypt");
const AppError = require("../../utils/AppError");
const userRepository = require("../../repositories/user.repository");
const { generateToken, generateRefreshToken } = require("../../utils/jwt");
const { setCache } = require("../../lib/cache");

class AuthService {
    async login({ email, password }) {
        const user = await userRepository.findByEmail(email);

        if(!user)
            throw new AppError("Invalid email or password", 401);

        const passwordMatch = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if(!passwordMatch)
            throw new AppError("Invalid email or password", 401);

        const token = generateToken({
            sub: user.id,
            email: user.email,
            username: user.username,
            role: user.role
        });

        const refreshToken = generateRefreshToken({
            sub: user.id
        });

        await setCache(
            `rt:${refreshToken}`,
            user.id,
            60 * 60 * 24
        )

        return {
            acessToken: token,
            refreshToken: refreshToken,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                imageUrl: user.imageUrl,
                role: user.role
            }
        };
    }
}

module.exports = new AuthService();