import React from 'react'
import { useAppContext } from './context/appContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


import Home from './pages/Home'
import AllProducts from './pages/AllProducts'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'

import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './components/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import Loading from './components/Loading'

export default function App() {
  
const isSellerPath=useLocation().pathname.includes('seller')
const {showUserLogin , isSeller}=useAppContext()
  
  return (
    <div>
     {isSellerPath ? null : <Navbar/> } 
     
      {showUserLogin ? <Login/> : null }

  

    <Toaster position="top-right"/>

     <div className={ `${isSellerPath ? "" :"px-6 md:px-16 lg:px-24 xl:px-32"}`}>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:category" element={<ProductCategory />} />
        <Route path="/products/:category/:id" element={<ProductDetails />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/add-address' element={<AddAddress/>} />
        <Route path='/my-orders' element={<MyOrders/>} />
        <Route path='/loader' element={<Loading/>} />


        {/* seller routes */}
        {/* if not login then show  seller login component */}
        <Route path='/seller' element={ isSeller ? <SellerLayout/> :<SellerLogin/>} >
            <Route index element={isSeller ? <AddProduct/> : null} />
            <Route path='product-list' element={<ProductList/>} />
            <Route path='Orders' element={<Orders/>} />


        </Route>
    


     </Routes>
     </div>

     {isSellerPath ? null : <Footer/> }

    
    </div>
  )
}
