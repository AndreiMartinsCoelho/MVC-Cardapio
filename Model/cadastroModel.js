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
        const sql = `SELECT *,FROM usuario u`;
        return await db.query(sql);
      }
    
    static async cadastro(data) {
        const { nome, email, senha, perfil } = data;
        const sql = "INSERT INTO usuario (nome, email, senha, perfil) VALUES (?, ?, ?, ?)";
        const results = await db.query(sql, [nome, email, md5(senha), perfil]);
    
        if (results) {
      
            console.log("Fez Cadastrou um novo usuário!");
      
            return { auth: true, user: results[0] };
        } else {
            return { auth: false, message: "Credenciais inválidas" };
        }
        
    }
}

module.exports = Usuario;