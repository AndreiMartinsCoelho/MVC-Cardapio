exports.getTelaCad = async (req, res) => {
    try {
        res.render('cadastroTela');
    } catch (error) {
        console.log(error);
    }
};