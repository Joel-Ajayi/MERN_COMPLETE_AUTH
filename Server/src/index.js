require('dotenv').config({
    path:'./config/config.env'
})
const express=require('express')
const Router=require('./Router/routes')
const cors=require('cors')
const morgan=require('morgan')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const app=express()

// .env file
const PORT=process.env.PORT

// Middlewares
app.use(cors({
    credentials:true,
    origin:process.env.CLIENT_URL
}))

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(Router)
// app.use(bodyParser.urlencoded({extended:true}))

app.listen(PORT,()=>{
    console.log(`Port ${PORT} is running`)
})