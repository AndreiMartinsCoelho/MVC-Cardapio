const cardapioModel = require("../Model/cardapioModel");

let cardapios = [];

//============================CARREGA O LAYOUT DO CARDAPIO=================================================
async function getCardapios(req, res) {
  const cardapio = await cardapioModel.listaCardapios();
  res.render("cardapio", { cardapio }); // Passando os cardápios para a renderização
}

//============================CARREGA TODOS CARDAPIO=================================================
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

//=======================Cadastro de cardapio================================
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

// Função para processar a exclusão de um cardápio específico
async function postExcluirCardapio(req, res) {
  const id = req.params.id;

  try {
    // Chame a função do modelo para excluir o cardápio
    await cardapioModel.excluirCardapio(id);
    res.redirect('/home');
  } catch (error) {
    res.render('erro', { mensagem: 'Erro ao excluir o cardápio.' });
  }
}

async function getEditarCardapio(req, res) {
  const { id } = req.params;
  try {
      const cardapio = await cardapioModel.buscarCardapioID(id);
      if (cardapio.length > 0) {
          res.render('editar-cardapio', { cardapio: cardapio[0] });
      } else {
          res.render('erro', { mensagem: 'Cardápio não encontrado.' });
      }
  } catch (error) {
      res.status(500).send('Erro ao carregar a página de edição de cardápio.');
  }
}

// Rota para processar a edição de cardápio
async function postEditarCardapio(req, res) {
  const { id } = req.params;
  const { nome_prato, tempo_preparo, descricao_prato, valor_prato, categoria } = req.body;
  try {
      const newData = {
          nome_prato,
          tempo_preparo,
          descricao_prato,
          valor_prato,
          categoria,
      };

      await cardapioModel.editarCardapio(id, newData);

      res.redirect('/cardapios');
  } catch (error) {
      res.status(500).send('Erro ao editar o cardápio.');
  }
}

module.exports = { getCardapio, addCardapio, getCardapios, postExcluirCardapio, getEditarCardapio, postEditarCardapio };
