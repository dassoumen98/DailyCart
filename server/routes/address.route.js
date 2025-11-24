import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { addAddressController,getAddressesController } from '../controllers/address.controller.js';

const router = express.Router();
router.post('/add',authMiddleware, addAddressController);
router.get('/get',authMiddleware, getAddressesController);
export default router;