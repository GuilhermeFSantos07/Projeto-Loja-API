import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema ({
    nome: {type: String, require: true},
    username: {type: String, require: true, unique: true},
    senha: {type: String, require: true},
    cargo: {
        type: String,
        enum: ['dev', 'gerente', 'vendedor'],
        default: 'vendedor'
    }
}, {timestamps: true});

UserSchema.pre('save', async function (){
    if (!this.isModified('senha')) return next();
    this.senha = await bcrypt.hash(this.senha, 10);
});

UserSchema.methods.compararSenha = async function (senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};

export default mongoose.model('User', UserSchema);