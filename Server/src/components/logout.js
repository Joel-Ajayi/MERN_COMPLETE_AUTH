const logOut=(req,res)=>{
     res.clearCookie('token')
     res.send({success:true})
}

module.exports={logOut}