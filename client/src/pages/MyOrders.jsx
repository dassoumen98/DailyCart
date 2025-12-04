import React from 'react'
import { useEffect, useState } from 'react'
import {dummyOrders } from '../assets/assets'
import { useAppContext } from '../context/appContext'
import toast from 'react-hot-toast'


export default function MyOrders() {
    const {axios,user} = useAppContext();
    const [myOrders, setMyOrders] = useState([])
    const fetchMyOrders = async () => {
        // fetch orders from backend
        try {
            let {data} =await axios.get('/api/order/user');
            console.log(data);
            
            if(data?.success){
                setMyOrders(data.orders)
            }

            
        } catch (error) {
            console.error(error);
            toast.error("Error fetching orders")

            
            
            
        }
        

        
    }
    useEffect(() => {
        if(user){
            fetchMyOrders()

        }
        
    }, [user])

   
    
  return (
    <div className='mt-15 '>
       <div className='flex flex-col  w-max items-end'>
            <p className='text-2xl font-medium  uppercase'>My Orders </p>
            <div className='h-0.5 w-16 bg-primary rounded'></div>

        </div>

        {myOrders.map((order,index)=>(
            <div key={index} className='mt-10 border border-gray-300 rounded-lg p-4 max-w-4xl py-5'>

            <p className='flex justify-between md:items-center text-gray-400 md:font-medium  max-md:flex-col '>
                <span>My Orders: {order._id}</span>
                <span>Payment :  {order.paymentType}</span>
                <span>Total Amount : $ {order.amount}</span>
            </p>

            {order.items.map((item,idx)=>(
                <div className={`relative flex flex-col justify-between md:items-center mt-4 ${order.items.lenght != index+1 && "border-b"} border-gray-300 pb-4 md:flex-row md:gap-16  w-full max-w-4xl `}key={idx}>

                    <div className="flex items-center mb-4 md:mb-0">

                        <div className="bg-primary/10 p-4 rounded-lg">
                            <img src={item.product.image[0]} alt={item.product.name} className="w-16 h-16 " />
                        </div>
                        <div className="ml-4">
                            <h2 className=' text-xl '>{item.product.name}</h2>
                            <p className=' text-sm text-gray-400'>Category: {item.product.category}</p>
                        </div>
                    </div>
                     <div className=''>
                            <p className=' text-sm text-gray-'>Quantity: {item.quantity ||"1"}</p>
                            <p className=' text-sm text-gray-'>Status: {order.status}</p>
                            <p className='text-sm text-gray-'>Date : {new Date(order.createdAt).toLocaleDateString()}</p> 
                        </div>

                        <p className=' text-lg font-medium text-primary'>Amount: $ {item.product.offerPrice * item.quantity}</p>

                       
                </div>

                         
            ))}


            </div>


        ))}

    </div>
) }
                
                


   
