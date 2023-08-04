const express = require("express");
const server = express();

//caminhos da minha aplicação (rotas)
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})


//ligar servidor
server.listen(3000);