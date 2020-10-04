import React,{Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import './Styles/SignUp.css'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {connect} from 'react-redux'
import * as action from './Actions/index'
import GooglelogIn from 'react-google-login'

class SignIn extends Component{
  constructor(props){
    super(props)
    this.onSubmit=this.onSubmit.bind(this)
    this.resGoogle=this.resGoogle.bind(this)
  }

 async onSubmit(event){
  event.preventDefault()
     const {target}=event
     const username=target.username.value
     const password=target.password.value
     const Remember=target.checkbox.checked
     if(!username||!password){
         return toast.error('Please fill out all fields')
     }
    const data={
      username,password,Remember
    }
    
    // Dispatch form data to server
    await this.props.SignIn(data)
    
    // check if error 
    if(this.props.error){
        return toast.error(this.props.error)
    }
    
    // If auth,redirect to /users/main
    if(this.props.isAuth){
      this.props.history.push("/users/main")
    }
     
  }

  // Dispatch tokenId to server to be verified for security reasons
  async resGoogle({tokenId}){
    await this.props.googleSignIn(tokenId)
  }

  componentDidMount(){ 
    // check if error 
    if(this.props.error){
      return toast.error(this.props.error)
  }
    
  // If auth,redirect to /users/main
    if(this.props.isAuth){
      this.props.history.push("/users/main")
    }
 }

 componentDidUpdate(){ 
  // If auth,redirect to /users/main
  if(this.props.isAuth){
    this.props.history.push("/users/main")
  }

}
    

  render(){
    return ( <div>
      <ToastContainer />
      <div className="row">

          <div className="col-sm-6 w-100">
                <div className="alert alert-info mt-4 text-center mb-4">
                  <span>Social Logins</span>
                </div>
                
               <GooglelogIn
               clientId={'yourClientIdHere'}
               onSuccess={this.resGoogle}
               onFailure={this.resGoogle}
               cookiePolicy={'single_host_origin'}
               className="w-100 text-center"
               > 
               </GooglelogIn>


              </div>

              <div className="col-sm-6 ml-auto mr-auto w-100">
              <h2 className="text-center mt-4">SignIn</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        {/* username */}
                        <label>Username</label>
                        <input 
                        name="username" 
                        placeholder="username"
                         type="text" 
                         className="form-control"
                         onChange={onchange}
                         required
                         /><br />

                           {/* password */}
                           <label>Password</label>
                        <input 
                        name="password"                    
                         placeholder="password"
                          type="password"
                           className="form-control"
                           onChange={onchange}
                           required
                           /><br />

                         <input name="checkbox" 
                          type="checkbox"
                           value="Remember me"
                           /> <label>Remember me</label> <br />
                          
                           {/* Submit button */}
                        <button className="btn btn-block btn-success ">SignIn</button>
                        <Link to="/account/forgot_pass"  ><p className="mb-4 mt-2 pb-4">Forgot password ?</p></Link>
                    </div>
                </form> 
              </div>

      </div>
  </div>)
  }
  
}

function mapStateToProps(state){
    return {
      isAuth:state.Auth.isAuth,
      error:state.Auth.error
    }
}

export default connect(mapStateToProps,action)(SignIn)