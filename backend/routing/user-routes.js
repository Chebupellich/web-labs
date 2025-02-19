const { Router } = require('express')
const userRouter = new Router()

const userController = require('../controllers/user-controller')

userRouter.get('/users', userController.GetUsers)

userRouter.post('/users', userController.CreateUser)

module.exports = userRouter