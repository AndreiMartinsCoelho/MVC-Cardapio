const TelaLogin = require('../Model/TelaLoginModel');

exports.getTelaLogin = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error);
    }
};

exports.login = async (req, res) => {
    try {
        const result = await TelaLogin.login(req.body);
        if (result.auth) {
            res.redirect('');
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = exports;
