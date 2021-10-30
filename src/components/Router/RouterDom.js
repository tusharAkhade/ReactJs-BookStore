import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import store from '../../redux-service/store'
import Login from '../login/Login'
import MyCart from '../MyCart/MyCart'
import PlaceOrder from '../PlaceOrder/PlaceOrder'
import UserHomePage from '../UserHomePage/UserHomePage'
import Wishlist from '../Wishlist/Wishlist'
import AuthRoute from './AuthRoute'
import ProtectedRoute from './ProtectedRoute'

function RouterDom() {
    return (
        <Provider store = {store} >
            <BrowserRouter>
                <Switch>
                    <AuthRoute exact path='/' component={Login} />
                    <ProtectedRoute path='/user-home-page' component={UserHomePage} />
                    <ProtectedRoute path='/user-cart' component={MyCart} />
                    <ProtectedRoute path='/user-order-placed' component={PlaceOrder} />
                    <ProtectedRoute path='/user-wishlist' component={Wishlist} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default RouterDom
