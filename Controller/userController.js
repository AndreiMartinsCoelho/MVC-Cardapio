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

exports.login = async (body) => {
  const result = await userModel.login(body);
  if (result.auth) {
    return { auth: true, token: result.token, user: result.user };
  } else {
    return { auth: false, message: "Credenciais inválidas" };
  }
};
