import { createContext, useContext ,useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import { dummyProducts } from "../assets/assets"
import { toast } from "react-hot-toast"
import axios from "axios"
export const AppContext =createContext()

axios.defaults.withCredentials = true; // optional, if using cookies
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;





export const AppContextProvider = ({ children }) => {
    const navigate =useNavigate()
    const [user ,setUser] = useState(false) // user null means not logged in
    const [showUserLogin, setShowUserLogin]= useState(false) // to show user login form 
    
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchTerm, setSearchTerm] = useState('')

    // seller 
    const[isSeller, setIsSeller] = useState(false)
   
   


    //seler login or not chekc
    const fetchSellerStatus = async()=>{
        try {
            let {data} = await axios.get('/api/seller/is-auth')
            console.log(data);
            
            
            if(data.success){
                setIsSeller(true)
            }else{
                setIsSeller(false)
            }
        }   catch (error) {
            setIsSeller(false)                    
            console.error("Error fetching seller status:", error);
            
        }
    }

    // fetch authentic user
    const fetchAuthUser = async()=>{
        try {
            let {data} = await axios.get('/api/user/is-auth')
            console.log(data);
            
            
            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
            
        } catch (error) {
            setUser(null)
            console.log("Error fetching auth user:", error);
        }
    }
 

    
    
    // fetch products from backend
     const fetchProducts = async () => {
        try {
            let {data} = await axios.get('/api/product/list')
            console.log(data);
            
            if(data.success ){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }

            
        } catch (error) {
            toast.error("Error fetching products")
            console.log("Error fetching products:", error);
            
        }
     }
    // call fetch products on component mount
    useEffect(() => {
        fetchProducts()
        fetchSellerStatus()
        fetchAuthUser()
    }, [])


   

    // add to cart
    const addToCart = (itemid) => {
        const cartdata = structuredClone(cartItems)
        if(cartdata[itemid]){
            cartdata[itemid] += 1
        }else{
            cartdata[itemid] =1
        }
        setCartItems(cartdata)
        
        toast.success("Product added to cart")
    }

    // update cart
    // const updateCart = (itemid, qty) => {
    //     const cartdata = structuredClone(cartItems)

    //     cartdata[itemid] = qty
    //     setCartItems(cartdata)
    //     toast.success("Cart updated successfully")
        
    // }
    const updateCart = (itemId, qty) => {
  setCartItems((prev) => ({
    ...prev,
    [itemId]: qty
  }));
  toast.success("Cart updated successfully");
};


    // remove from cart
    const removeFromCart = (itemid) => {
        const cartdata = structuredClone(cartItems)
        if(cartdata[itemid]){{
            cartdata[itemid] -= 1  
            if(cartdata[itemid] === 0){
                delete cartdata[itemid]
                
            }
        }

        }
        setCartItems(cartdata)
        toast.success("Product removed from cart")

    }

    // cart items count
    const getCartItemsCount = ()=>{
        let count=0
        for(const item in cartItems){
            // Count UNIQUE product types (how many different products)
            // if(cartItems[item]>0){
            //     count ++
            // }

            // Count TOTAL items in cart (including multiple quantities of the same product)
            count += cartItems[item]
        }
        return count
    }
    
    // total cart price
    const getTotalCartPrice =()=>{
        let total=0
        for(const item in cartItems){
            const iteminfo =products.find((product)=>product._id===item)
            if(cartItems[item]>0 && iteminfo){
                let itemTotal= cartItems[item] * iteminfo.offerPrice
                total += itemTotal
            }
            
        }
        return total
    
    }


 // update cart in backend whenever cartItems change
    useEffect(() => {
        const updateCartInBackend = async () => {
            try {
                let { data } = await axios.post('/api/cart/update', {
                    cartItems
                });
                // console.log(data);
                
                if(!data.success){
                    toast.error(data.message)
                }
               
            } catch (error) {
                console.error("Error updating cart in backend:", error);
            }
        };
        if(user){
            updateCartInBackend();
        }
    }, [cartItems]);
        
        



    let value ={navigate , 
        user, setUser, 
        isSeller, setIsSeller,
        showUserLogin, setShowUserLogin, 
        products,  addToCart, cartItems, updateCart, removeFromCart,
        searchTerm, setSearchTerm,
        getCartItemsCount, getTotalCartPrice,
        axios ,fetchProducts,setCartItems

    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
