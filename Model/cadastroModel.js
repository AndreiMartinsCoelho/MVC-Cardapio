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

        try {
            const results = await db.query(sql, [nome, email, md5(senha), perfil]);
            const id = results.insertId;
            return { auth: true, user: { id, nome, email, perfil } };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') { // Tratamento de erro de e-mail ou nome de usuário duplicado
                return { auth: false, message: "E-mail ou nome de usuário já existem." };
            } else {
                throw new Error("Erro no cadastro do usuário."); // Pode personalizar a mensagem de erro conforme necessário.
            }
        }
    }
}

module.exports = Usuario;