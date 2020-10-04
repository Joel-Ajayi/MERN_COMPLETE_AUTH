const nodemailer=require('nodemailer')
const {google}=require('googleapis')


// activate account Link
const activationEmail=async (username,email,password,token)=>{
      
    try{
        const OAuth2=await google.auth.OAuth2
        const  oauth2Client=new OAuth2(
            process.env.EMAIL_CLIENT_ID,
            process.env.EMAIL_CLIENT_SECRET,
            'https://developers.google.com/oauthplayground'
        )

       await oauth2Client.setCredentials({
            refresh_token:process.env.EMAIL_CLIENT_REFRESH_TOKEN
        })
      
        const accessToken=await oauth2Client.getAccessToken()
        
    
    const transporter=await nodemailer.createTransport({
       service:'gmail',
        auth:{
            type:'OAuth2',
            user:process.env.EMAIL,
            clientId:process.env.EMAIL_CLIENT_ID,
            clientSecret:process.env.EMAIL_CLIENT_SECRET,
            refreshToken:process.env.EMAIL_CLIENT_REFRESH_TOKEN,
            accessToken:accessToken

        },
        tls:{
            rejectUnauthorized:false
        }
    })

    const mailOptions={
        from:process.env.EMAIL,
        to:email,
        subject:'Account activation',
        html:`<h1>Click the link to activate account</h1>
              <p>${process.env.CLIENT_URL}/users/activate/${token}<p>
              <p>This link container sensitive information and should not be shared</P>
              <p>${process.env.CLIENT_URL}<p>`
    }

    const response=await transporter.sendMail(mailOptions,(error,res)=>{
        if(error){
            throw new Error(error)
        }
        transporter.close()
        return {success:'Signed Up sucessfully'}
    })
    
   
    }catch(err){
        return {error:err.message}
    }
}


// Welcome Email
const welcomeEmail=async (username,email)=>{
      
    try{
        const OAuth2=await google.auth.OAuth2
        const  oauth2Client=new OAuth2(
            process.env.EMAIL_CLIENT_ID,
            process.env.EMAIL_CLIENT_SECRET,
            'https://developers.google.com/oauthplayground'
        )

       await oauth2Client.setCredentials({
            refresh_token:process.env.EMAIL_CLIENT_REFRESH_TOKEN
        })
      
        const accessToken=await oauth2Client.getAccessToken()
        
    
    const transporter=await nodemailer.createTransport({
       service:'gmail',
        auth:{
            type:'OAuth2',
            user:process.env.EMAIL,
            clientId:process.env.EMAIL_CLIENT_ID,
            clientSecret:process.env.EMAIL_CLIENT_SECRET,
            refreshToken:process.env.EMAIL_CLIENT_REFRESH_TOKEN,
            accessToken:accessToken

        },
        tls:{
            rejectUnauthorized:false
        }
    })

    const mailOptions={
        from:process.env.EMAIL,
        to:email,
        subject:'Account activation',
        html:`<h1>Hi ${username}, and welcome to Drex.code</h1>
              <p>A programming platform that teaches young programmers the best and easiest way to programme<p>
              <p>We hope you enjoy Stay</P>
              <p>To contact our support team click the link if you have any issues -> ${process.env.CLIENT_URL}/team/support<p>`
    }

    const response=await transporter.sendMail(mailOptions,(error,res)=>{
        if(error){
            throw new Error(error)
        }
        transporter.close()
        return {success:'Signed Up sucessfully'}
    })
    
     }catch(err){
        return {error:err.message}
    }
}


//forgot Password link
const forgotResetEmail=async (id,email,token)=>{
      
    try{
        const OAuth2=await google.auth.OAuth2
        const  oauth2Client=new OAuth2(
            process.env.EMAIL_CLIENT_ID,
            process.env.EMAIL_CLIENT_SECRET,
            'https://developers.google.com/oauthplayground'
        )

       await oauth2Client.setCredentials({
            refresh_token:process.env.EMAIL_CLIENT_REFRESH_TOKEN
        })
      
        const accessToken=await oauth2Client.getAccessToken()
        
    
    const transporter=await nodemailer.createTransport({
       service:'gmail',
        auth:{
            type:'OAuth2',
            user:process.env.EMAIL,
            clientId:process.env.EMAIL_CLIENT_ID,
            clientSecret:process.env.EMAIL_CLIENT_SECRET,
            refreshToken:process.env.EMAIL_CLIENT_REFRESH_TOKEN,
            accessToken:accessToken

        },
        tls:{
            rejectUnauthorized:false
        }
    })

    const mailOptions={
        from:process.env.EMAIL,
        to:email,
        subject:'Password reset',
        html:`<h1>Click the link to reset password</h1>
              <p>${process.env.CLIENT_URL}/account/forgot_pass_reset/${token}<p>
              <p>This link contains sensitive information and should not be shared</P>
              <p>${process.env.CLIENT_URL}<p>`
    }

    const response=await transporter.sendMail(mailOptions,(error,res)=>{
        if(error){
            throw new Error('A error occured, try again')
        }
        transporter.close()
        return {success:`Email sent: ${res}`};
    })
    
    }catch(err){
        return {error:err.message}
    }
}

module.exports={activationEmail,welcomeEmail,forgotResetEmail}