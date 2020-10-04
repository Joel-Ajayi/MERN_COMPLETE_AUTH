import React,{Component, useEffect,useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {ToastContainer,toast} from 'react-toastify'
import {connect} from 'react-redux'

class Main extends Component{
   constructor(props){
       super(props)
      
   }

 
componentDidMount(){
    if(this.props.error){
        return toast.error(this.props.error)
    }
}


    render(){
        return(
            <div>
            <ToastContainer />
             <div>
            <h1>hey</h1>
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

export default connect(mapStateToProps)(Main)