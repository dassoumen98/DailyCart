import { createContext, useContext ,useState } from "react"
import { useNavigate } from "react-router-dom"
import { dummyProducts } from "../assets/assets"
import { toast } from "react-hot-toast"
export const AppContext =createContext()


export const AppContextProvider = ({ children }) => {
    const navigate =useNavigate()
    const [user ,setUser] = useState(false)
    const[isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin]= useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    console.log(
    cartItems
    );
    
    
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
        console.log(cartdata)
        toast.success("Product added to cart")
    }

    // update cart
    const updateCart = (itemid, qty) => {
        const cartdata = structuredClone(cartItems)
        cartdata[itemid] = qty
        setCartItems(cartdata)
        toast.success("Cart updated successfully")
        
    }

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
        
        
        



    let value ={navigate , user, setUser, isSeller, setIsSeller ,setShowUserLogin, products,  addToCart, cartItems, updateCart, removeFromCart}
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
