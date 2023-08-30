const userModel = require("../Model/userModel");

exports.get = async (headers) => {
  let auth;
  auth = await userModel.verifyJWT(
    headers["x-access-token"],
    headers["perfil"]
  );
  let users;
  if (auth.auth) {
    users = await userModel.get();
    return { status: "success", auth, users };
  } else {
    return { status: "null", auth };
  }
};

exports.login = async (body, req) => {
  const result = await userModel.login(body, req); // Passando o objeto "req"
  if (result.auth) {
    req.session.auth = result;
    return { auth: true, token: result.token, user: result.user };
  } else {
    return { auth: false, message: "Credenciais inválidas" };
  }
};
