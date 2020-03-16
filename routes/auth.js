'use strict'

var express = require('express');
var authControllers = require('../controllers/auth');
var router = express.Router();

router.post('/login',authControllers.login);

module.exports = router;
