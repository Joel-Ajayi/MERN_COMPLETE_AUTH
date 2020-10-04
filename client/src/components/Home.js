import React from 'react'
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"


export default function Home(){


    return (
        <div>
            
            <Link to='/users/signUp'>signUp</Link>
        </div>
    )
}