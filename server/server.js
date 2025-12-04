import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectCloudinary from './config/cloudinary.js';

import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRouter.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
dotenv.config();


const app = express();
const port = process.env.PORT||5000;

await connectDB()
await connectCloudinary()

 
const allowedOrigins = [ 
    'http://localhost:5173',
    'https://dailycart-client.vercel.app'
]
// middleware configuration
app.use(express.json());// to parse json  data from request body
app.use(cookieParser());// to parse cookies from request headers
app.use(morgan('dev')) // to log http requests in the console
// app.use(cors({
//     origin:allowedOrigins,
//     credentials:true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));// to enable CORS for specified origins

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin); // dynamically set origin
    }
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res) => res.send("API is Working"));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter); // to serve static files from uploads folder
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

app.listen(port, ()=>{
console.log(`Server is running on http://localhost:${port}`);
})    