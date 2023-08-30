const userModel = require("../Model/userModel");

let users = [];

function login(req, res) {
  res.render('login');
}

async function auth(req, res) {
  const resp = await userModel.login({
    email: req.body.email,
    senha: req.body.senha
  });

  console.log(resp);

  if (resp.auth) {
    req.session.usuario = {
      id: resp.user.id,
      email: resp.user.email
    };
    res.redirect('/tarefas');
  } else {
    console.log('Usuário ou senha inválidos');
    res.redirect('/login');
  }
}

module.exports = { login, auth };


// exports.logout = async (req, res) => {
//   delete req.session.user();
//   res.redirect("/ejs/home");
// }
