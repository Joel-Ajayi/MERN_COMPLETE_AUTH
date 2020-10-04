import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import {combineReducers} from 'redux'

import Activate from './components/activate'
import Home from './components/Home'
import SignUp from './components/signUP'
import SignIn from './components/signIn'
import FORGOTPASS_RESET from './components/forgotpass-reset'
import Forgot from './components/forgot'
import MainPage from './components/main'
import Header from './components/Header'
import Auth from './components/Reducers/auth'
import Authguard from './components/HOCs/authGuard'
import './components/Styles/Styles.css'


let store=createStore(combineReducers({Auth}),applyMiddleware(reduxThunk))

export default ()=>{
   return(
   <Provider store={store}>
   <Router>
       <Switch>
        <Header>
        <Route  exact path='/' render={props=><Home {...props}/>} />
        <Route  exact path='/users/signUp' render={props=><SignUp {...props}/>} />
        <Route  exact path="/users/activate/:token" render={props=><Activate {...props}/>} />
        <Route  exact path='/users/signIn' render={props=><SignIn {...props}/>} />
        <Route  exact path="/users/main" component={Authguard(MainPage)} />
        <Route  exact path="/account/forgot_pass" render={props=><Forgot {...props}/>} />
        <Route  exact path="/account/forgot_pass_reset/:token" render={props=><FORGOTPASS_RESET {...props}/>} />
       </Header>
       </Switch>
    </Router>
   </Provider>
   )
}
