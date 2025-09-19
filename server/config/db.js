import mongoose from  'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.URL_DB)
        console.log("MongoDB connected")
    } catch (error) {
        console.log("Error in DB connection",error)
    }   
}
export default connectDB