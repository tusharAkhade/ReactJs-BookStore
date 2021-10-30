import React, { useState, useEffect } from 'react'
import './MyCart.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CustomerAddress from '../Customer_Details/CustomerAddress';
import Order from '../Order/Order';
import Navbar from '../Navbar/Navbar';
import { getAddedToCartBooks, removeItemFromCart, updateAddToCart } from '../../service/DataService';
import Footer from '../Footer/Footer';

function MyCart() {
    const [openAddressDetails, setOpenAddressDetails] = useState(true)
    const [openOrderDetails, setOpenOrderDetails] = useState(true)
    const [cart, setCart] = useState([])

    const handlePlaceOrderClick = (e) => {
        setOpenAddressDetails(false)
        e.target.hidden = true
    }

    const handleRemoveClick = (bookId) => {
        removeItemFromCart(bookId)
            .then(res => {
                cartItems()
            })
            .catch(err => console.log(err))
    }

    const listenToAddressDetails = () => {
        setOpenOrderDetails(false)
    }

    const decrementQuantityToCart = (book) => {
        let quantity = book.quantityToBuy - 1
        if (quantity > 0) {
            updateCartItemQuantity(book, quantity)
        } else if (quantity == 0) {
            handleRemoveClick(book._id)
        }
    }

    const incrementQuantityToCart = (book) => {
        let quantity = book.quantityToBuy + 1
        if (quantity <= 10) {
            updateCartItemQuantity(book, quantity)
        }
    }

    const updateCartItemQuantity = (book, quantity) => {
        let obj = {
            quantityToBuy: quantity
        }
        updateAddToCart(book._id, obj)
            .then(res => {
                cartItems()
            })
            .catch(err => console.log(err))
    }

    const cartItems = () => {
        getAddedToCartBooks()
            .then(res => {
                const data = res.data.result
                setCart(data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        cartItems()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="myCartOuterContainer">
                <div className="myCartPageContainer">
                    <div className="myCartContainer">
                        <div className="myCartItem1">
                            <div className="myCartItem1Text">My cart ({cart.length}) </div>
                            <div className="myCartItem1Location">
                                <LocationOnIcon style={{ color: "#A03037" }} />
                                <div className="myCartItem1Address">Lorem ipsum, dolor sit amet consectetur adipisicing.</div>
                                <ArrowDropDownOutlinedIcon style={{ color: "#DCDCDC", cursor: "pointer" }} />
                            </div>
                        </div>

                        {
                            cart.map(book => {
                                return (
                                    <div key={book._id} className="myCartItem2">
                                        <div className="myCartItem2-1">
                                            <div className="myCartItem2-1Image"></div>
                                            <div className="myCartItem2-2BookInfo">
                                                <div className="myCartItem2-2BookName">{book.product_id.bookName}</div>
                                                <div className="myCartItem2-2BookAuthor">by {book.product_id.author} </div>
                                                <div className="myCartItem2-2BookPrice">
                                                    <div className="myCartItem2-2NewPrice">Rs. {book.product_id.discountPrice} </div>
                                                    <div className="myCartItem2-2OldPrice"> Rs. {book.product_id.price} </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="myCartItem2-2">
                                            <div className="myCartItem2-2BookQuantity">
                                                <div className="bookQuantityMinus" onClick={() => decrementQuantityToCart(book)} > <RemoveOutlinedIcon style={{ width: "100%", height: "100%", color: "#DBDBDB" }} /> </div>
                                                <div className="bookQuantityNumber"> {book.quantityToBuy} </div>
                                                <div className="bookQuantityAdd" onClick={() => incrementQuantityToCart(book)}> <AddOutlinedIcon style={{ width: "100%", height: "100%", color: "#333232" }} /> </div>
                                                <div className="bookRemove" onClick={() => handleRemoveClick(book._id)} >Remove</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        {
                            (cart.length >= 1) &&
                            <div className="myCartItem3">
                                <div className="myCartItem3Buttondiv">
                                    <button onClick={handlePlaceOrderClick} className="myCartItem3Button">PLACE ORDER</button>
                                </div>
                            </div>

                        }
                    </div>

                    {
                        openAddressDetails ?
                            <div className="addressDetailsContainer">Address Details</div>
                            :
                            <CustomerAddress listenToAddressDetails={listenToAddressDetails} />
                    }

                    {
                        openOrderDetails ?
                            <div className="orderSummaryContainer">Order Summary</div>
                            :
                            <Order />
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MyCart
