import Product from '../models/product.model.js';
import Order from '../models/order.model.js';

export const palaceOrderCOD = async (req, res) => {
    try {
            const { userId , address, items } = req.body;

            if( !address  || items.length === 0){
                return res.status(400).send({
                    success: false,
                    message: 'Address and items are required to place an order'
                });
            }

            // Calculate total amount
        let amount =await items.reduce(async (acc, item) => {
            const product= await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;

            
        } ,0)

        // add tax  Charge (2%)
        amount+= Math.floor(amount * 0.02);
        // save order to database
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD',
           
        });
        return res.status(201).send({
            success: true,
            message: 'Order placed successfully'
        });

    
}  catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error placing order',
            error: error.message
        });
        
    }
}

// get orders by user id /api/orders/user
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({
             userId,
             $or:[{paymentType:'COD'},{isPaid:true  }]

            }).populate('items.product').populate('address').sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            orders
        });
    } catch (error) {
        return res.status(500).send({
            success: false,         
            message: error.message
            
        });
    }   
}

// get all orders for admin /api/orders/seller
export const getAllOrders = async (req, res) => {
    try {
        
        const orders = await Order.find({
           
             $or:[{paymentType:'COD'},{isPaid:true  }]

            }).populate('items.product').populate('address').sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            orders
        });
    } catch (error) {
        return res.status(500).send({
            success: false,         
            message: error.message,
         
        });
    }   
}