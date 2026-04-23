import Product from "../models/Product.js";

export const criarProduto = async (req, res) => {
    try{
        const {nome, preco, quantidade, categoria} = req.body;

        const novoProduto = new Product ({
            nome,
            preco,
            quantidade,
            categoria,
            criadoPor: req.user.id
        });

        await novoProduto.save();

        res.status(201).json({
            message: "Produto criado com sucesso",
            produto: novoProduto
        });
    } catch (error){
        res.status(500).json({message: "Erro ao criar produto", erro: error.message});
    }
};