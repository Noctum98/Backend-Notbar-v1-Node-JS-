'use strict'

var mongoose = require('mongoose');
var bycript = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret_token = process.env.secret_token || 'eze41354287';

var controllers = {
    login:(req,res)=>{
        let name_user = req.body.name_user;
        let password = req.body.password;

        User.findOne({name_user:name_user},(err,user)=>{
            if (err) return res.status(500).send({message:'Ha ocurrido un error'});
            if(!user) return res.status(404).send({message:'No se ha encontrado el usuario'});
            bycript.compare(password,user.password,(err,match)=>{
                if(err) return res.status(500).send({message:'ERROR'});
                if(!match) return res.status(404).send({message:'La contraseña es incorrecta'});
                if(match){
                    let payload = {
                        name_user: user.name_user,
                        name: user.name,
                        last_name: user.last_name,
                        image:user.image,
                        email:user.email,
                        nationality:user.nationality,
                        _id:user._id
                    }                    
                    jwt.sign(payload,secret_token,(err,token)=>{
                        if(err) return res.status(500).send({message:'Ha ocurrido un error'});
                        if(token) return res.status(200).send({message:'Acceso',token});
                    })
                }
            })
        });

    }
}

module.exports = controllers;
