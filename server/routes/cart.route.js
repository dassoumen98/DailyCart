
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js"
import { updateCart } from "../controllers/cart.controller.js";

const router = express.Router();
router.post("/update", authMiddleware ,updateCart)

export default router;