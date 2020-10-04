const mongoose=require('mongoose')

mongoose.connect(process.env.MONGOOSE_URL,{useCreateIndex:true,useNewUrlParser:true,
    useUnifiedTopology:true}).then(()=>{
        console.log('connected to database')
    })
    .catch((err)=>{
        console.log({error:err.message})
    })