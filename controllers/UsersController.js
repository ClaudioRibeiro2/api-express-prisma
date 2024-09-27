const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');
const prisma = new PrismaClient();

class UsersController {
    // Post/Create
    async post(request, response) {
        try {
            const { name, email, age } = request.body;
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
    // Update
    async patch(request, response) {
        try {
            const { id, name, email, age } = request.body;

            const user = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    name: name,
                    email: email,
                    age: age,
                },
            })
            response.json(user)
        } catch (error) {
            console.log(error)
            return response.status(400).send()
        }
    }
    // Delete
    async delete(request, response) {
        try {
            const { id } = request.params;
            const user = await prisma.user.delete({
                where: {
                    id: id,
                }
            })
            response.json(user)
        } catch (error) {
            console.log(error)
            return response.status(400).send()
        }

    }
    // Get
    async get(request, response) {
        try {
            const { id } = request.params;

            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            response.json(user);
        } catch (error) {
            console.log(error);
            return response.status(400).send();
        }
    }

    async getMeals(request, response) {
        try {
            const { id } = request.params;

            const user = await prisma.meal.findMany({
                where: {
                    user_id: id,
                }
            })
            response.json(user.length())
        } catch (error) {
            console.log(error)
            return response.status(400).send()
        }
    }
    async getMealsInDiet(request, response) {
        try {
            const { id } = request.params;

            const user = await prisma.meal.findMany({
                where: {
                    user_id: id,
                    diet: true,
                }
            })
            response.json(user.length())
        } catch (error) {
            console.log(error)
            return response.status(400).send()
        }
    }
    async getMealsOutDiet(request, response) {
        try {
            const { id } = request.params;

            const user = await prisma.meal.findMany({
                where: {
                    user_id: id,
                    diet: false,
                }
            })
            response.json(user.length())
        } catch (error) {
            console.log(error)
            return response.status(400).send()
        }
    }
}

module.exports = UsersController