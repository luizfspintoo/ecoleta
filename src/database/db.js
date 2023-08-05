//importar o sqlite3
const sqlite3 = require("sqlite3").verbose();

//objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

//utilizar o objeto de banco de dados
// db.serialize(() => {
//     // db.run(`create table if not exists places(
//     //     id integer primary key autoincrement,
//     //     name text,
//     //     image text,
//     //     address text,
//     //     address2 text,
//     //     state text,
//     //     city text,
//     //     items text
//     // );`);

//     // const query = `
//     //     insert into places(
//     //     name, image, address, address2, state, city, items
//     // ) values (
//     //     ?, ?, ?, ?, ?, ?, ?
//     // );`

//     // const values =  [
//     //     "Coleteria",
//     //     "http://localhost:3000/assets/recilagem.jpg",
//     //     "Rua delclides da cunha",
//     //     "Número 3006",
//     //     "São Paulo",
//     //     "Aracatuba",
//     //     "Residuos eletronicos, lampadas",
//     // ]

//     // function afterError(err) {
//     //     if(err) {
//     //         return console.log(err);
//     //     }
//     //     console.log("Cadastrado com sucesso!");
//     //     console.log(this);
//     // }

//     //db.run(query, values, afterError);

// db.run(`delete from places where id = ?`, [5], function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("Deletado com sucesso!");
// })

//     // db.all(`select * from places`, function(err, rows){
//     //     if(err) {
//     //         return console.log(err);
//     //     }
//     //     console.log("Aqui estão seus registros");
//     //     console.log(rows);
//     // });
// })
