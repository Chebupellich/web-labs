const Router = require('express').Router
const router = new Router()

const userController = require('../controllers/user-controller')

router.get('/', userController.test)

module.exports = router