'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./uploads'});
var router = express.Router();

router.get('/test-articles',ArticleController.test);
router.post('/save-article',ArticleController.saveArticle);
router.get('/get-article/:id',ArticleController.getArticle);
router.get('/get-articles',ArticleController.getArticles);
router.put('/update-article/:id',ArticleController.updateArticle);
router.delete('/delete/:id',ArticleController.deleteArticle);
router.post('/upload-file/:id',multipartMiddleware,ArticleController.uploadImage);
router.get('/get-image/:image',ArticleController.getImageFile);

module.exports = router;