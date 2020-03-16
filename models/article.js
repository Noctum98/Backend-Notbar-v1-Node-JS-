'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = Schema({
    title:String,
    subtitle:String,
    autor:String,
    autor_username:String,
    date:String,
    content:String,
    category:String,   
    image:String
});

module.exports = mongoose.model('Article',ArticleSchema);
