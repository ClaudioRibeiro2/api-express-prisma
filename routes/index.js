const { Router } = require('express')

const usersRoutes = require('./users.route')
const mealsRoutes = require('./meals.route')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/meals', mealsRoutes)

module.exports = routes