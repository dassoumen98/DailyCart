import User from "../models/user.model.js";

// update User's cartdata
export const updateCart = async (req, res) => {
    try {
        let userId = req.user.id
        let { cartItems } = req.body;
        // console.log("userid",userId);
        
        // console.log("cartitem",cartItems);
        
        let data= await User.findByIdAndUpdate(userId, { cartItems });
        // console.log("db data",data);
        
        res.status(200).json({ 
            success: true,
            message: "Cart updated successfully" });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error updating cart",
                error: error.message
            });
    
        }
 } 

            


        