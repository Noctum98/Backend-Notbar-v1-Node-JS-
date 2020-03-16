'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//Archivo de rutas 
var userRoutes = require('./routes/user');
var articleRoutes = require('./routes/article');
var authRoutes = require('./routes/auth');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cabeceras y Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api',userRoutes);
app.use('/art',articleRoutes);
app.use('/auth',authRoutes);

//exportar
module.exports = app;