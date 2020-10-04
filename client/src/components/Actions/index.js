
import axios from 'axios'
const SERVER_URL=''


export const SignUp =activation_token=>{
    
    return async dispatch=>{
       
         try{
            const {data}=await axios.post(`${SERVER_URL}/activate`,{activation_token},{withCredentials:true})
    
    if(!data.success){
        throw new Error(data.error)
    }
             dispatch({
                 type:'isAuthentication',
                 isAuth:data.success,
                 error:''
             })
         }catch(err){
       
            dispatch({
                type:'isAuthError',
                isAuth:false,
                error:err.message
            })
         }
         
     }
}


export const SignIn =formdata=>{
    return async dispatch=>{
         try{
            const {data}=await axios.post(`${SERVER_URL}/signIn`,formdata,{withCredentials:true})
   
    if(!data.success){
        throw new Error(data.error)
    }
             dispatch({
                 type:'isAuthentication',
                 isAuth:true,
                 error:''
             })
         }catch(err){
            dispatch({
                type:'isAuthError',
                isAuth:false,
                error:err.message
            })
         }
         
     }

}



export const SignOut=formdata=>{
    
    return async dispatch=>{
         try{
            const {data}=await axios.get(`${SERVER_URL}/signOut`,{withCredentials:true})
   
    if(!data.success){
        throw new Error(data.error)
    }
             dispatch({
                 type:'isAuthentication',
                 isAuth:false,
                 error:''
             })
         }catch(err){
            dispatch({
                type:'isAuthError',
                isAuth:true,
                error:'something went wrong,try again'
            })
         }
         
     }
}

export const checkAuth=()=>{
    
    return async dispatch=>{
         try{
            const {data}=await axios.get(`${SERVER_URL}/checkAuth`,{withCredentials:true})
   
    if(data.error){
        throw new Error(data.error)
    }
             dispatch({
                 type:'isAuthentication',
                 isAuth:true,
                 error:''
             })
         }catch(err){
            dispatch({
                type:'isAuthError',
                isAuth:false,
                error:''
            })
         }
         
     }
}



export const googleSignIn=idToken=>{
    return async dispatch=>{
         try{
            const {data}=await axios.post(`${SERVER_URL}/googlesignIn`,{idToken},{withCredentials:true})
   
    if(!data.success){
        throw new Error(data.error)
    }
             dispatch({
                 type:'isAuthentication',
                 isAuth:true,
                 error:''
             })
         }catch(err){
            dispatch({
                type:'isAuthError',
                isAuth:false,
                error:err.message
            })
         }
         
     }

}