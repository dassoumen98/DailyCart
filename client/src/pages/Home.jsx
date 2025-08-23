import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSellers from '../components/BestSellers'
import BottamBanner from '../components/BottamBanner'
import NewsLetter from '../components/NewsLetter'

export default function Home() {
  return (
    <div className='mt-10'>
    <MainBanner />
    <Categories/>
    <BestSellers />
    <BottamBanner/>
    <NewsLetter/>
      
    </div>
  )
}
