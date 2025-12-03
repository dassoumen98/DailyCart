import  { use, useEffect, useState } from 'react';
import { assets, dummyAddress } from '../assets/assets';
import { useAppContext } from '../context/appContext';
import { toast } from 'react-hot-toast';
const Cart= () => {
    const { navigate,getCartItemsCount, products, cartItems , updateCart, removeFromCart ,getTotalCartPrice, user, axios ,setCartItems} = useAppContext()

    // state to show/hide address change section
    const [showAddress, setShowAddress] = useState(false)
    // all address related states are dummy for now
    const [address, setAddress] = useState([])
    // currently selected address
    const [selectedAddress, setSelectedAddress] = useState(null)
     console.log(selectedAddress);
     
    // array of products in cart with quantity
    const [cartArray, setCartArray] = useState([ ])
    const [paymentMethod, setPaymentMethod] = useState('COD')

    // convert cartItems object to array of objects with product details and quantity
    const getCartData =()=>{
         const cartData = []
        for (const itemId in cartItems) {
            const product = products.find((p) => p._id === itemId)
            if (product) {
                cartData.push({
                    ...product,
                    quantity: cartItems[itemId]
                })
            }
        }
        setCartArray(cartData)

    }
    // fetch user address from server
    const getUserAddress = async () => {
        try {
            const { data } = await axios.get('api/address/get');
            console.log(data);
            
            if (data?.success) {
                setAddress(data?.addresses);
                // set first address as selected by default
                if(data?.addresses.length > 0){
                    setSelectedAddress(data?.addresses[0]);
                }   
            } else {
                toast.error(data?.message);
            }   

            
            
        } catch (error) {
            console.error(error);
            
            toast.error(error.message);
        }
    }

     const placeOrder = async () => {
        try {
            if(!selectedAddress){
                toast.error("Please select a delivery address");
                return;
            }
            if(paymentMethod === "COD"){
                const {data} = await axios.post('api/order/cod',{
                    userId: user._id,
                    items: cartArray.map((item)=>({product: item._id,quantity: item.quantity})),
                    address: selectedAddress._id

                });
                console.log(data)
                
                if(data?.success){
                    toast.success(data?.message);
                    setCartItems({});
                    navigate('/my-orders');
                }else{
                    toast.error(data?.message);
                }
                   
                   

            }
            // online payment
            else{
                const { data } = await axios.post('api/order/stripe', {
                    userId: user._id,
                    items: cartArray.map(item => ({product: item._id, quantity: item.quantity})),
                    address: selectedAddress._id
                });
                if(data.success){
                
                    window.location.replace(data.url);
                }else{
                    toast.error(data.message);
                }
            }

            
        } catch (error) {
            console.error(error);
            toast.error( error?.response?.data?.message || error.message);
            
        }
    }
        


    useEffect(() => {   
        if(products.length > 0 && cartItems){
            getCartData()
        }
       
    }, [cartItems, products])

    useEffect(() => {
        if(user){
            getUserAddress();
        }
    }, [user]);
    
    console.log(cartArray)
    // console.log("cartItems",cartItems);

    // calculate price, tax, total amount
    let price = getTotalCartPrice()
    let tax = (getTotalCartPrice()*2)/100
    let totalAmount = price + tax 
    // console.log(typeof(totalAmount));

    // console.log(paymentMethod);
    
    


   
    return products.length > 0 && cartItems?  (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartItemsCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select className='outline-none' onChange={(e) => updateCart(product._id, Number(e.target.value)) } value={cartItems[product._id]}>
                                            {Array(cartItems[product._id]>9 ? cartItems[product._id] :9).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">${product.offerPrice * product.quantity}</p>
                        <button onClick={()=>removeFromCart(product._id)} className="cursor-pointer mx-auto">
                            <img src={assets.remove_icon} alt="" />
                        </button>
                    </div>)
                )}

                <button onClick={()=>navigate("/products")} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                   <img src={assets.arrow_right_icon_colored} alt="arrow icon" />
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                    {/* show selectedAddress if have  */}
                        <p className="text-gray-500">{selectedAddress? `
                       ${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}`: "No address found"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                            {address.map((addr ,index) => (
                                <p onClick={() =>{ setSelectedAddress(addr);
                                    setShowAddress(false)}} className="text-gray-500 p-2 hover:bg-gray-100">
                                    {`${addr.street},${addr.city},${addr.state},${addr.country}`}
                                </p>))}
                                
                                <p onClick={() => navigate('add-address')} className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={(e)=>setPaymentMethod(e.target.value)} value={paymentMethod} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{price}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{tax}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{totalAmount.toFixed(2)}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:primary-dull transition">
                    {paymentMethod === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center h-[70vh] gap-6">
            <img className="w-15 md:w-48" src={assets.cart_icon} alt="empty cart" />
            <p className="text-2xl font-medium">Your cart is empty!</p>
            <button onClick={()=>navigate("/products")} className="cursor-pointer flex items-center gap-2 text-primary font-medium">
                <img src={assets.arrow_right_icon_colored} alt="arrow icon" />
                Shop Now    
            </button>
        </div>
    )
}

export default Cart;