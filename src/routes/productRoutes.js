import { Router } from "express";
import { criarProduto } from "../controllers/ProductController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();
router.post('/', authMiddleware, criarProduto);

export default router;