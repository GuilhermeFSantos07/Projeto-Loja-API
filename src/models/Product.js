import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    nome: {type: String, require: true},
    preco: {type: Number, require: true},
    quantidade: {type: Number, default: 0},
    categoria: {type: String},
    criadoEm: {type: Date, default: Date.now},
    criadoPor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

export default mongoose.model('Product', ProductSchema);