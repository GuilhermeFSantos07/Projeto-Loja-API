import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema ({
    nome: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    senha: {type: String, required: true},
    cargo: {
        type: String,
        enum: ['dev', 'gerente', 'vendedor'],
        default: 'vendedor'
    }
}, {timestamps: true});

UserSchema.pre('save', async function (){
    if (!this.isModified('senha')) return;
    this.senha = await bcrypt.hash(this.senha, 10);
});

UserSchema.methods.compararSenha = async function (senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};

export default mongoose.model('User', UserSchema);