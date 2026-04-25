import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/saleRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/produtos', productRoutes);
app.use('/api/vendas', saleRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado ao MongoBD com sucesso"))
    .catch(err => console.error("Erro ao conectar ao MongoBD", err));

app.get('/', (req, res) => {
    res.send("API está online");
});

if(process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

export default app;