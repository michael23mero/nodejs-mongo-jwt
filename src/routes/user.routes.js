const { UserModel } = require('../models')
const routerUser = require('express').Router()
const { verifyToken } = require('../middlewares/')
const { controllers } = require('../controllers')

routerUser.get('/', async (req, res) => {
        const data = await UserModel.find()
        res.status(200).json(data)
})

routerUser.post('/signup', controllers.ApiUserController.register)

routerUser.post('/signin', controllers.ApiUserController.login)

routerUser.get('/home', verifyToken.verifyToken, controllers.ApiUserController.listUser)

module.exports = routerUser;