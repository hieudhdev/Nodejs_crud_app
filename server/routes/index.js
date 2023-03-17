const express = require('express');
const route = express.Router();
const service = require('../service/render.js')
const userController = require('../controller/userController')

// [GET] /
route.get('/', service.homeRoutes);

// [GET] /create
route.get('/create', service.createUser);

// [GET] /update
route.get('/update', service.updateUser);

// API user
route.post('/api/user/create', userController.create)
route.get('/api/user/show', userController.show)
route.put('/api/user/update/:id', userController.update)
route.delete('/api/user/delete/:id', userController.deleteUser)


module.exports = route 
