const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const FoodPartnerModel = require("../models/foodpartner.model");

const registerUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {f
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      fullName,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser: {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in registering user",
      error: error.message,
    });
  }
};

const loginUser = async (req,res)=>{

  const {email, password} = req.body ;
  try{
    const existingUser = await User.findOne({email});

    if(!existingUser){
      return res.status(400).json({
        success: false,
        message:"User does not exist",
     
      })
    }

    const isPasswordValid = await bcrypt.compare(password , existingUser.password) ;
    if(!isPasswordValid){
      return res.status(400).json({
        success: false,
        message:"Invalid credentials"
      })
    }

  const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET
    );  
    res.cookie("token" , token) ;
    return res.status(200).json({ 
      success:true,
      message:"User logged in successfully",
      existingUser:{
        id: existingUser._id,
        email: existingUser.email,
        fullName: existingUser.fullName,  
      },
      token, 
    }) ;


  }catch(error){
    return res.status(500).json({
      success: false, 
      message: "Error in logging in user",
      error: error.message,
    });
  }
};

const getUsers = async (req,res) => {
  try{
    const users = await User.find({}) ;
    return res.status(200).json({
      success:true,
      message:"Users fetched successfully",
      users,
    }) ;  
  }catch(error){
    return res.status(500).json({
      success:false,
      message:"Error in fetching users",
      error: error.message,
    }) ;
  }
} ;




const logoutUser = (req,res) => {
  try{
  res.clearCookie("token") ;
  return res.status(200).json({
    success:true, 
    message:"User logged out successfully",
    User   : User 

  })
}
catch(error){
  return res.status(500).json({
    success:false,
    message:"Error in logging out user",
    error: error.message, 

  }) ;
}
} ;



// Food Partner Cpontroller

const registerFoodPartner = async (req,res) =>{
  try{
    const {fullName , email , password} = req.body ;

    const existingFoodPartner = await FoodPartnerModel.findOne({email}) ;

    if(existingFoodPartner){
      return res.status(400).json({
        success:false,
        message:"Food Partner already exists",
      }) ;  

    }
    const hashedPassword = await bcrypt.hash(password , 10) ;

    const FoodPartner = await FoodPartnerModel.create({
      fullName ,
      email,
      password:hashedPassword
    });
    const token = jwt.sign({
      id : FoodPartner._id,
    },
    process.env.JWT_SECRET  );
    
    res.cookie("token",token);
    return res.status(201).json({
      success:true,
      message:"Food Partner registered successfully",
      FoodPartner:{
        id: FoodPartner._id,  
        email: FoodPartner.email,
        fullName: FoodPartner.fullName,
      },
      token,  
    })

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Error in registering Food Partner",
      error: error.message,
    }) ;
  }
}

const LoginFoodPartner = async (req,res) =>{
  try{
    const {email , password } = req.body ;

    const existingFoodPartner = await FoodPartnerModel.findOne({email}) ;

    if(!existingFoodPartner){
      return res.status(400).json({
        success:false,
        message:"Food Partner does not exist",
      }) ;     
    }
    const isMatchPassword = await bcrypt.compare(password , existingFoodPartner.password) ;
    if(!isMatchPassword){
      return res.status(400).json({
        success:false,
        message:"Invalid credentials",
      }) ;     
    }
    const token = jwt.sign({
      id : existingFoodPartner._id,
    },
    process.env.JWT_SECRET  );    

    return res.status(200).json({
      success:true,
      message:"Food Partner logged in successfully",
      existingFoodPartner:{   
        id: existingFoodPartner._id,
        email: existingFoodPartner.email,
        fullName: existingFoodPartner.fullName,
      },
      token,  
    }) ;

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Error in logging in Food Partner",
      error: error.message,
    })
  }
}

const logooutFoodPartner = (req,res) =>{
  try{
    res.clearCookie("token") ;
    return res.status(200).json({
      success:true,
      message:"Food Partner logged out successfully",
    }) ;  
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Error in logging out Food Partner ,, nothing else to say",
      error: error.message,
    }) ;
  }
}

const getFoodPartnes = async (req,res) =>{

  try{
    const foodPartners = await FoodPartnerModel.find({}) ;
    return res.status(200).json({
      success:true,
      message:"Food Partners fetched successfully",
      foodPartners,
    }) ;  
  }
  catch(error){
    return res.status(500).json({ 
      success:false,
      message:"Error in fetching Food Partners",
      error: error.message,
    }) ;

  }
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,    
  logoutUser,

  registerFoodPartner,
  LoginFoodPartner,
  logooutFoodPartner,
  getFoodPartnes,
};
