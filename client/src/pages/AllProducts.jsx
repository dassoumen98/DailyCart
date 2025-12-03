import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useAppContext } from '../context/appContext'

export default function AllProducts() {
    const {products ,searchTerm}=useAppContext()
    const[filteredProducts, setFilteredProducts]=useState([])
   
    useEffect(() => {
        if(searchTerm === ''){
            setFilteredProducts(products)
        }else{
            const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredProducts(filtered)
        }
    }, [searchTerm, products])

  return (
    <div className='mt-15 '>
    <div className='flex flex-col  w-max items-end'>
        <p className='text-2xl font-medium  uppercase'>All Products </p>
        <div className='h-0.5 w-16 bg-primary rounded'></div>
    </div>
    
    <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {filteredProducts.length>0 &&(
            filteredProducts.map((product,index)=>(
                <ProductCard key={index} product={product} />
            ))
        ) }


    </div>


      
    </div>
  )
}
