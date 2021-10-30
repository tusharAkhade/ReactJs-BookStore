import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function AuthRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} 
            render={props => {
                if(!localStorage.getItem('bookStoreToken')) {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/user-home-page" />
                }
        }}
        />
    )
}

export default AuthRoute