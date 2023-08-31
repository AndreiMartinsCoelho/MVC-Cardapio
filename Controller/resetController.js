const resetModel = require('../Model/resetModel');

async function reset(req, res) {
    res.render('resetSenha');
}

async function resetPassword(req, res) {
    const { email, novaSenha, confirmSenha, token } = req.body;

    // Verifica se o token é válido.
    if (!token || !resetModel.validarToken(token)) {
        const erro = "Token inválido";
        console.log("Invalid token:", token);
        res.redirect('/resetSenha');
        return;
    }

    // Altera a senha do usuário.
    try {
        const resp = await resetModel.changePassword({ email, novaSenha, confirmSenha, token });
        console.log("Senha alterada:", resp);

        if (resp.auth) {
            // Redireciona o usuário para a página de login.
            res.redirect('/login');
        } else {
            // Exibe uma mensagem de erro.
            const erro = resp.message;
            console.log("Password change error:", erro);
            res.render('resetSenha', { erro });
        }
    } catch (error) {
        console.error("Error changing password:", error);
        res.render('resetSenha', { erro: "Erro ao redefinir senha." });
    }
}

module.exports = { reset, resetPassword };
