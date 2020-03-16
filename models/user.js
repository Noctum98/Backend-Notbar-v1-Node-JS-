'use strict'
var bcrypt = require('bcrypt-nodejs');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = Schema({
    name_user:{type:String,required:true,unique:true},
    name:{type:String},
    last_name:{type:String},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    nationality:{type:String},
    image:{type:String},
});

userSchema.pre('save',function(next){
    var user = this;
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) return next(err);
        bcrypt.hash(user.password,salt,null,(err,hash)=>{
            if(err) return next(err);
            user.password = hash;
            next();
        })
    });
});

module.exports = mongoose.model('User',userSchema);