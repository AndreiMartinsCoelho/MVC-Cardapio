const mysql = require("mysql");
const jwt = require("jsonwebtoken");

//Conexão com o banco de dados
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "mydb"
});

// Função para buscar todos os usuários
const get = async () => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT *, (SELECT nome FROM usuario WHERE id=id_usuario) as nome FROM usuario u",
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
};

const md5 = require("md5");

// Função para realizar o login do usuário
const login = async (data) => {
    const { email, senha } = data;
    return new Promise((resolve, reject) => {
        const sql =
        `SELECT u.id_usuario as id, u.nome, u.email, u.perfil ` +
        `FROM usuario u `+
        `WHERE u.email = ? AND u.senha = ?`;

        connection.query(sql, [email, md5(senha)], (error, results) => {
            if (error) {
                reject(error);
            } else {
                let result = null;
                if (results && results.length > 0) {
                    const id = results[0].id;
                    const token = jwt.sign({ id }, "mydb", { expiresIn: "3000000" });

                    console.log("Fez login e gerou token!");

                    result = { auth: true, token, user: results[0]};
                    resolve(result);                    
                } else {
                    result = { auth: false, message: "Credenciais inválidas" };
                    resolve(result);
                }
            }
        });
    });
};

// Função para verificar a validade do token JWT
const verifyJWT = async (token, perfil) => {
    try {
      const decoded = jwt.verify(token, "mydb");
  
      return new Promise((resolve, reject) => {
        const sql = "SELECT perfil FROM usuario WHERE id_usuario = ?";
        connection.query(sql, [decoded.id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            if (results.length > 0) {
              const perfilList = results[0].perfil.split(",");
              if (perfilList.includes(perfil)) {
                resolve({ auth: true, idUser: decoded.id });
              } else {
                resolve({ auth: false, message: "Perfil Inválido!" });
              }
            } else {
              resolve({ auth: false, message: "Perfil Inválido!" });
            }
          }
        });
      });
    } catch (err) {
      return { auth: false, message: "Token inválido!" };
    }
};

module.exports = {get, login, verifyJWT}