const userRepository = require("../../repositories/user.repository")
const AppError = require("../../utils/AppError")

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

        const passwordHash = data.password; // temporary

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
            throw new AppError('User not found', 404);

        return userRepository.delete(userId);
    }
}

module.exports = new UserService();