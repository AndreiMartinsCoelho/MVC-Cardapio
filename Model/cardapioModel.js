const db = require('./database');

class Cardapio{
    constructor(nome_prato, tempo_preparo, descricao_prato, valor_prato, img_prato, categoria){
        this.nome_prato = nome_prato;
        this.tempo_preparo = tempo_preparo;
        this.descricao_prato = descricao_prato;
        this.valor_prato = valor_prato;
        this.img_prato = img_prato;
        this.categoria = categoria;
    }

    //=====================================LISTAR OS CARDAPIOS==============================================================
    static async listaCardapios() {
        return await db.query("SELECT * FROM cardapio");
    }

    //=====================================BUSCA POR ID==============================================================
    static async buscarCardapioID(id) {
        return await db.query("SELECT * FROM cardapio WHERE id_cardapio = ?", [id]);
    }
    
    //=====================================CADASTRAR OS CARDAPIOS==============================================================
    static async cadastrarCardapio(data) {
        const { nome_prato, tempo_preparo, descricao_prato, valor_prato, img_prato, categoria } = data;
        const sql = "INSERT INTO cardapio (nome_prato, tempo_preparo, descricao_prato, valor_prato, img_prato, categoria) VALUES (?, ?, ?, ?, ?, ?)";
        // console.log("dgdggd", data);
        try {
            const results = await db.query(sql, [nome_prato, tempo_preparo, descricao_prato, valor_prato, img_prato, categoria]);
            const id = results.insertId;
            return { auth: true, message: "Cardapio cadastrado com sucesso!", Cardapio: {id, nome_prato, tempo_preparo, descricao_prato, valor_prato, img_prato, categoria } };
        } catch (error) {
            console.error("Erro no cadastro do cardapio:", error);
            throw error; // Lançar o erro para que possa ser tratado em algum lugar
        }
        
    }

    static async salvarCardapio() {
        let resp = await db.query(
            "INSERT INTO cardapio (nome_prato, tempo_prato, descricao_prato, valor_prato, img_prato, categoria) VALUES (?, ?, ?, ?, ?, ?)",
            [this.nome_prato, this.tempo_prato, this.descricao_prato, this.valor_prato, this.img_prato, this.categoria]
        );
        this.id_cardapio = resp.insertId;
    }

    // Função para editar um cardápio específico
    static async editarCardapio(id, newData) {
        const { nome_prato, tempo_preparo, descricao_prato, valor_prato, categoria } = newData;
        try {
            await db.query('UPDATE cardapio SET nome_prato=?, tempo_preparo=?, descricao_prato=?, valor_prato=?, categoria=? WHERE id_cardapio=?',
                [nome_prato, tempo_preparo, descricao_prato, valor_prato, categoria, id]);
        } catch (error) {
            throw error;
        }
    }
  
    static async excluirCardapio(id) {
        try {
          await db.query('DELETE FROM cardapio WHERE id_cardapio=?', [id]);
        } catch (error) {
          throw error;
        }
    }
    
}

module.exports = Cardapio;