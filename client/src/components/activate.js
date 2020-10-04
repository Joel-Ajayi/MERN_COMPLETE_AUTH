import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {connect} from 'react-redux'
import * as action from './Actions'

 class Activateaccount extends Component{
   constructor(props){
       super(props);
       this.onActvate=this.onActvate.bind(this)
       
   }

   async onActvate(){
    const activation_token=this.props.match.params.token
    await this.props.SignUp(activation_token)

    if(this.props.error){
        return toast.error(this.props.error)
    }

    if(this.props.isAuth){
        window.location="/users/main"
    }

 }

 componentDidMount(){
    
    if(this.props.isAuth){
        window.location="/users/main"
    }
 }

 componentDidUpdate(){
    
    if(this.props.isAuth){
       window.location="/users/main"
    }
 }
    
   render() {
    return (<div>
        <ToastContainer/>
        <div className="row p-4">

<div className="col-sm-6 activate">
</div>

<div className="col-sm-6 actvate_box ml-auto mt-4 mr-auto w-100">
{/* activation button */}
<h4 className="text-center mt-4">Activate account</h4>
<button onClick={this.onActvate} className="btn btn-primary mb-4 mt-4 btn-block activation-btn mb-2">
    Activate account
     </button>
     
     <span><hr /></span>
    {/* Or sign Up */}
    
    <Link to="/users/signUp"><h4 className="text-center pt-4 mt-4">SignUp</h4></Link>
    
</div>

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

export default connect(mapStateToProps,action)(Activateaccount)