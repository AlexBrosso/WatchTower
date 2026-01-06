const userRepository = require("../../repositories/user.repository")
const AppError = require("../../utils/AppError")
const bcrypt = require("bcrypt")
const SALT_ROUNDS = 10;

class UserService {
    async getUsers() {
        const users = await userRepository.findAll();

        if (!users)
            throw new AppError('Users not found', 404);

        return users;
    }

    async createUser(data) {
        const emailExists = await userRepository.findByEmail(data.email);
        if (emailExists) {
            throw new AppError("Email is already registered.", 409);
        }

        const usernameExists = await userRepository.findByUsername(data.username);
        if (usernameExists) {
            throw new AppError("Username is already being used.", 409);
        }

        const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

        return userRepository.create({
            email: data.email,
            username: data.username,
            passwordHash,
            imageUrl: data.imageUrl
        });
    }


    async getUser(userId) {
        const user = await userRepository.findById(userId);

        if (!user)
            throw new AppError('User not found', 404);

        return user;
    }

    async updateUser(userId, data) {
        const user = await userRepository.findById(userId);
        if (!user)
            throw new AppError('User not found', 404);

        const usernameExists = await userRepository.findByUsername(data.username);
        if(usernameExists) throw new AppError("Username is already being used.", 409);

        return userRepository.update(userId, {
            username: data.username,
            imageUrl: data.imageUrl,
            updatedAt: new Date(),
        });
    }

    async deleteUser(userId) {
        const user = await userRepository.findById(userId);

        if (!user)
            throw new AppError("User not found", 404);

        return userRepository.delete(userId);
    }

    async changeUserPassword(userId, oldPassword, newPassword) {
        const user = await userRepository.findById(userId);

        if (!user)
            throw new AppError("User not found", 404);

        const passwordMatch = await bcrypt.compare(
            oldPassword,
            user.passwordHash
        );

        if (!passwordMatch){
            throw new AppError("Current password is incorrect", 401)
        }

        const isSamePassword = await bcrypt.compare(
            newPassword,
            user.passwordHash
        );

        if (isSamePassword){
            throw new AppError("New password must be different from the current one", 400)
        }

        const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

        return userRepository.update(userId, {
            passwordHash: newPasswordHash
        })
    }

    async forgotPassword(email) {
        const user = await userRepository.findByEmail(email);
        if (!user)
            throw new AppError("User not found", 404);

        const token = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 60000 * 15); // 15 min

        return await userRepository.update(user.id, {
            resetToken: token,
            resetTokenExpires: expiresAt
        });
    }

    async resetPassword(token, newPassword){
        const user = await userRepository.findByResetToken(token);

        if (!user)
            throw new AppError("Invalid or expired Token", 400);

        const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

        return userRepository.update(user.id, {
            passwordHash: newPasswordHash
        })
    }

}

module.exports = new UserService();