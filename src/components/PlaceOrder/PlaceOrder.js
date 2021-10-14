import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import './PlaceOrder.css'

function PlaceOrder() {
    return (
        <div>
            <Navbar />
            <div className="placeOrderOuterContainer">
                <div className="placeOrderContainer">
                    <div className="orderImgAndHeading">
                        <div className="order1Img"></div>
                        <p className="placeOrderHeading">Order Placed Successfully</p>
                        <div className="order2Img"></div>
                    </div>
                    <div className="placeOrderContentConatainer">
                        <div className="placeOrderContent">hurray!!! your order is confirmed <br /> the order id is #123456 save the order id for further communication..</div>
                    </div>
                    <div className="placeOrderDetailsContainer">
                        <div className="placeOrderDetailsHead">
                            <div className="placeOrderDetailsHeadText">Email us</div>
                            <div className="placeOrderDetailsHeadText">Contact us</div>
                            <div className="placeOrderDetailsHeadText">Address</div>
                        </div>
                        <div className="placeOrderDetailsInfo">
                            <div className="placeOrderDetailsInfoText">admin@bookstore.com</div>
                            <div className="placeOrderDetailsInfoText">+91 8163475881</div>
                            <div className="placeOrderDetailsInfoText">42, 14th Main, 15th Cross, Sector 4 ,opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PlaceOrder
