import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try{
        const {username, senha} = req.body;

        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: "Usuário não encontrado"});
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if(!senhaValida){
            return res.status(400).json({message: "Senha incorreta"});
        }

        const token = jwt.sign (
            {id: user._id, cargo: user.cargo},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        res.json({
            message: "Login realizado com sucesso!",
            token,
            user: {nome: user.nome, cargo: user.cargo}
        })
    } catch(error){
        res.status(500).json({message: "Erro interno no servidor", error});
    }
};

export const registrar = async (req, res) => {
    try{
        const {nome, username, senha, cargo} = req.body;

        const usuarioExistente = await User.findOne({username});
        if(usuarioExistente){
            return res.status(400).json({message: "Este username já está em uso"});
        }

        const novoUsuario = new User ({
            nome,
            username,
            senha,
            cargo: cargo || 'vendedor'
        });

        await novoUsuario.save();

        res.status(201).json({message: "Usuário criado com sucesso no MongoDB"});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Erro interno no servidor ao criar usuário"});
    }
};