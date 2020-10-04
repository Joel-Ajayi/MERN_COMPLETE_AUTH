import React,{ Component } from "react";
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import {connect} from 'react-redux'
import * as action from './Actions'


class Navbar extends Component{
   constructor(props){
    super(props)
    this.onLogout=this.onLogout.bind(this)
}

   onLogout=(ev)=>{
    this.props.SignOut() 
}


    render(){
        return(
             // {this.props.isAuth}
             <nav className="navbar navbar-expand-md bg-dark navbar-dark">
 {/* brand */}
       <Link to="/" className="navbar-brand">DREX-CODE</Link>

       {/* Toggler button */}
       <button className="navbar-toggler"
        type="button" 
        data-toggle="collapse"
         data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
        </button>
 
  {this.props.isAuth ? <div className="collapse navbar-collapse" id="collapsibleNavbar">
    <ul className="navbar-nav">
      <li className="nav-item">
      <span onClick={this.onLogout} className="text-primary">Logout</span> 
      </li>   
    </ul>
  </div> 
   :<div className="collapse navbar-collapse" id="collapsibleNavbar">
    <ul className="navbar-nav">
      <li className="nav-item">
      <Link to="/users/signUp" className="nav-link">SignUp</Link>   
      </li>
      <li className="nav-item">
      <Link to="/users/signIn" className="nav-link">SignIn</Link>   
      </li>
      <li className="nav-item">
      <Link to="/users/main" className="nav-link">Dashboard</Link>   
      </li>    
    </ul>
  </div> }
</nav>
        )
    }
  
}

function mapStateToProps(state){
      return {
        isAuth:state.Auth.isAuth,
        error:state.Auth.error
      }
  }
  
  export default connect(mapStateToProps,action)(Navbar)