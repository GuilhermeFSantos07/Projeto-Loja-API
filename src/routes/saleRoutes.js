import { Router } from "express";
import { registrarVenda } from "../controllers/SaleController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/', authMiddleware, registrarVenda);

export default router;