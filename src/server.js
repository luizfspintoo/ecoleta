const express = require("express");
const server = express();

//importando o banco de dados
const database = require('./database/db');

//diretório public disponivel
server.use(express.static("public"));

//habilitar o uso, do corpo da requisição e pegar os dados do formulário
server.use(express.urlencoded({extended: true}));

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
    return res.render("index.html");
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
})

server.post("/save-point", (req, res) => {
     const query = `
         insert into places(
         name, image, address, address2, state, city, items
     ) values (
         ?, ?, ?, ?, ?, ?, ?
     );`

     const values =  [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
     ]

     function afterError(err) {
         if(err) {
            console.log(err);
            return res.send("Erro ao cadastrar")
         }
         console.log("Cadastrado com sucesso!");
         console.log(this);
         return res.render("create-point.html",  {saved: true});
     }
     database.run(query, values, afterError);

    
})

server.get("/search-results", (req, res) => {

    const search = req.query.search

    if(search === '') {
        return res.render("search-results.html", {total: 0});
    }

    else {
        database.all(`select * from places where city like '%${search}%' `, function (err, rows) {
            if (err) {
                return console.log(err);
            }
    
            const total = rows.length;
            //mostrar a página, com o card preenchido
            return res.render("search-results.html", {places: rows, total: total});
        });
    }

})


//ligar servidor
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Servidor iniciado...")
});