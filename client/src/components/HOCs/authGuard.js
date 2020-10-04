import React,{Component, useEffect} from 'react'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import {connect} from 'react-redux'
import * as action from '../Actions'

// This function guard each protected route and checks if the user is authenticated before rendering component
export default (Orignalcomponent)=>{

 class Authguard extends Component{

   //  check if auth before accessing page
 componentDidMount(){
    if(!this.props.isAuth){
        this.props.history.push("/users/signIn")
    }
    
 }

//  check if auth before accessing page
 componentDidUpdate(){   
    if(!this.props.isAuth){
       this.props.history.push("/users/signIn")
    }
 }
    
   render() {
    return (<div>
        <Orignalcomponent {...this.props}/>
    </div>
    )  
   }

}

   function mapStateToProps(state) {
       console.log(state)
       return {
        isAuth:state.Auth.isAuth,
       }
   }

   return connect(mapStateToProps)( Authguard)
}

