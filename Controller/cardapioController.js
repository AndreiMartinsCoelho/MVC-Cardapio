const cardapioModel = require('../Model/cardapioModel');

let cardapios = [];

async function getCardapios(req, res) {
    const cardapio = await cardapioModel.listaCardapios();
    res.render('layout/default/cardapio',{ cardapio }); // Passando os cardápios para a renderização
}

async function getCardapio(req, res) {
    let cardapio = await cardapioModel.buscarCardapioID(req.params.id);
    if (cardapio.length > 0) {
        console.log(cardapio);
        res.render('cardapio', { erro: "Cardapio não encontrado." });
        cardapio = cardapio[0];
    } else {
        res.render('layout/default/cardapio');
    }
}

async function addCardapio(req, res) {
    const { nome_prato, tempo_prato, descricao_prato, valor_prato, img_prato, categoria } = req.body;
    const cardapio = new cardapioModel(nome_prato, tempo_prato, descricao_prato, valor_prato, img_prato, categoria);
    await cardapio.salvarCardapio();
    res.redirect('/cardapio');
}

module.exports = { getCardapio, addCardapio, getCardapios};