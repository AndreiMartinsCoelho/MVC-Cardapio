const TelaWelcome = require('../Model/TelaWelcomeModel');

exports.getTelaWelcome = async (req, res) => {
    try {
        res.render('welcome');
    } catch (error) {
        console.log(error);
    }
};

exports.welcome = async (req, res) => {
    try {
        const result = await TelaWelcome.welcome(req.body);
        if (result.auth) {
            res.redirect('');
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = exports;