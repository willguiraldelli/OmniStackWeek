const Post = require("../models/Post");

module.exports = {
  async store(req, res) {
    // procurando post pelo Id passado na requisição
    // post recebe a entidade/registro Post que está armazenado no banco
    const post = await Post.findById(req.params.id);

    // atualizando o campo likes para adicionar um novo like
    post.likes += 1;

    // salvando atualizações no post
    await post.save();
    return res.json(post);
  }
};
