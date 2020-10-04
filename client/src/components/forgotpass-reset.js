import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import {connect} from 'react-redux'

// activation components
class Forgotpass_reset extends Component{
    constructor(props){
        super(props)
        this.onSubmit=this.onSubmit.bind(this)
      }

     onSubmit(ev){
        let token=this.props.match.params.token
        ev.preventDefault()
        let {target}=ev
        let newpassword=target.password.value
        let confirmNewpassword=target.confirmpassword.value
        
        // check if passwords match
        if(newpassword!==confirmNewpassword){
            return toast.error("passwords don't match")
        }
         
        // Please if you can, inculcate this axios request in ./Actions folder
        axios.post('yourServerURL/forgot_password_reset',{newpassword,token}).then(({data})=>{
        if(data.error){
           
                throw new Error(data.error)
            }
            toast.success(data.success)
        }).catch((err)=>{
            toast.error(err.message)
        })
    }


    componentDidMount(){ 
        if(this.props.error){
          return toast.error(this.props.error)
      }
    
        if(this.props.isAuth){
          this.props.history.push("/users/main")
        }
     }
    
    render(){

  
    return (
        <div className="row">
        <ToastContainer />
        <div className="col-sm-6 forgot-reset"></div>
   

        <div className="col-sm-6 mt-4 ">
        <h4 className="mt-4">Confirm new Password</h4>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
               <label htmlFor="password">New password</label>
               <input className="form-control" 
               type="password"
                placeholder="new password"
                 name="password" 
                     required
                 /><br />

               <label htmlFor="password">Confirm password</label>
               <input className="form-control"
                type="password"
                 placeholder="confirm password"
                  name="confirmpassword" 
                      required
                  />
                <button className="mt-4 btn btn-success btn-block">Submit</button>
            </div>
        </form>
        </div>
        </div>
    )
    }
}

function mapStateToProps(state) {
    return {
     isAuth:state.Auth.isAuth,
     error:state.Auth.error
    }
}

export default connect(mapStateToProps)(Forgotpass_reset)