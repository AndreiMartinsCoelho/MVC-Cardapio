const userModel = require("../Model/userModel");

async function getUsers(req, res) {
  users = await userModel.listarUsuarios();
  res.render('users', { users });
}

function login(req, res) {
  res.render('login');
}

async function auth(req, res) {
  const { email, senha, token } = req.body;

  const resp = await userModel.auth({ email, senha, token });

  if (resp.auth) {
    req.session.usuario = {
      id: resp.user.id,
      email: resp.user.email,
      token: resp.token
    };
    res.redirect('/home');
  } else {
    res.redirect('/login');
  }
  console.log(resp);
}


module.exports = { login, auth, getUsers };
