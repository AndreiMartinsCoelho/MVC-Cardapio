const cadastroModel = require("../Model/cadastroModel");

async function cadastro(req, res) {

  let erro = false;

  try {
    const senha = String(req.body.senha);
    const { nome, email, perfil } = req.body;

    if (!nome || !email || !senha || !perfil) {
      erro = "Preencha todos os campos!";
      res.render("cadastro", { erro });
      return;
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
      erro = "Email já cadastrado!"
      res.render("cadastro", { erro });
      return;
    }
  } catch (error) {
    console.error("Erro no cadastro:", error.message);
    res.render("cadastro", /*{ error: "Ocorreu um erro no cadastro.", formData: req.body }*/);
  }
}

module.exports = { cadastro };
