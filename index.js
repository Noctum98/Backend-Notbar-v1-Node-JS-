'use strict'

var mongoose = require("mongoose");
var app = require("./app");
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/notbar")
        .then(()=>{
            console.log("Se ha conectado satisfactoriamente al servidor");

            app.listen(port,()=>{
                console.log("Se ha conectado al puerto " + port + " con exito");
            });
        })
        .catch((err)=>{
            console.log(err);
        })