const express = require("express");
const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");
const multer = require("multer");
const uploadsConfig = require("./config/Upload");

const routes = new express.Router();
const upload = multer(uploadsConfig);

// rota para cadastro de novo post, metodo uploado single feito com o mutor e sobe um arquivo por vez
routes.post("/post", upload.single("image"), PostController.store); // PostControlle é o arquivo no projeto que contem o metodo de inserção

// rota para pegar os posts cadastrados no banco de dados
routes.get("/post", PostController.index);

routes.post("/post/:id/like", LikeController.store);

module.exports = routes;
