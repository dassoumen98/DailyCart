import { createContext, useContext ,useState } from "react"
import { useNavigate } from "react-router-dom"
import { dummyProducts } from "../assets/assets"
import { toast } from "react-hot-toast"
export const AppContext =createContext()


export const AppContextProvider = ({ children }) => {
    const navigate =useNavigate()
    const [user ,setUser] = useState(false) // user null means not logged in
    const[isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin]= useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchTerm, setSearchTerm] = useState('')


    
    
    // fetch products from backend
     const fetchProducts = async () => {
        setProducts(dummyProducts)
     }
    // call fetch products on component mount
    useState(() => {
        fetchProducts()
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
        return total.toFixed(2)
    
    }
    
        
        
        



    let value ={navigate , 
        user, setUser, 
        isSeller, setIsSeller ,
        showUserLogin, setShowUserLogin, 
        products,  addToCart, cartItems, updateCart, removeFromCart,
        searchTerm, setSearchTerm,
        getCartItemsCount, getTotalCartPrice
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
