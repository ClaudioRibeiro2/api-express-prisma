const { PrismaClient } = require('@prisma/client');
const { request, response } = require('express');
const prisma = new PrismaClient();

class MealsController {
    //Post
    async post(request, response) {
        try {
            const { title, description, calories, time, diet, user_id } = request.body;

            const meal = await prisma.meal.create({
                data: {
                    title,
                    description,
                    calories,
                    time,
                    diet,
                    user_id
                }
            })
            response.json(meal)
        } catch (error) {
            console.log(error)
            return response.status(400).send()
        }
    }

    //Update
    async patch(request, response) {
        try {
            const { id, title, description, calories, time, diet } = request.body;

            const meal = await prisma.meal.update({
                where: {
                    id: id,
                },
                data: {
                    title,
                    description,
                    calories,
                    time,
                    diet,
                },
            })
            response.json(meal)
        } catch (error) {
            console.log(error)
            return response.status(400).send()
        }
    }

    // Delete
    async delete(request, response) {
        try {
            const { id } = request.params;
            const meal = await prisma.meal.delete({
                where: {
                    id: id,
                }
            })
            response.json(meal)
        } catch (error) {
            console.log(error)
            return response.status(400).send()
        }
    }

    // Get
    async get(request, response) {
        try {
            const { id } = request.params;
            const meal = await prisma.meal.findUnique({
                where: {
                    id: id,
                },
            });
            response.json(meal);
        } catch (error) {
            console.log(error);
            return response.status(400).send();
        }
    }
}

module.exports = MealsController