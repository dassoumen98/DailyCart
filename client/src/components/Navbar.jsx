import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/appContext'
import toast from 'react-hot-toast'


export default function Navbar() {
     const [open, setOpen] = React.useState(false)

     const {user , setUser, navigate, setShowUserLogin, searchTerm, setSearchTerm , getCartItemsCount ,axios}= useAppContext()
    
    const logout = async()=>{

        try {
            let {data} =await axios.get('api/user/logout')
            if(data?.success){
                setUser(null)
                navigate('/')
            }
            
        } catch (error) {
            // console.error("Error during logout:", error);
            toast.error("Failed to logout. Please try again.")
            
        }



        setUser(null)
        navigate('/')

    }
  
     
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink onClick={()=>setOpen(false)} to='/'>
                <img  src={assets.logo} width="157" height="40" viewBox="0 0 157 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                   
                </img>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All Products</NavLink>
                <NavLink href="/">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value); navigate('/products') }} className="py-1.5 w-full bg-transparent  outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="" />
                </div>

                <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
                   <img src={assets.cart_icon} alt="cart" className='w-5' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartItemsCount()}</button>
                </div>
                {!user ? (<button onClick={()=>setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                    Login
                </button>):(
                    <div className='relative cursor-pointer group '>
                        <img src={assets.profile_icon} alt="profile_icon" className='w-10' />
                        <ul className='absolute top-10 right-0 bg-white shadow-md rounded-md p-4 text-sm w-40 hover:bg-gray-100 hidden group-hover:block '>
                            <div className='p-1.5 pl-3 hover:bg-primary/15 cursor-pointer' onClick={()=> navigate('my-orders')}>My Orders</div>
                            <div className='p-1.5 pl-3 hover:bg-primary/15 cursor-pointer' onClick={logout}>Logout</div>
                        </ul>

                    </div>)}
                
            </div>

            {/* Mobile Menu Icon */}
            <div className='flex sm:hidden items-center gap-6'>
             <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
                   <img src={assets.cart_icon} alt="cart" className='w-5' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartItemsCount()}</button>
                </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className=" cursor-pointer">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt="menu" />
            </button>
            </div>

            {/* Mobile Menu */}
            {open && (

            
            <div className={`${open ? 'flex' : 'hidden'} absolute z-40 top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm   md:hidden`}>
                <NavLink to='/' className="block" onClick={()=> setOpen(false)}>Home</NavLink>
                <NavLink to='/products' className="block" onClick={()=> setOpen(false)}>All Products</NavLink>
                <NavLink to='/' className="block">Contact</NavLink>

                {user &&
                <NavLink to='my-orders' className="block">My Orders</NavLink>
                }

                
                {!user ? (<button onClick={()=>{ setOpen(false);setShowUserLogin(true)}} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull  transition text-white rounded-full text-sm">
                    Login
                </button> ) :(<button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull  transition text-white rounded-full text-sm">
                    Logout
                </button> )}
                 
            </div>
            )
            }
        </nav>
    
  )
}
