import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema({
    data: {type: Date, default: Date.now},
    valorTotal: {type: Number, required: true},
    metodoPagamento: {type: String, required: true},
    desconto : {type: Number, default: 0},
    vendedor: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    itens: [{
        produtoId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        nome: {type: String, required: true},
        precoUnitario: {type: String, required: true},
        quantidadeVendida: {type: Number, required: true}
    }]
});

export default mongoose.model('Sale', SaleSchema);