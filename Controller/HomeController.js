const cardapioModel = require("../Model/cardapioModel");

async function getHomePage(req, res) {
    try {
        const cardapio = await cardapioModel.listaCardapios();
        res.render("home", { cardapio }); // Passando a variável cardapios para a visão
    } catch (error) {
        res.render("erro", { mensagem: "Erro ao carregar cardápios." });
    }
}

module.exports = { getHomePage };
