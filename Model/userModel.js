const jwt = require("jsonwebtoken");
const md5 = require("md5");
const db = require('./database');

class Usuario {
  constructor(nome, email, senha, perfil) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.perfil = perfil;
  }

  static async get() {
    const sql = `SELECT *, (SELECT nome FROM usuario WHERE id=id_usuario) as nome FROM usuario u`;
    return await db.query(sql);
  }

  static async auth(data) {
    const { email, senha } = data;
    const sql = `SELECT u.id_usuario as id, u.nome, u.email, u.perfil ` +
                `FROM usuario u ` +
                `WHERE u.email = ? AND u.senha = ?`;
                
    const results = await db.query(sql, [email, md5(senha)]);

    if (results && results.length > 0) {
      const id = results[0].id;
      const token = jwt.sign({ id }, "mydb", { expiresIn: "3000000" });

      console.log("Fez login e gerou token!");

      return { auth: true, token, user: results[0] };
    } else {
      return { auth: false, message: "Credenciais inválidas" };
    }
  }

  static async verifyJWT(token, perfil) {
    try {
      const decoded = jwt.verify(token, "mydb");
      const sql = "SELECT perfil FROM usuario WHERE id_usuario = ?";
      const results = await db.query(sql, [decoded.id]);

      if (results.length > 0) {
        const perfilList = results[0].perfil.split(",");
        if (perfilList.includes(perfil)) {
          return { auth: true, idUser: decoded.id };
        } else {
          return { auth: false, message: "Perfil Inválido!" };
        }
      } else {
        return { auth: false, message: "Perfil Inválido!" };
      }
    } catch (err) {
      return { auth: false, message: "Token inválido!" };
    }
  }
}

module.exports = Usuario;