import express from 'express';
const route = express.Router();
import {
 sellerLoginController, sellerIsAuthController, sellerLogoutController} from '../controllers/seller.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

// /api/v1/seller/login
// /api/v1/seller/isauth
// /api/v1/seller/logout
route.post('/login', sellerLoginController);
route.get('/isauth', authMiddleware, sellerIsAuthController);
route.get('/logout', authMiddleware, sellerLogoutController);

export default route;