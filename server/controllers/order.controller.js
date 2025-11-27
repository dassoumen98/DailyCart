import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import Stripe from 'stripe';
import User from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

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

// place order online payment stripe /api/orders/stripe
export const palaceOrderStripe=async(req,res)=>{
    try {
        const { userId , address, items ,} = req.body;
        const {origin} = req.headers;

         if( !address  || items.length === 0){
                return res.status(400).send({
                    success: false,
                    message: 'Address and items are required to place an order'
                });
            }

        let productData=[];
        // Calculate total amount
        let amount =await items.reduce(async (acc, item) => {
            const product= await Product.findById(item.product);
            productData.push({
                name:product.name,
                price:product.offerPrice,
                quantity:item.quantity
            })
            return (await acc) + product.offerPrice * item.quantity;

            
        } ,0)

        // add tax  Charge (2%)
        amount+= Math.floor(amount * 0.02);
        // save order to database
        const order= await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'Online',
           
        });

        // stripe gateway
        const stripeInstance =new Stripe (process.env.STRIPE_SECRET_KEY);

        // create line items for stripe
        const line_items= productData.map((item)=>{
            return {
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:item.name,
                    },
                    unit_amount:Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity:item.quantity
            }
        });
        // create stripe session
        const session= await stripeInstance.checkout.sessions.create({
            line_items,
            mode:'payment',
            success_url:`${origin}/loader?next=my-orders`,
            cancel_url:`${origin}/cart`,
            metadata:{
                orderId:order._id.toString(),
                userId,
            }
        });



        return res.status(201).send({
            success: true,
            url:session.url
        });

        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error placing order',
            error: error.message
        });
        
    }
}

// stripe webhook to handle payment status
export const stripeWebhook=async(req,res)=>{
    const stripeInstance =new Stripe (process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the event
    switch (event.type) {
        case'payment_intent.succeeded':{
            const paymentIntent = event.data.object;
            const paymentIntentId=paymentIntent.id;
            // getting session metadata
            const session= await stripeInstance.checkout.sessions.listLineItems({
                payment_intent:paymentIntentId,
            })
            const {orderId,userId}=session.data[0].metadata;
            // mark order payment as paid
            await Order.findByIdAndUpdate(orderId,{isPaid:true,});
            // clear user cart
            await User.findByIdAndUpdate(userId,{cartItems:{}})

            break;
        }
        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object;
            const paymentIntentId=paymentIntent.id;
            // getting session metadata
            const session= await stripeInstance.checkout.sessions.listLineItems({
                payment_intent:paymentIntentId,
            })
            const {orderId}=session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }  

        default:
            console.log(`Unhandled event type ${event.type}`);
            break;

    }
    
    res.status(200).send({received: true});
}

// get orders by user id /api/orders/user
export const getUserOrders = async (req, res) => {
    try {
        let userId = req.user.id
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