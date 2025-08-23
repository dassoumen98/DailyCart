import React from 'react'
import { assets,features } from '../assets/assets'

export default function BottamBanner() {
  return (
    <div  className='relative mt-10'>
     <img src={assets.bottom_banner_image} alt="bottam image" className=' hidden md:block w-full' />
     <img src={assets.bottom_banner_image_sm} alt="bottam image-sm" className=' md:hidden w-full' />
     <div className='absolute  inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24'>
     <div>
       <h1 className='text-primary text-2xl md:text-3xl font-semibold mb-6'>Why We Are the Best?</h1>

     {/* render feature */}
      {features.map((feature, index) => (
        <div key={index} className=' flex items-center gap-4 mt-3'>
          <img src={feature.icon} alt={feature.title} className='w-9 md:w-11' />
          <div>
            <h3 className='text-lg font-semibold md:text-xl'>{feature.title}</h3>
            <p className=' text-gray-500/70 text-xs md:text-sm'>{feature.description}</p>
          </div>

          

        </div>
      ))}
      </div>
     

     </div>
      
    </div>
  )
}
