const { Router } = require('express')

const usersRoutes = require('./users.route')

const routes = Router()

routes.use('/users', usersRoutes)

module.exports = routes