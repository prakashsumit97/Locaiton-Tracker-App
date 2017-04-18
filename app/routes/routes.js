var express = require('express');
var routes = express.Router(),
    user = require('../controllers/user.js'),
    location = require('../controllers/location.js');

routes.post('/api/login', user.authenticate)
routes.post('/api/saveLocation', location.saveLocation)
routes.get('/api/getSessionUser', user.getSessionUser)
routes.get('/api/logout', user.logout)
routes.get('/api/getAllSearches', location.getAllSearches)
routes.post('/api/signup', user.signup)


module.exports = routes;
