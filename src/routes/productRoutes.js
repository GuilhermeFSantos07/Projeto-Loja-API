import { Router } from "express";
import { criarProduto } from "../controllers/ProductController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
router.post('/', authMiddleware, criarProduto);

export default router;