import Product from '../models/product.model.js';
import { v2 as cloudinary } from 'cloudinary';
// add product
 export const addProductController = async (req, res) => {
    try {
        
        // Product data (coming as JSON string)
        let productData = JSON.parse(req.body.productData);

        const images = req.files;
        let imageUrls = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, 
                    {resource_type: 'image'});
                    
                
                return result.secure_url;
            })
        )
       

        let  data= await Product.create({
            ...productData,
            image:imageUrls
        })
       
        

        res.status(201).send({
            success: true,
            message: "Product added successfully",
            data
        });


        
    } catch (error) {
        res.status(500).send({
            success: false,           
            message: error.message
        })
    }
}

// get all products
export const productListController=async(req,res)=>{
    try {
        const products=await Product.find({});
       
        
        res.status(200).send({
            success:true,
            products
        })  
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        })
        
    }
}
// get single Product
export const productById = async(req,res)=>{
    try {
         let id = req.body
         let product =await Product.findById(id)

         res.status(200).send({
            success:true,
            product
         })
        
    } catch (error) { 
        res.status(500).send({
            success:false,
            message:error.message
        })
        
        
    }
}

export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;

        // ✅ Update product stock
        const product = await Product.findByIdAndUpdate(
            id,
            { inStock: inStock },
            { new: true }   // returns updated product
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.json({
            success: true,
            message: "Product stock updated",
            product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
