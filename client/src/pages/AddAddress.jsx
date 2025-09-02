import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'


export default function AddAddress() {
    const InputField = ({  type, name, placeholder,handelChange, address }) => (
        <input className='w-full px-2 py-2.5  border border-gray-500/30 outline-none  rounded focus:border-primary trannsa' type={type} 
        placeholder={placeholder}
        name={name}
        value={address[name]}
        onChange={handelChange}
        />
        
    )
   
    const [address, setAddress] = useState({
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        phone: '',
    })
    const handelChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    }

    const onsubmitHandler=(e)=>{
        e.preventDefault()
        console.log("form submitted")
    }
  return (
    <div className='mt-10'>
        <p className='text-2xl md:text-3xl text-gray-400'>Add Shiping <span className=' font-semibold text-primary'>Address</span></p>
        
        <div className='flex flex-col md:flex-row gap-10 mt-10'>
            <div className='flex-1 max-w-md'>
                <form onSubmit={onsubmitHandler} className='space-y-3 mt-6 text-sm'>
                <InputField type="text" name="firstname" placeholder="Firstname" handelChange={handelChange} address={address}  />

                </form>

            </div>

            <img className='w-52 md:w-full' src={assets.add_address_iamge} alt="add address" />

        </div>
        
      
    </div>
  )
}
