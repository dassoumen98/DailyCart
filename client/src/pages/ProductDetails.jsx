import React from 'react'
import { useState , useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import { Link, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from '../components/ProductCard';


export default function ProductDetails() {
    const { products, addToCart, navigate } = useAppContext()
    const {id}=useParams()
    
    // find product based  id from products
    const product = products.find((p) => p._id === id )
    const [thumbnail, setThumbnail] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

   
    

// set initial thumbnail when product changes main image
useEffect(() => {
    if (product && product.image && product.image.length > 0) {  
        setThumbnail(product.image[0]);
    }
}, [product]);

    
 // related products
//  products is come from context
// product is those individual product that id is matched come from params
    useEffect(() => {

        if (products.length > 0 && product) {
            const related = products.filter((p) => p.category === product.category && p._id !== product._id);
            
            
            setRelatedProducts(related);
        }
    }  , [products]);

   
     

  return  product && (
    <div className="max-w-6xl w-full px-6">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-primary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                           <img key={i} src={i <4  ? assets.star_icon : assets.star_dull_icon} alt="Star" className="w-4 h-4" />
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: ${product.price}</p>
                        <p className="text-2xl font-medium">MRP: ${product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={()=>addToCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={()=>{addToCart(product._id); navigate("/cart")}} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="mt-20 flex flex-col  items-center w-full">
                <h2 className="text-2xl font-medium">Related Products</h2>
                {relatedProducts.length > 0 ? (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
                        {relatedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-lg text-gray-500 mt-4">No related products found.</p>
                )}
                <button onClick={()=>navigate('/products')} className='mx-auto mt-10 border py-2.5 px-10 text-primary  bg-primary/10 hover:bg-primary-dull/20  text-sm rounded '>See more..</button>
                </div>

        </div>
  )
}
