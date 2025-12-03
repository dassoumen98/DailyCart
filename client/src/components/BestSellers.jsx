import React, { use } from 'react'
import ProductCard from './ProductCard';
import { useAppContext } from '../context/appContext'


export default function BestSellers() {
  const {products} =useAppContext()
  return (
    <div className='mt-10 mb-2.5'>
        <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-6 gap-3 md:gap-6">
            {/* Product cards will go here */}
            {products.filter((product)=>product.inStock).slice(0,5).map((product)=>(

              <ProductCard key={product.id} product={product}/>
            ))}

</div>

      
    </div>
  )
}
