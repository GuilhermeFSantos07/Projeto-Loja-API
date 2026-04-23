import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({message: "Acesso negado. Token não fornecido"});
    }

    try{
        const tokenLimpo = token.replace ('Bearer ', '');

        const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }catch(error) {
        res.status(401).json({message: "Token inválido ou expirado"})
    }
};