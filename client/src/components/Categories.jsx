import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/appContext'

export default function Categories() {
const {navigate} = useAppContext()
  return (
    <div className='mt-16 mb-2.5'>
        <p className="text-2xl md:text-3xl  font-medium">Categories</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
           {categories.map((item,index)=>(
             <div key={index}  style={{ backgroundColor: item.bgColor }} 
             onClick={()=>{
              navigate(`/products/${item.path.toLocaleLowerCase()}`)
              scrollTo(0,0)
             }}
              className='group  cursor-pointer flex flex-col items-center gap-2 border py-5 px-3 rounded-lg'>
            <img src={item.image} alt="sd" className=' group-hover:scale-110 transition-transform duration-300 max-w-28' />
            <p className='text-sm font-medium'>{item.text}</p>

            </div>

           ))}
           


            
        </div>
      
    </div>
  )
}
