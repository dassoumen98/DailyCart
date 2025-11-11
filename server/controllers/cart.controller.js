import User from "../models/user.model.js";

// update User's cartdata
export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;
        await User.findByIdAndDelete(userId, { cartItems });
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

            


        