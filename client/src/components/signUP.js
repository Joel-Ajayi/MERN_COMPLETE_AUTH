import React, { Component } from 'react'
import './Styles/SignUp.css'
import {Link} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "bootstrap/dist/css/bootstrap.min.css"
import {connect} from 'react-redux'
import * as action from './Actions'
import GooglelogIn from 'react-google-login'

class SignUp extends Component{
    constructor(props){
        super(props)
        this.onSubmit=this.onSubmit.bind(this)
        this.resGoogle=this.resGoogle.bind(this)
      }

 async onSubmit(event){
   event.preventDefault()
   const {target}=event
    const username=target.username.value
    const email=target.email.value
    const password=target.password.value
    const password2=target.password2.value
    if(!username||!email||!password||!password2){
        return toast.error('Please fill out all fields')
    }
    
    if(password.length<8){
        return toast.error('password length must be grater than 8')
    }
    
    if(password!==password2){
        return toast.error('passwords dont match')
    }
    const data={
        username,
        email,
        password
    }
     // Dispatch form data to server
    await this.props.SignUp(data)
    
    // check error
    if(this.props.error){
        return toast.error(this.props.error)
    }
    
     // If auth,redirect to /users/main
    if(this.props.isAuth){
      this.props.history.push("/users/main")
    }

  }

// If auth redirect to main page
  componentDidMount(){ 
    // check fro error
    if(this.props.error){
      return toast.error(this.props.error)
  }
    
   // If auth,redirect to /users/main
    if(this.props.isAuth){
      this.props.history.push("/users/main")
    }
  }

//  If auth redirect to main page
  componentDidUpdate(){
     // If auth,redirect to /users/main
    if(this.props.isAuth){
      this.props.history.push("/users/main")
    }
  }
 

  async resGoogle({tokenId}){
  await this.props.googleSignIn(tokenId)
  }
    
  render(){
    return (
        <div>
        <ToastContainer />
            <div className="row ">

                <div className="col-sm-6 signUp">
                <h2 className="sU-header mt-4">SignUp</h2>
                      <form onSubmit={this.onSubmit}>
                          <div className="form-group">
                              {/* username */}
                              <label>Username</label>
                              <input name="username"
                              placeholder="username"
                               type="text" 
                               
                               className="form-control"
                               required
                               /><br />

                               {/* email */}
                               <label>Email:</label>
                              <input name="email"                             
                               placeholder="email"
                                type="email"
                                
                                 className="form-control"
                                 required
                                 /><br />
                                 

                                 {/* password */}
                                 <label>Password</label>
                              <input name="password"                               
                               placeholder="password lenght must be greater tahn 8"
                                type="password"
                                
                                 className="form-control"
                                 required
                                 /><br />

                                 {/* confirm password */}
                                 <label>Confirm password</label>
                               <input name="password2"                              
                               placeholder="confirm password"
                                type="password"
                                
                                 className="form-control"
                                 required
                                 />  <br />
                                 
                                
                                 {/* Submit button */}
                              <button type="submit" className="btn btn-block btn-success mb-2">SignUp</button>
                              <p className=" mb-4">Already SignedUp, 
                                <Link
                               className="text-align-center"
                               to="/users/SignIn" 
                               >LogIn
                               </Link></p>

                          </div>
                      </form> 
                    </div>

                    {/* socials */}
                    <div className="col-sm-6 ml-auto mr-auto w-100 mt-4">
                    <div className="alert alert-info mt-4 text-center mb-4">
                  <span>Social SignUp</span>
                </div>
                
               <GooglelogIn
              //  clientId should be same as in server
               clientId={'yourClientIdhere'}
               onSuccess={this.resGoogle}
               onFailure={this.resGoogle}
               cookiePolicy={'single_host_origin'}
               className="w-100 text-center"
               > 
               </GooglelogIn>


                    </div>

            </div>
        </div>
    )
}
}

function mapStateToProps(state){
      return {
        isAuth:state.Auth.isAuth,
        error:state.Auth.error
      }
  }
  
  export default connect(mapStateToProps,action)(SignUp)