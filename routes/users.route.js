const { Router } = require('express')

const UsersController = require('../controllers/UsersController')

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post('/post', usersController.post)
usersRoutes.patch('/patch', usersController.patch)
usersRoutes.delete('/delete/:id', usersController.delete)
usersRoutes.get('/get/:id', usersController.get)
usersRoutes.get('/meals/:id', usersController.getMeals)
usersRoutes.get('/meals/indiet/:id', usersController.getMealsInDiet)
usersRoutes.get('/meals/outdiet/:id', usersController.getMealsOutDiet)

module.exports = usersRoutes