import Sale from "../models/Sale.js";
import Product from '../models/Product.js';

export const registrarVenda = async (req, res) => {
    try{
        const {itens, valorTotal, metodoPagamento, desconto} = req.body;

        const novaVenda = new Sale({
            valorTotal,
            metodoPagamento,
            desconto,
            vendedor: req.user.id || req.user._id,
            itens
        });
        await novaVenda.save();

        for (let item of itens){
            await Product.findByIdAndUpdate(item.produtoId, {
                $inc : {quantidade: -item.quantidadeVendida}
            });
        }
        res.status(201).json({message: "Venda registrada e estoque atualizado", venda: novaVenda});
    }catch(error){
        res.status(500).json({message: "Erro ao registrar venda", erro: error.message});
    }
};

export const listarVendas = async (req, res) => {
    try{
        const vendas = await Sale.find().populate('vendedor', 'nome').sort({data: -1});
        res.status(200).json(vendas);
    }catch(error){
        res.status(500).json({message: "Erro ao buscar vendas", erro: error.message});
    }
};