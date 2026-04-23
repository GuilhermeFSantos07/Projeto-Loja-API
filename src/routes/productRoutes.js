import { Router } from "express";
import { 
    criarProduto,
    listarProdutos,
    atualizarProdutos,
    deletarProduto
 } from "../controllers/ProductController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/', authMiddleware, criarProduto);
router.get('/', authMiddleware, listarProdutos);
router.put('/:id', authMiddleware, atualizarProdutos);
router.delete('/:id', authMiddleware, deletarProduto);

export default router;