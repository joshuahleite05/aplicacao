const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "j123",
  database: "SistemaConsultas",
  port: 3030,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.code);
    if (err.fatal) {
      console.error("Conexão fatal:", err.message);
    }
  } else {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    connection.release();
  }
});

module.exports = pool.promise();
