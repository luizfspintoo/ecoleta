const express = require("express");
const server = express();

//diretório public disponivel
server.use(express.static("public"))

//configurar template engine, para trabalhar com lógicas no HTML
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//caminhos da minha aplicação (rotas)
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Um título"});
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
})

server.get("/search-results", (req, res) => {
    return res.render("search-results.html");
})


//ligar servidor
server.listen(3000);