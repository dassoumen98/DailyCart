import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import dotenv from 'dotenv'
dotenv.config()

export const registerController = async (req,res)=>{

    try {
        const {name ,email, password} =req.body
    // validation
    if(!name ||!email ||!password){
        return res.status(400).send({
                success: false,
                message: 'Please provide name email and password'
            });
    }

    // check if user is already exsit
    let existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).send({
            success:false,
            message:'Email already registered, please login'
        })
    }
    // hash password
    const salt =bcrypt.genSaltSync(10)
    const hashpassword =await bcrypt.hash(password,salt)

    // create new User
    let newUser = await User.create({name,email,password:hashpassword})
    res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user: newUser
        });

        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message

        })
        
    }
    

}

export const loginController = async (req,res)=>{

    try {
        let{email,password}=req.body
    // validation
    if(!email||!password){
        return res.status(400).send({
            success:false,
            message: 'Please provide email and password'
        })
    }

    // check if user exists
    let user = await User.findOne({email})
    if(!user){
        return res.status(404).send({
            success:false,
            message:'User not found'
        }) 
    }

    // check password
    let isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(401).send({
            success: false,
            message: 'Invalid password'

        })
    }
    // If password matches, send success response with user data
        user.password = undefined;  // Remove password from user object before sending it
        let token =jwt.sign({id:user._id,name:user.name} ,process.env.JWT_SECRET ,{expiresIn:'1d'})
        res.status(200).send({
            success:true,
            message:'User logged in successfully',
            token:token,
            user: user
        
        })
        
    } catch (error) {
         res.status(500).send({
            success: false,
            message: error.message
        });

        
    }
}