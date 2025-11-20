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

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: 'Invalid password'
      });
    }

    // create JWT
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // remove password from response
    const userObj = user.toObject();
    delete userObj.password;

    // set cookie with token
    res.cookie("token", token, {
      httpOnly: true,  // JS can't access cookie
      secure: process.env.NODE_ENV === "production", // only https in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    ;
    

    // send response without token in body
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      user: userObj,
    //   token: token
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
};

// chek is authenticated user
export const isAuth = async (req, res) => {
    try {
      //  const userId =req.body.userId
        const userId = req.user.id;  // ✅ cleaner and safer than using req.body
      //  console.log(userId);
       
        const user = await User.findById(userId).select('-password');
        if (!user) {  
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'User is authenticated',
            user
        });
    } catch (error) {
        res.status(500).send({
            success: false, 
            message: error.message
        });
    }
};

export const logout =async(req,res)=>{
   
   try {
     res.clearCookie("token" , {
      httpOnly: true,  // JS can't access cookie
      secure: process.env.NODE_ENV === "production", // only https in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
     
    });
    res.status(200).send({
        success:true,
        message:'User logged out successfully'
    })
    
   } catch (error) {
    res.status(500).send({
        success: false, 
        message: error.message
    }); 
    
   }

   



}


