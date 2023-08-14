const resetModel = require("../Model/resetModel");

exports.changePassword = async (data) => {
  const result = await resetModel.changePassword(data);
  if (result.auth) {
    return {
      success: true,
      message: "Senha alterada com sucesso!",
      user: {
        id: result.user.id,
        nome: result.user.nome,
        email: result.user.email,
      },
    };
  } else {
    return {
      success: false,
      message:
        "Não foi possível alterar a senha. Verifique as credenciais fornecidas.",
      error: result.message,
    };
  }
};