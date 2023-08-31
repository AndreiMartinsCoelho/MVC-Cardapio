const MD5 = require("md5");
const db = require('./database');

class Reset {
  constructor(email, novaSenha, confirmSenha) {
    this.email = email;
    this.novaSenha = novaSenha;
    this.confirmSenha = confirmSenha;
    // this.connection = mysql.createConnection({
    //   host: "127.0.0.1",
    //   user: "root",
    //   database: "mydb",
    // });
  }

  static async changePassword(data) {
    const { email, novaSenha, confirmSenha } = data;
    const MD5 = require("md5");
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT u.id_usuario id, u.nome, u.email, u.perfil " +
        "FROM usuario u WHERE u.email = ? ";
      // Consulta o banco de dados para obter informações do usuário
      db.query(sql, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          let result = null;
          if (results && results.length > 0) {
            const id = results[0].id;

            console.log("Fez a troca de senha!");

            if (MD5(novaSenha) !== MD5(confirmSenha)) {
              // Se a nova senha e a confirmação de senha não coincidirem, define o resultado como autenticação falsa
              result = {
                auth: false,
                message: "A nova senha e a confirmação de senha não coincidem.",
              };
              resolve(result);
            } else {
              // Atualiza a senha do usuário no banco de dados
              const updateSql = `UPDATE usuario SET senha = ? WHERE id_usuario = ? `;
              console.log(updateSql);
              db.query(updateSql, [MD5(novaSenha), id], (error) => {
                if (error) {
                  // Em caso de erro ao atualizar a senha, rejeita a Promise com o erro
                  reject(error);
                } else {
                  // Senha atualizada com sucesso, define o resultado como autenticação verdadeira e retorna informações do usuário
                  result = { auth: true, user: results[0] };
                  resolve(result);
                }
              });
            }
          } else {
            // Se nenhum usuário for encontrado com o e-mail fornecido, define o resultado como autenticação falsa
            result = { auth: false, message: "E-mail de usuário inválido!" };
            resolve(result);
          }
        }
      });
    });
  }
}

module.exports = Reset;
