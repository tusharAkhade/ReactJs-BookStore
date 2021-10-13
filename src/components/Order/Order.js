import React, { useState, useEffect } from 'react'
import { getAddedToCartBooks, placeOrder } from '../../service/DataService'
import './Order.css'
import { useHistory } from "react-router-dom";

function Order() {
    const history = useHistory()
    const [addedToCartBooks, setAddedToCartBooks] = useState([])

    const handleCheckoutCLick = () => {
        let cartItems = addedToCartBooks.map(book => {
            return {
                product_id: book._id,
                product_name: book.product_id.bookName,
                product_quantity: `${book.quantityToBuy}`,
                product_price: `${book.product_id.price}`
            }
        })
        let obj = {
            orders: cartItems
        }
        placeOrder(obj)
            .then(res => {
                history.push('/user-order-placed')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAddedToCartBooks()
            .then(res => {
                setAddedToCartBooks(res.data.result)
                let cartBooks = addedToCartBooks.map(book => {
                    return ({
                        cartItemId: book._id,
                        cartItemName: book.product_id.bookName,
                        cartItemQuantity: `${book.quantityToBuy}`,
                        cartItemPrice: `${book.product_id.price}`
                    }
                    )
                })
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="orderOuterContainer">
            <div className="orderBookItem1">
                <div className="orderBookItem1Text">Order Summary</div>
            </div>
            <div>
                {
                    addedToCartBooks.map(book =>
                        <div className="orderBookContainer">
                            <div className="orderBookImageContainer">
                                <div className="orderBookImage"></div>
                            </div>
                            <div className="orderBookInfoContainer">
                                <div className="orderBookName"> {book.product_id.bookName} </div>
                                <div className="orderBookAuthor">by {book.product_id.author} </div>
                                <div className="orderBookPrice">
                                    <div className="orderBookNewPrice">Rs. {book.product_id.discountPrice} </div>
                                    <div className="orderBookOldPrice">Rs. {book.product_id.price} </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="checkoutBtnContainer">
                <button onClick={handleCheckoutCLick}>CHECKOUT</button>
            </div>
        </div>
    )
}

export default Order
