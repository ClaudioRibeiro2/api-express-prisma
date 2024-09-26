const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');
const prisma = new PrismaClient();

class UsersController {
    async post(request, response) {
        try {
            const { name, email, age } = request.body;
            console.log(name, email, age)
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    age
                }
            })
            response.json(user)
        } catch (error) {
            console.log(error)
            return response.status(400).send()
        }
    }
}

module.exports = UsersController