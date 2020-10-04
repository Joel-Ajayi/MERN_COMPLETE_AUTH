import React, { Component } from 'react'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import {connect} from 'react-redux'


// activation components
class Forgot extends Component{
     constructor(props){
         super(props)
         this.onSubmit=this.onSubmit.bind(this)
     }


   onSubmit(ev){
        ev.preventDefault()
        const {target}=ev
        const email=target.email.value
        if(!email){
            return toast.error('Please input email')
        }
        
         // Please if you can, inculcate this axios request in ./Actions folder
        axios.post('yourServerURL/forgot_password',{email}).then(({data})=>{
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
    return (<div>
        <ToastContainer />
   
        <div className="row h-50">

        <div className="col-sm-6 forgot_password">
            
        </div>


        <div className="col-sm-6 mt-4 mb-4">
        <h4 className="text-center mt-4">Forgot Password ?</h4>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
               <label htmlFor="password">Email:</label>
               <input className="form-control" 
               type="email"
                placeholder="email"
                 name="email"
                 required
                  /><br />
                <button type="submit" className="mt-4 btn btn-success btn-block">Submit</button>
            </div>
        </form>
        </div>
        </div>
        </div>)
         }
}

function mapStateToProps(state) {
    return {
     isAuth:state.Auth.isAuth,
     error:state.Auth.error
    }
}

export default connect(mapStateToProps)(Forgot)