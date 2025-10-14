import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const authMiddleware =(req,res,next)=>{
    const token =req.cookies.token
   
    
    if(!token){
        return res.status(401).send({
            success:false,
            message:'No token provided'
        })

    }
    try {
        const decoded =jwt.verify(token,process.env.JWT_SECRET)
        // if(decoded.id){
        //     req.body.userId =decoded.id

        // }
         req.user = decoded; // ✅ safer than using req.body
        
        
    
        
        next() 
    } catch (error) {
        return res.status(401).send({
            success:false,
            message:error.message
        })

}

}

export default authMiddleware;