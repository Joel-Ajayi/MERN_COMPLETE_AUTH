const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const validator=require('validator')
const jwt=require('jsonwebtoken')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String
    },
    resetPassword:{
        type:String,
        default:''
    }
},{
    timeStamp:true
})


userSchema.methods.generateToken=async function(time){
    if(time){
        const token =await jwt.sign(
            {_id:this._id.toString(),username:this.username},
            process.env.JWT_SECRET,
            {expiresIn:time}
            ) 
            return token
    }else{
        const token =await jwt.sign(
            {_id:this._id.toString(),username:this.username},
            process.env.JWT_SECRET,
            {expiresIn:'15m'}
            ) 
            return token
           
    }
   
}


userSchema.statics.findByCredentials=async(username,password)=>{
    const user=await Users.findOne({username})
    if(!user){
        throw new Error('Unable to log In')
    }

    const isValid=await bcrypt.compare(password,user.password)
    if(isValid==false){
       throw new Error('Unable to log In')
    }
    return user
}

userSchema.statics.checkIfAlreadyRegistered=async(username,email)=>{
    const username_ckeck=await Users.findOne({username})
    if(username_ckeck){
         throw new Error('User with that username already exist')
    }
    
    const email_check=await Users.findOne({email})
    if(email_check){
         throw new Error('User with that email already exist')
    }

    return {success:'User not signed in yet'}

    
}


userSchema.statics.checkUserByEmail=async(email)=>{

    const email_check=await Users.findOne({email})
    if(!email_check){
         throw new Error('User with that email not found')
    }

    return email_check

    
}


userSchema.pre('save',async function (next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,8)
    }
    next()
})

const Users=mongoose.model('Users',userSchema)
module.exports=Users