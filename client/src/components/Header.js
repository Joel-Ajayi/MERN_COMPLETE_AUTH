import React,{Component} from 'react'
import {connect} from 'react-redux'

import Navbar from './Nav' 
import * as action from './Actions'

class Header extends Component{
 

// Dispatch chackAuth func to store
    componentDidMount(){
         this.props.checkAuth()
    }

     render(){
        return(<div>
            <Navbar />
            {this.props.children}
        </div>
          
        )
    }
}

export default connect(null,action)(Header)