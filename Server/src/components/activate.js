const JWT=require('jsonwebtoken')
const {validationResult}=require('express-validator')
const mongoose=require('mongoose')
require('../db/mongoose')
const User=require('../db/model/users')
const bycrypt=require('bcrypt')
const {activationEmail,welcomeEmail}=require('./email')
const { findOne } = require('../db/model/users')

// Check user existence
const checkExistence=async (req,res,next)=>{
    try{
        const {username,email,password}=req.body

        const {success}= await User.checkIfAlreadyRegistered(username,email)

        if(success){
            next()
        }  

    }catch(err){
        res.json({
            error:err.message
        })
    }

}

// Send activation link
const activate=async (req,res)=>{
    // check for erros in request\
    try{
   const errors=validationResult(req)
   if(errors){
       console.log(errors)
   }
    const {username,email,password}=req.body
//    activate user token
   const token=JWT.sign({username,email,password},
    process.env.JWT_SECRET,
   {
       expiresIn:'15m'
})
console.log(token)
// Send authentication email
    const {success,error}=await activationEmail(username,email,password,token)
    if(error){
        throw new Error(error)
    }

    res.status(200).send({success:'actiavtion link has been sent to email'})
}catch(err){
    // handle errors
    res.json({error:err.message})
}
}


// Save user after activation
const saveNewUser=async(req,res)=>{
    // token 
    const activationtoken=req.body.activation_token
    if(!activationtoken){
        throw new Error('No activation token found')
    }
    try{
    // verify token 
     const {username,email,password}=await JWT.verify(activationtoken,process.env.JWT_SECRET)
          
        // Check if user already exist 
       const success= await User.checkIfAlreadyRegistered(username,email)
       
    //    if he does not exist save user
       if(success){
        const newUser=new User({username,email,password})
        
        // save user and send welcome email
        await newUser.save() 
        const {success,error}=await welcomeEmail(username,email)
        
       const user=await User.findOne({username})

    //    generate token and set it as cookie
        const token=await user.generateToken('15m')
        res.cookie('token',token,{httpOnly:true}).json({success:true})

       }
      
       }catch(err){
       
       res.json({error:err.message})
        
       }
    

}
module.exports={checkExistence,activate,saveNewUser}