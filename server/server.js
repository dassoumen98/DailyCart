import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDB from './config/db.js';
import userRoute from './routes/user.route.js'
import sellerRoute from './routes/seller.route.js'

const app = express();
const PORT =process.env.PORT ||8000;

// middleware configuration
app.use(express.json());// to parse json  data from request body
app.use(cookieParser());// to parse cookies from request headers
app.use(morgan('dev')) // to log http requests in the console

const allowedOrigins = [ "http://localhost:5173",  ];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
})); //to enable cross-origin resource sharing

// import routers
app.use('/api/v1/user' , userRoute)
app.use('/api/v1/seller' , sellerRoute)
  
app.get('/',(req,res)=>{
    res.send("Hello from express server");
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();

});

  