import { createContext, useContext ,useState } from "react"
import { useNavigate } from "react-router-dom"
import { dummyProducts } from "../assets/assets"
export const AppContext =createContext()


export const AppContextProvider = ({ children }) => {
    const navigate =useNavigate()
    const [user ,setUser] = useState(false)
    const[isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin]= useState(false)
    const [products, setProducts] = useState([])
    
    // fetch products from backend
     const fetchProducts = async () => {
        setProducts(dummyProducts)
     }
    // call fetch products on component mount
    useState(() => {
        fetchProducts()
    }, [])

    let value ={navigate , user, setUser, isSeller, setIsSeller ,setShowUserLogin, products  }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
