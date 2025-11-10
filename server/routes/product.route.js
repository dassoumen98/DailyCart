import express from 'express';
const route = express.Router();
import sellerMiddleware from '../middlewares/auth.middleware.js';
import { addProductController, productById, productListController , changeStock} from '../controllers/product.controller.js';
import {upload} from '../config/multer.js';

// /api/v1/product/
route.post('/add-product', upload.array(["images"]), sellerMiddleware, addProductController); // Allows up to 5 images under the key 'images'
route.get('/list', productListController);
route.get('/id' , productById)
route.post('/stock' , sellerMiddleware, changeStock)


export default route;