const express = require('express');
const route = express.Router();

const HomeController = require('../app/controllers/HomeController');

route.get('/user/login', HomeController.login);

route.get('/user/logout', HomeController.logout);

route.post('/user/checkLogin', HomeController.checkLogin);

module.exports = route;
