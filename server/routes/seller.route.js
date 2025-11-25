import express from 'express';
const route = express.Router();
import {
 sellerLoginController, sellerIsAuthController, sellerLogoutController} from '../controllers/seller.controller.js';
import sellerMiddleware from '../middlewares/seller.middleware.js';

// /api/v1/seller/login
// /api/v1/seller/isauth
// /api/v1/seller/logout
route.post('/login', sellerLoginController);
route.get('/isauth', sellerMiddleware, sellerIsAuthController);
route.get('/logout',  sellerLogoutController);

export default route;