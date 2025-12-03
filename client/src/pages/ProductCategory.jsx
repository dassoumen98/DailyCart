import React from 'react'
import { useAppContext } from '../context/appContext'
import { useParams } from 'react-router-dom'
import { categories } from "../assets/assets"
import ProductCard from '../components/ProductCard'
export default function ProductCategory() {
  const {products }=useAppContext()
  const {category}=useParams()
  // find category header info
  const categoryHeader= categories.find((cat)=>cat.path.toLowerCase() === category.toLowerCase())
  // filter products based on category
  const filteredProducts=products.filter((product)=>product.category.toLowerCase() === category.toLowerCase())  
  
  
  
  return (
    <div className='mt-15 '>
    <div className='flex flex-col  w-max items-end'>
        <p className='text-2xl font-medium  uppercase'>{ categoryHeader.text} </p>
        <div className='h-0.5 w-16 bg-primary rounded'></div>
    </div>
        <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {filteredProducts.length>0 ?(
            filteredProducts.map((product,index)=>(
                <ProductCard key={index} product={product} />
            ))
        ) :(
            <p className='text-lg text-gray-500'>No products found in this category.</p>
        )
        
        }


    </div>
      
    </div>
  )
}
