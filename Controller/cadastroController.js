const cadastroModel = require("../Model/cadastroModel");

// function getCad(req, res) {
//     res.render('cadastro');
// }

async function cadastro(req, res) {

  //Pegue os dados do formulário

  const senha = String(req.body.senha);
  // const nome = String(req.body.nome);
  // const email = String(req.body.email);
  // const perfil = String(req.body.perfil);
  const { nome, email, perfil } = req.body;

  const data = {
    nome: nome,
    email: email,
    senha: senha,
    perfil: perfil,
  };

  const resp = await cadastroModel.cadastro(data);
  console.log("Cadastrou:", resp);

  if (resp.cadastro) {
    console.log("Cadastrou com sucesso!", resp);
    res.redirect("/login"); // Redireciona para a tela de login
  } else {
    const erro = resp.message;
    console.log("Erro ao cadastrar!!!:", erro, resp);
    res.render("cadastro", { erro });
  }
}

module.exports = { cadastro };
