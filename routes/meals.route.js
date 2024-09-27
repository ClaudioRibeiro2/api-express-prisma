const { Router } = require('express')

const MealsController = require('../controllers/MealsController')

const mealsRoutes = Router()

const mealsController = new MealsController()

mealsRoutes.post('/post', mealsController.post)
mealsRoutes.patch('/patch', mealsController.patch)
mealsRoutes.delete('/delete', mealsController.delete)
mealsRoutes.get('get', mealsController.get)
mealsRoutes.get('/getlist', mealsController.listMeals)

module.exports = mealsRoutes