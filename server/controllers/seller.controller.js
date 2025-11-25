
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//  /api/seller/login
// seller login controller
export const sellerLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check eamil and password is matchin with env email and password
        if(email === process.env.SELLER_EMAIL && password ===process.env.SELLER_PASSWORD){

            const sellerToken =jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7d'})
             
            res.cookie("sellerToken", sellerToken, {
            httpOnly: true,  // JS can't access cookie
            secure: process.env.NODE_ENV === "production", // only https in prod
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            return res.status(200).send({
                success: true,
                message: 'Seller logged in successfully',
                sellerToken: sellerToken
            })

        }else
        {
            return res.status(401).send({
                success: false,
                message: 'Invalid Seller Credentials'
            })
        }
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message

        })
        
    }
}

// seller isAuth controller
export const sellerIsAuthController = async (req, res) => {
    try {
        return res.status(200).send({
            success: true,
            message: 'Seller is authenticated'
        })} catch (error) {
        res.status(500).send({
            success: false,
            message: error.message      
        })
    }
}

// seller logout controller
export const sellerLogoutController = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.status(200).send({
            success: true,
            message: 'Seller logged out successfully'
        })
    }
        catch (error) {
        res.status(500).send({
            success: false,
            message: error.message      
        })
    }
}


