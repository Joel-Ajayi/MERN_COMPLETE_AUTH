const {validationResult}=require('express-validator')
const mongoose=require('mongoose')
const JWT=require('jsonwebtoken')
require('../db/mongoose')
const User=require('../db/model/users')
 const cookieParser=require('cookie-parser')

// auth middle ware 
const isAuth=async(req,res,next)=>{   
    const token= req.cookies.token
    
    try{
       
    if(!token||token==undefined){
        throw new Error('Access denied,no access token found')
    }
    
    // check if cookie is valid
    const {_id,username}=await JWT.verify(token,process.env.JWT_SECRET)
    
    // if cookie is valid, find the user 
    const user=await User.findOne({_id,username})
    if(!user){
        throw new Error('Unauthorized')
    }

    next()
}catch(err){
    res.clearCookie('token')
    res.json({error:err.message})
}
}

module.exports={isAuth}