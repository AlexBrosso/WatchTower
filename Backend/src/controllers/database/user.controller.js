const userService = require("../../services/database/user.service")

class UserController {
    async getAll(req, res, next){
        try{
            const users = await userService.getUsers();
            return res.status(200).json(users);
        }catch(err){
            next(err);
        }
    }

    async create(req, res, next){
        try{
            const user = await userService.createUser(req.body);
            return res.status(201).json(user);

        }catch(err){
            next(err);
        }
    }

    async me(req, res, next){
        try{
            const user = await userService.getUser(req.user.id);
            return res.status(200).json(user);
        }catch(err){
            next(err);
        }
    }

    async get(req, res, next){
        try{
            const user = await userService.getUser(req.params.id);
            return res.status(200).json(user);
        }catch(err){
            next(err);
        }
    }

    async updateMe(req, res, next) {
        try {
            const user = await userService.updateUser(req.user.id, req.body);
            return res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }

    async removeMe(req, res, next) {
        try {
            await userService.deleteUser(req.user.id);
            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

    async remove(req, res, next) {
        try {
            console.log(req.params);
            await userService.deleteUser(req.params.id);
            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

    async changeMyPassword(req, res, next) {
        try {
            const userId = req.user.id;
            const { oldPassword, newPassword } = req.body;

            await userService.changeUserPassword(
                req.user.id,
                oldPassword,
                newPassword
            );

            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

    async forgotPassword(req, res, next) {
        try {
            console.log(req.body)
            const { email } = req.body;

            const result = await userService.forgotPassword(email);

            res.status(200).json({
                token: result?.token 
            });

        } catch (err) {
            next(err);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { token, newPassword } = req.body;

            await userService.resetPassword(token, newPassword);

            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController();