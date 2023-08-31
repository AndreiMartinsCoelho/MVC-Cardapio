const resetModel = require("../Model/resetModel");

async function reset(req, res) {
  res.render("resetSenha");
}

async function resetPassword(req, res) {
    const { email, novaSenha, confirmSenha } = req.body;
    try {
        const resp = await resetModel.changePassword({ email, novaSenha, confirmSenha });
        console.log("Senha alterada:", resp);

        if (resp.auth) {
            console.log("Senha alterada com sucesso!", resp);
            res.redirect('/login'); // Redireciona para a tela de login
        } else {
            const erro = resp.message;
            console.log("Senha errada!!!:", erro, resp);
            res.render('resetSenha', { erro });
        }
    } catch (error) {
        res.render('resetSenha', { erro: "Erro ao redefinir senha." });
        console.log("Erro ao redefinir senha:", error);
    }
}


module.exports = { reset, resetPassword };
