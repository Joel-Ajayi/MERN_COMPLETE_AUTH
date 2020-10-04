require('dotenv').config({
    path:'./config/config.env'
})
const express=require('express')
const router=express.Router()
const {validationResult}=require('express-validator')
const mongoose=require('mongoose')


const {checkExistence,activate,saveNewUser}=require('../components/activate')
const {logInUsers,logInUsersGoogle}=require('../components/loginUsers')
const {logOut}=require('../components/logout')
const {checkUserExistence,SendPasswordResetEmail,Confirmforgot_PasswordReset}=require('../components/password')
const {isAuth}=require('../components/auth_middleware')
const {checkAuth} = require('../components/checkAuth')
require('../db/mongoose')
const User=require('../db/model/users')


// Activate account for new user
router.post('/activate',checkExistence,activate)
 
// SignUp  new users route
router.post('/signUp',saveNewUser)

// LogIn Route
router.post('/signIn',logInUsers)
// google logIn
router.post('/googlesignIn',logInUsersGoogle)


// Private route middleware
router.get('/checkAuth',isAuth,checkAuth)

// Delete account
router.post('/forgot_password',checkUserExistence,SendPasswordResetEmail)
router.post('/forgot_password_reset',Confirmforgot_PasswordReset)

// LogOut user route
router.get('/signOut',logOut)

module.exports=router