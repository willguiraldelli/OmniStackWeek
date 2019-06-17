// Models representam as "tabelas" onde serão armazenados os dados de certa entidade dentro do Mongo
const mongoose = require("mongoose");

// criando um novo esquema com os atributos que a entidade receberá
const PostSchema = new mongoose.Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    // cria automaticamento o regitro de CreatedAt e UpadatedAt
    timestamps: true
  }
);
// exportando modelo (nome para o modelo, modelo a ser exportado)
module.exports = mongoose.model("Post", PostSchema);
