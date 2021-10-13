import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../login/Login'
import MyCart from '../MyCart/MyCart'
import PlaceOrder from '../PlaceOrder/PlaceOrder'
import UserHomePage from '../UserHomePage/UserHomePage'
import Wishlist from '../Wishlist/Wishlist'

function RouterDom() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} ></Route>
                <Route path='/user-home-page' component={UserHomePage} ></Route>
                <Route path='/user-cart' component={MyCart} ></Route>
                <Route path='/user-order-placed' component={PlaceOrder} />
                <Route path='/user-wishlist' component={Wishlist} />
            </Switch>
        </BrowserRouter>
    )
}

export default RouterDom
