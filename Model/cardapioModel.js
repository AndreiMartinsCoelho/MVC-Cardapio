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

    static async listaCardapios() {
        return await db.query("SELECT * FROM cardapio");
    }

    static async buscarCardapioID(id) {
        return await db.query("SELECT * FROM cardapio WHERE id_cardapio = ?", [id]);
    }
    
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

    // static async salvarCardapio() {
    //     let resp = await db.query(
    //         "INSERT INTO cardapio (nome_prato, tempo_prato, descricao_prato, valor_prato, img_prato, categoria) VALUES (?, ?, ?, ?, ?, ?)",
    //         [this.nome_prato, this.tempo_prato, this.descricao_prato, this.valor_prato, this.img_prato, this.categoria]
    //     );
    //     this.id_cardapio = resp.insertId;
    // }
    
}

module.exports = Cardapio;