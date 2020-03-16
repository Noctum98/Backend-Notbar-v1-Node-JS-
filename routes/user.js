//RUTAS
'use strict'

var express = require("express");
var UserController = require("../controllers/user");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./uploads'});
var router = express.Router();

router.get('/test',UserController.test);
router.post('/save-user',UserController.saveUser);
router.get('/get-user/:id',UserController.getUser);
router.get('/get-users',UserController.getUsers);
router.put('/update-user/:id',UserController.updateUser);
router.delete('/delete-user/:id',UserController.deleteUser);
router.post('/upload-file/:id',multipartMiddleware,UserController.uploadImage);
router.get('/get-image/:image',UserController.getImageFile);

module.exports = router;