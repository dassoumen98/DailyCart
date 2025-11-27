import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDB from './config/db.js';
import userRoute from './routes/user.route.js'
import sellerRoute from './routes/seller.route.js'
import connectCloudinary from './config/cloudinary.js';
import productRoute from './routes/product.route.js'
import cartRoute from './routes/cart.route.js'
import addressRoute from './routes/address.route.js'
import orderRoute from './routes/order.route.js'
import { stripeWebhook } from './controllers/order.controller.js';

 

const app = express();
const PORT =process.env.PORT ||8000; 

 
 await connectDB();
 await connectCloudinary()

// middleware configuration
app.use(express.json());// to parse json  data from request body
app.use(cookieParser());// to parse cookies from request headers
app.use(morgan('dev')) // to log http requests in the console

const allowedOrigins = [ "http://localhost:5173",];
app.use(cors({
  origin: allowedOrigins,
  credentials: true  
})); //to enable cross-origin resource sharing

app.post('/stripe', express.raw({type:'application/json'}), stripeWebhook )
// import routers
app.use('/api/v1/user' , userRoute)
app.use('/api/v1/seller' , sellerRoute) 
app.use('/api/v1/product' , productRoute)
app.use('/api/v1/cart' , cartRoute)
app.use('/api/v1/address' , addressRoute)
app.use('/api/v1/order' , orderRoute)



app.get('/',(req,res)=>{
    res.send("Hello from express server");
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    

});

        