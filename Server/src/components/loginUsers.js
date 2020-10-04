const {validationResult}=require('express-validator')
const mongoose=require('mongoose')
require('../db/mongoose')
const Users=require('../db/model/users')
const {OAuth2Client}=require('google-auth-library')


// Login Users Locally
const logInUsers=async (req,res)=>{
    const {username,password,Remember}=req.body
    try{
    // Check if user exist
    const user=await Users.findByCredentials(username,password)
    
    if(user){
        let token=''
        if(Remember===false){
            token=await user.generateToken('3600m')
            res.cookie('token',token,{httpOnly:true}).status(200).json({success:true})         
        }
        
         token=await user.generateToken('14d')
            res.cookie('token',token,{httpOnly:true}).status(200).json({success:true})         
        }
    }catch(err){
        res.clearCookie('token')
         res.json({error:err.message})
    }
}


// logIn users using google
const client =new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const logInUsersGoogle=async (req,res)=>{
   const {idToken}=req.body

//    verify token
    try{
    const response=await client.verifyIdToken({idToken,audience:process.env.GOOGLE_CLIENT_ID})
    const {email_verified,name,email}=response.payload     
   const user=await Users.findOne({email}) 

    if(user){
        let token=''
         token=await user.generateToken('14d')
            res.cookie('token',token,{httpOnly:true}).status(200).json({success:true})         
    }else{
        const newUser=new User({username:name,email})
    }
    }catch(err){
        res.clearCookie('token')
         res.json({error:'Something went wrong, try again'})
    }
}


module.exports={logInUsers,logInUsersGoogle}