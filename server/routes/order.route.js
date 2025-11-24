import express from 'express';
import{palaceOrderCOD,getUserOrders,getAllOrders} from '../controllers/order.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import sellerMiddleware from '../middlewares/seller.middleware.js';

const router = express.Router();
router.post('/cod',  authMiddleware,palaceOrderCOD);
router.get('/user', authMiddleware, getUserOrders);
router.get('/seller',sellerMiddleware ,getAllOrders);
export default router; 