exports.getTelaLogin = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error);
    }
};

module.exports = exports;
