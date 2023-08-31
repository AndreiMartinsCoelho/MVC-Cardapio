const MD5 = require('md5');

class Reset {
  constructor(email, senha, confirmSenha) {
    this.email = email;
    this.senha = senha;
    this.confirmSenha = confirmSenha;
  }

  static async changePassword(data) {
    const { email, novaSenha, confirmSenha } = data;

    try {
      const sql =
        "SELECT u.id_usuario id, u.nome, u.email, u.perfil " +
        "FROM usuario u WHERE u.email = ? ";

      const db = await connect();

      const [results] = await db.query(sql, [email]);

      if (results && results.length > 0) {
        const id = results[0].id;

        if (MD5(novaSenha) !== MD5(confirmSenha)) {
          const result = {
            auth: false,
            message: "A nova senha e a confirmação de senha não coincidem.",
          };
          return result;
        } else {
          const updateSql =`UPDATE usuario SET senha = ? WHERE id_usuario = ? `;

          await db.query(updateSql, [MD5(novaSenha), id]);

          const result = { auth: true, user: results[0] };
          return result;
        }
      } else {
        const result = { auth: false, message: "E-mail de usuário inválido!" };
        return result;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Reset;

