const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");
const app = express();
const mongoose = require("mongoose");

var server = http.createServer(app);
// criando servidor que recebe tanto protocolo http quando o socket
const io = require("socket.io")(server, { origins: "*:*" });

mongoose.connect(
  "mongodb+srv://dbUser:senha@omnistack-gotag.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

// permtindo que todas rotas tenham acesso ao socket
app.use((req, res, next) => {
  req.io = io;
  // metodo next permite que todas os metodos posteriores a ele continuem sendo executados, uma vez que
  // os medwares são interceptadores e podem cortar as outras ações
  next();
});

// permite que qualquer tipo de aplicação acesse o beckend
app.use(cors());

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes"));
// Informando a porta do servidor que está 'escutando' nossa aplicação
server.listen(3333);
