import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'

 const InputField = ({  type, name, placeholder,handleChange, address }) => (
        <input className='w-full px-2 py-2.5  border border-gray-500/30 outline-none  rounded focus:border-primary trannsa' type={type} 
        placeholder={placeholder}
        name={name}
        value={address[name] || ''}
        onChange={handleChange}
        required
        />
        
    )


export default function AddAddress() {
   
   
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
    const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value.trim() }));
}
console.log(address);


    const onsubmitHandler=(e)=>{
        e.preventDefault()
        console.log("form submitted")
    }
  return (
    <div className='mt-10'>
        <p className='text-2xl md:text-3xl text-gray-400'>Add Shiping <span className=' font-semibold text-primary'>Address</span></p>
        
        <div className='flex flex-col-reverse md:flex-row gap-10 mt-10'>
            <div className='flex-1 max-w-md'>
                <form onSubmit={onsubmitHandler} className='space-y-3 mt-6 text-sm'>
                    <div className='grid grid-cols-2 gap-3'>
                        <InputField type="text" name="firstname" placeholder="Firstname" handleChange={handleChange} address={address} />

                        <InputField type="text" name="lastname" placeholder="Lastname" handleChange={handleChange} address={address} />

                    </div>

                        <InputField type="email" name="email" placeholder="Email Address" handleChange={handleChange} address={address} />
                        
                        <InputField type="text" name="street" placeholder="Street" handleChange={handleChange} address={address} />

                    <div className='grid grid-cols-2 gap-3'>
                        <InputField type="text" name="city" placeholder="City" handleChange={handleChange} address={address} />
                        <InputField type="text" name="state" placeholder="state" handleChange={handleChange} address={address} />
                    </div>

                     <div className='grid grid-cols-2 gap-3'>
                        <InputField type="number" name="zipcode" placeholder="Zip code" handleChange={handleChange} address={address} />
                        <InputField type="text" name="country" placeholder="Country" handleChange={handleChange} address={address} />
                    </div>
                        <InputField type="number" name="phone" placeholder="Phone Number" handleChange={handleChange} address={address} />

                    <button type='submit' className='w-full bg-primary text-white py-2.5 rounded hover:opacity-90 trannsa mt-3'>Save Address</button>

                

                </form>

            </div>

            <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="add address" />

        </div>
        
      
    </div>
  )
}
