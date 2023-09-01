const cardapioModel = require("../Model/cardapioModel");

let cardapios = [];

async function getCardapios(req, res) {
  const cardapio = await cardapioModel.listaCardapios();
  res.render("cardapio", { cardapio }); // Passando os cardápios para a renderização
}

async function getCardapio(req, res) {
  let cardapio = await cardapioModel.buscarCardapioID(req.params.id);
  if (cardapio.length > 0) {
    console.log(cardapio);
    res.render("cardapio", { erro: "Cardapio não encontrado." });
    cardapio = cardapio[0];
  } else {
    //res.render('layout/default/cardapio');
  }
}

async function addCardapio(req, res) {

  if(!req.body.nome_prato || !req.body.tempo_preparo || !req.body.descricao_prato || !req.body.valor_prato || !req.body.img_prato || !req.body.categoria){
    throw new Error("Todos os campos são obrigatórios.");
  }

  const {
    nome_prato,
    tempo_preparo,
    descricao_prato,
    valor_prato,
    img_prato,
    categoria,
  } = req.body;

  console.log("req.body", req.body);

  try {
    const data = await cardapioModel.cadastrarCardapio({
      nome_prato,
      tempo_preparo,
      descricao_prato,
      valor_prato,
      img_prato,
      categoria,
    });

    // console.log("data", data);

    if (data.auth) {
      //Cadastro realizado com sucesso
      res.redirect("/home");
    } else {
      // Ocorreu um erro no cadastro
      console.log("Erro no cadastro do cardapio.", data);
    }
  } catch (error) {
    console.error("Erro no cadastro do cardapio:", error);
    throw error;
  }
}

module.exports = { getCardapio, addCardapio, getCardapios };
