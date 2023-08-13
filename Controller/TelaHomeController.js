const TelaHome = require('../Model/TelaHomeModel');

exports.getTelaHome = async (req, res) => {
    try {
        res.render('home');
    } catch (error) {
        console.log(error);
    }
};

exports.home = async (req, res) => {
    try {
        const result = await TelaHome.home(req.body);
        if (result.auth) {
            res.redirect('');
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = exports;