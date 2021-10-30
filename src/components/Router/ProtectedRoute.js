import React from 'react'
import { Route, Redirect } from "react-router-dom"

function ProtectedRoute({ component: Component, ...rest }) {
    return (
        // <Route {...rest}
        //     render={(props) => {
        //         if(localStorage.getItem('bookStoreToken')) {
        //             return <Component {...props} />
        //         } else {
        //             return <Redirect to="/" />
        //         }
        //     }} />
        <Route {...rest}
            render={(props) => {
                return localStorage.getItem('bookStoreToken') ?
                    (<Component {...props} />) :
                    (<Redirect to="/" />)
            }} />
    )
}

export default ProtectedRoute
