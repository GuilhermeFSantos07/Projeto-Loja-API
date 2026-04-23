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

export const listarProdutos = async (req, res) => {
    try{
        const produtos = await Product.find().populate('criadoPor', 'nome');
        res.status(200).json(produtos);
    }catch(error){
        res.status(500).json({message: "Erro ao buscar produtos", erro: error.message});
    }
};

export const atualizarProdutos = async (req, res) => {
    try{
        const {id} = req.params;
        const dadosAtualizados = req.body;

        const produto = await Product.findByIdAndUpdate(id, dadosAtualizados, {new: true});

        if(!produto) return res.status(404).json({message: "Produto não encontrado"});

        res.status(200).json({message: "Produto atualizado", produto});
    }catch(error){
        res.status(500).json({message: "Erro ao atualizar produto", erro: error.message});
    }
};

export const deletarProduto = async (req, res) => {
    try{
        const {id} = req.params;

        const produtoDeletado = await Product.findByIdAndDelete(id);
        if(!produtoDeletado) return res.status(404).json({message: "Produto não encontrado"});

        res.status(200).json({message: "Produto deletado com sucesso"});
    }catch(error){
        res.status(500).json({message: "Erro ao deletar produto", erro: error.message});
    }
};