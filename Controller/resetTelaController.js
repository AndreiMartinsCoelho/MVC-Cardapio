exports.getTelaReset = async (req, res) => {
    try {
        res.render('resetSenha');
    } catch (error) {
        console.log(error);
    }
};