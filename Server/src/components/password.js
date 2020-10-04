const JWT=require('jsonwebtoken')
const {validationResult}=require('express-validator')
const mongoose=require('mongoose')
require('../db/mongoose')
const User=require('../db/model/users')
const bycrypt=require('bcrypt')
const { forgotResetEmail}=require('./email')


// Check user existence
const checkUserExistence=async (req,res,next)=>{
    try{
        const {email}=req.body
        const user= await User.checkUserByEmail(email)
         req.user=user
           next()
    
    }catch(err){
        res.json({
            error:err.message
        })
    }

}

// send reset email
const SendPasswordResetEmail=async (req,res,next)=>{
    try{
        
       
        const {_id,username,email}=req.user
        const token =await req.user.generateToken()
        console.log(token)
        if(!token||!_id||!email){
            throw new Error('An error occured, try again')
        }  

        const updatedUser=await req.user.updateOne({resetPassword:token})       
        const {success,error}=await forgotResetEmail(_id,email,token)
        if(error){
                throw new Error(error)
         } 
      
        res.json({success:'password resest email has been sent'})
    
    }catch(err){
        res.json({
            error:err.message
        })
    }

}


// confirm resest pass
const Confirmforgot_PasswordReset=async (req,res,next)=>{
    try{
        
        const {newpassword,token} =req.body 
           const {_id,username}=await JWT.verify(token,process.env.JWT_SECRET)
        const user=await User.findOne({resetPassword:token})  

        if(!user.resetPassword==token){
             throw new Error('Invalid link,or expired token')
        }  
            user.password=newpassword
            await user.save()
            res.json({success:'password has beeen reset'})
    }catch(err){
        res.json({
            error:err.message
        })
    }

}

module.exports={checkUserExistence,SendPasswordResetEmail,Confirmforgot_PasswordReset}


