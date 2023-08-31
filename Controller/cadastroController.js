const cadastroModel = require("../Model/cadastroModel");

async function cadastro(req, res) {
  try {
    const senha = String(req.body.senha);
    const { nome, email, perfil } = req.body;

    // Validações de entradas
    if (!nome || !email || !senha || !perfil) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    const data = {
      nome: nome,
      email: email,
      senha: senha,
      perfil: perfil,
    };

    const resp = await cadastroModel.cadastro(data);

    if (resp.auth) {
      console.log("Cadastrou com sucesso!", resp);
      res.redirect("/login");
    } else {
      console.log("Erro ao cadastrar:", resp.message);
      res.render("cadastro", /*{ error: resp.message, formData: req.body }*/);
    }
  } catch (error) {
    console.error("Erro no cadastro:", error.message);
    res.render("cadastro", /*{ error: "Ocorreu um erro no cadastro.", formData: req.body }*/);
  }
}

module.exports = { cadastro };
