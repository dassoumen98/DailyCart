import dotenv from 'dotenv';
dotenv.config()
import jwt from 'jsonwebtoken';
const sellerMiddleware = (req, res, next) => {
    try {
        const {sellerToken} = req.cookies;
        // console.log(sellerToken);
        
        if(!sellerToken){
            return res.status(401).send({
                success:false,
                message:'No token provided'
            })
        }
         const tokenDecoded =jwt.verify(sellerToken, process.env.JWT_SECRET);
        //  cheek seller email is matching with the token email
        if(tokenDecoded.email ===process.env.SELLER_EMAIL){
            next()
        }else{
            return res.status(403).send({
                success:false,
                message:'Access forbidden: You are not authorized to access this resource'
            })
        }

    } catch (error) {
        return res.status(401).send({
            success:false,
            message:error.message
        })
        
    }
}

export default sellerMiddleware;