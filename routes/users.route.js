const { Router } = require('express')

const UsersController = require('../controllers/UsersController')

const usersRoutes = Router()

const usersController = new UsersController()

usersRoutes.post('/post', usersController.post)
usersRoutes.patch('/patch', usersController.patch)
usersRoutes.delete('/delete/:id', usersController.delete)

module.exports = usersRoutes