'use strict'

var fs = require("fs");
var User = require("../models/user");
var path = require("path");

var controllers = {
    test:(req,res)=>{
        res.status(200).send({
            message:"Testeado correctamente",
        })
    },
    saveUser:(req,res)=>{
        var user = new User();
        var params = req.body;

        user.name_user = params.name_user;
        user.name = params.name;
        user.last_name = params.last_name;
        user.password = params.password;
        user.email = params.email;
        user.image = params.image;
        user.nationality = params.nationality;

        user.save((err,UserStored)=>{
            if(err) return res.status(500).send({message:"Ha occurrido un error al guardar el documento"});
            if(!UserStored) return res.status(404).send({message:"No se ha podido el Usuario"});
            if(UserStored) return res.status(200).send({UserStored});
        });
    },
    getUser:(req,res)=>{
        var userId = req.params.id;

        if(userId == null) return res.status(404).send({message:"No hay parametros para buscar"});

        User.findById(userId,(err,user)=>{
            if(err) return res.status(500).send({message:"Ha ocurrido un error al mostrar el proyecto"});
            if(!user) return res.status(404).send({message:"No se ha podido guardar el usuario"});
            if(user) return res.status(200).send(user);
        });

    },
    getUsers:(req,res)=>{
        User.find({}).exec((err,users)=>{
            if(err) return res.status(500).send({message:"Ha ocurrido un error al mostrar los usuarios"});
            if(!users) return res.status(404).send({message:"No se han podido mostrar los usuarios"});
            if(users) return res.status(200).send(users);
        });
    },
    updateUser:(req,res)=>{
        var userId = req.params.id;
        var update = req.body;

        User.findByIdAndUpdate(userId,update,{new:true},(err,UserUpdated)=>{
            if(err) return res.status(500).send({message:"Ha ocurrido un error al actualizar el usuario"});
            if(!UserUpdated) return res.status(404).send({message:"No se ha podido guardar el usuario"});
            if(UserUpdated) return res.status(200).send({UserUpdated})
        });
    },
    deleteUser:(req,res)=>{
        var userId = req.params.id;
        
        User.findByIdAndRemove(userId,(err,UserRemoved)=>{
            if(err) return res.status(500).send({message:"Ha ocurrido un error al borrar el usuario"});
            if(!UserRemoved) return res.status(404).send({message:"No se ha podido borrar el usuario"});
            if(UserRemoved) return res.status(200).send({UserRemoved});
        });
    },
    uploadImage:(req,res)=>{
        var userId = req.params.id;

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
    
            if (fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'png'){
                User.findByIdAndUpdate(userId,{image: fileName},{new:true},(err,userUpdated)=>{
                    if(err) return res.status(500).send({message:'Ha ocurrido un error al subirse el archivo'});
                    if(!userUpdated) return res.status(404).send({message:'No se ha podido subir la imagen'});
                    if(userUpdated) return res.status(200).send({userUpdated});
                });
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(404).send({message:'La extension no es valida'});
                });
            }
        }else{
            return res.status(200).send({message: fileName});
        }
        
    },
    getImageFile:(req,res)=>{
        var file = req.params.image;
        var path_file = './uploads/' + file;

        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message:'La imagen no existe..'
                })
            }
           
        });
    }
};

module.exports = controllers;