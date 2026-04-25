import { Router } from "express";
import { registrarVenda, listarVendas } from "../controllers/SaleController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/', authMiddleware, registrarVenda);
router.get('/', authMiddleware, listarVendas);

export default router;