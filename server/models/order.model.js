import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user:{type:String, required:true, ref:'User'},
    items:[{
        productId:{type:String, required:true, ref:'Product'},
        quantity:{type:Number, required:true}
    }],
    amount:{type:Number, required:true},
    address:{type:String, required:true ,ref:'Address'}, 
    status:{type:String, default:"Order placed"},
    paymentType:{type:String, required:true},
    isPaid:{type:Boolean, required:true, default:false},
},
{timestamps:true}
)

const Order =mongoose.model.Order ||mongoose.model('Order', orderSchema)
export default Order;