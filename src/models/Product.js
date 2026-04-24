import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    preco: {type: Number, required: true},
    quantidade: {type: Number, default: 0},
    categoria: {type: String},
    criadoEm: {type: Date, default: Date.now},
    criadoPor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

export default mongoose.model('Product', ProductSchema);