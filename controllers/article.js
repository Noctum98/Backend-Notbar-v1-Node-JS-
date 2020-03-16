'use strict'

var fs = require('fs');
var path = require('path');
var Article = require('../models/article');

var controllers = {
    test:(req,res)=>{
        return res.status(200).send({message:'Los controladores funcionan'});
    },
    saveArticle:(req,res)=>{
        var params = req.body;
        var article = new Article();

        article.title = params.title;
        article.subtitle = params.subtitle;
        article.autor = params.autor;
        article.autor_username = params.autor_username;
        article.date = params.date;
        article.content = params.content;
        article.image = params.image;
        article.category = params.category;

        article.save((err,ArticleStored)=>{
            if(err) return res.status(500).send({message:'Ha ocurrido un error al guardar el articulo'});
            if(!ArticleStored) return res.status(404).send({message:'No se ha podido guardar el articulo'});
            if(ArticleStored) return res.status(200).send({ArticleStored});
        });
    },
    getArticle:(req,res)=>{
        var articleId = req.params.id;

        if(articleId == null) return res.status(404).send({message:"No hay parametros para buscar"});

        Article.findById(articleId,(err,Article)=>{
            if(err) return res.status(500).send({message:'Ha ocurrido un error al buscar el articulo'});
            if(!Article) return res.status(404).send({message:'No se ha podido buscar el articulo'});
            if(Article) return res.status(200).send({Article});
        });

    },
    getArticles:(req,res)=>{
        Article.find({}).exec((err,Articles)=>{
            if(err) return res.status(500).send({message:'Ha ocurrido un error al buscar los articulos'});
            if(!Articles) return res.status(404).send({message:'No se han podido buscar los articulos'});
            if(Articles) return res.status(200).send({Articles});
        });
    },
    updateArticle: function(req, res){
		var articleId = req.params.id;
		var update = req.body;

		Article.findByIdAndUpdate(articleId, update, {new:true}, (err, articleUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar'});

			if(!articleUpdated) return res.status(404).send({message: 'No existe el articulo para actualizar'});

			return res.status(200).send({
				article: articleUpdated
			});
		});

	},
    deleteArticle:(req,res)=>{
        var articleId = req.params.id;

        Article.findByIdAndRemove(articleId,(err,ArticleRemoved)=>{
            if(err) return res.status(500).send({message:'Ha ocurrido un error al eliminar el articulo'});
            if(!ArticleRemoved) return res.status(404).send({message:'No se ha podido eliminar el articulo'});
            if(ArticleRemoved) return res.status(200).send({ArticleRemoved});
        });
    },
    uploadImage:(req,res)=>{
        var articleId = req.params.id;

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
    
            if (fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'png'){
                Article.findByIdAndUpdate(articleId,{image: fileName},{new:true},(err,articleUpdated)=>{
                    if(err) return res.status(500).send({message:'Ha ocurrido un error al subirse el archivo'});
                    if(!articleUpdated) return res.status(404).send({message:'No se ha podido subir la imagen'});
                    if(articleUpdated) return res.status(200).send({articleUpdated});
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