import React, { use } from 'react'
import { useState } from 'react'
import {assets} from '../../assets/assets'
import {categories} from '../../assets/assets'
import toast from 'react-hot-toast';

import { useAppContext } from '../../context/appContext';
 

export default function AddProduct() {
    
    const {axios}=useAppContext();
    // file 
    const [file, setFile] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    
    
    
    

    const onSubmitHandeler = async(e) => {

        try {
             e.preventDefault();
        // Handle form submission logic here 
        const formData = new FormData();
        let  productData={
        name,
        description:description.split('\n'),
        category,
        price,
        offerPrice
    }
        formData.append('productData', JSON.stringify(productData));
        for(let i=0; i<file.length; i++){
            formData.append('images', file[i]);
        }

        // send formData to backend using fetch or axios
         let {data} =await axios.post('/api/product/add', formData)
         if(data?.success){
            toast.success(data.message)
            setName("")
            setDescription("")
            setCategory("")
            setPrice("")
            setOfferPrice("")
            setFile([])
            }else{
                toast.error(data.message)
            }


        // console.log("--- Form Data Contents ---");
        //     for (const [key, value] of formData.entries()) {
        //         if (key === 'images') {
        //             // For files, log their name/type instead of the whole file object
        //             console.log(`${key}: ${value.name} (${value.type})`);
        //         } else if (key === 'productData') {
        //             // Log the parsed JSON for easier viewing
        //             console.log(`${key}:`, JSON.parse(value));
        //         } else {
        //             console.log(`${key}: ${value}`);
        //         }
        //     }
           
       
        
        
        
            
        } catch (error) {
            console.log("Error submitting form:", error);
            
        }
       



    }

  return (
     <div className=" no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between  ">
            <form onSubmit={onSubmitHandeler} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>

                                <input  onChange={(e) => {
                                    const updatedFiles = [...file];
                                    updatedFiles[index] = e.target.files[0];
                                    setFile(updatedFiles);
                                }}
                                accept="image/*" type="file" id={`image${index}`} hidden />

                                <img className="max-w-24 cursor-pointer" src={file[index] ?URL.createObjectURL(file[index]):assets.upload_area} alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input onChange={(e)=> setName(e.target.value)} value={name} id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select onChange={(e)=>setCategory(e.target.value)} value={category} id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>{item.path}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input onChange={(e)=>setPrice(e.target.value)} value={price} id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input onChange={(e)=>setOfferPrice(e.target.value)} value={offerPrice} id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button className="px-8 py-2.5 bg-primary text-white font-medium rounded hover:bg-primary-dull">ADD</button>
            </form>
        </div>
  )
}
