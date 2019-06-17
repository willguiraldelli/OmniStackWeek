const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
  // metodo  get que retorna os posts do banco de dados
  // criando um midware - (req, res) - toda função que tiver esses parametros é um midware - um mideware é interceptador
  // de requizições
  async index(req, res) {
    // procura posts atraves da model - metodo sort ordenando o retorno atraves da data mais recente
    const posts = await Post.find().sort("-createdAt");

    // retorna a resposta em formato Json
    return res.json(posts);
  },

  // Metodo post que insere um novo post no banco de dados, atraves da model preenchida
  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    // arquivos não são retornados no body, são retornados no file
    const { filename: image } = req.file;

    const [name] = image.split(".");
    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 100 })
      .toFile(path.resolve(req.file.destination, "resized", fileName));

    fs.unlinkSync(req.file.path);
    // cadastrando novo post atraves da model
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName
    });
    return res.json(post);
  }
};
