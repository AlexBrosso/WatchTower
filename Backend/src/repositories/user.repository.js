const prisma = require("../lib/prisma");

class UserRepository {

    async findAll(){
        return prisma.user.findMany()
    }

    async create(data){
        return prisma.user.create({ data })
    }

    async findByEmail(email){
        return prisma.user.findUnique({
            where: { email },
        })
    }

    async findByUsername(username){
        return prisma.user.findUnique({
            where: { username },
        })
    }

    async findById(id){
        return prisma.user.findUnique({
            where: { id },
        })
    }

    async findByResetToken(token){
        return prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpires: {
                    gt: new Date()
                }
            }
        })
    }

    async update(id, data) {
        return prisma.user.update({
            where: { id },
            data,
        });
    }

    async delete(id) {
        return prisma.user.delete({
            where: { id },
        });
    }
    
}

module.exports = new UserRepository();