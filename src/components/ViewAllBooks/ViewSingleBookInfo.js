import React, { useState, useEffect } from 'react'
import './ViewSingleBookInfo.css'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { addToCart, addWishList, getAddedToCartBooks, removeItemFromCart, updateAddToCart } from '../../service/DataService';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';

function ViewSingleBookInfo(props) {
    const { singleBook } = props
    const [alreadyAddedBookInCart, setAlreadyAddedBookInCart] = useState([])
    const [openCartCounter, setOpenCartCounter] = useState(false)

    const cartItems = () => {
        getAddedToCartBooks()
            .then(res => {
                // console.log(res.data.result)
                let singleBookAddedInCart = res.data.result.filter(function (book) {
                    if (book.product_id._id == singleBook[0]._id) {
                        return book
                    }
                })
                setAlreadyAddedBookInCart(singleBookAddedInCart)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        cartItems()
    }, [singleBook])

    const handleAddToBagClick = () => {
        addToCart(singleBook[0]._id)
            .then(res => {
                cartItems()
                setOpenCartCounter(true)
            })
            .catch(err => console.log(err))
    }

    const updateCartItemQuantity = (quantity) => {
        let obj = {
            quantityToBuy: quantity
        }
        updateAddToCart(alreadyAddedBookInCart[0]._id, obj)
            .then(res => {
                cartItems()
            })
            .catch(err => console.log(err))
    }

    const handleMinusClick = () => {
        let quantity = alreadyAddedBookInCart[0].quantityToBuy - 1
        if (quantity > 0) {
            updateCartItemQuantity(quantity)
        }
        else if (quantity == 0) {
            removeItemFromCart(alreadyAddedBookInCart[0]._id)
                .then(res => {
                    setAlreadyAddedBookInCart([])
                    setOpenCartCounter(false)
                })
        }
    }

    const handlePlusClick = () => {
        let quantity = alreadyAddedBookInCart[0].quantityToBuy + 1
        if (quantity <= 10) {
            updateCartItemQuantity(quantity)
        }
    }

    const handleWishlistClick = () => {
        addWishList(singleBook[0]._id)
    }

    return (
        <React.Fragment>
            {
                <div className="mainContainer outerSingleBookInfoContainer">
                    {
                        singleBook.map(book => {
                            return (
                                <div className="innerContainer singleBookInfoContainer">
                                    <div className="bookImageShowContainer">
                                        <div className="singleBookImageContainer">
                                            <div className="singleBookImage"></div>
                                        </div>
                                        <div className="btnContainer">
                                            {
                                                (openCartCounter || alreadyAddedBookInCart.length > 0) ?
                                                    (
                                                        <div className="bookAddToBagBtnContainer" >
                                                            <div className="bookAddToBagMinusBtn" onClick={() => handleMinusClick()} > <RemoveOutlinedIcon style={{ color: "#DBDBDB", }} /> </div>
                                                            <div className="bookAddToBagCounter" style={{ color: "#333232" }}>
                                                                {
                                                                    (alreadyAddedBookInCart.length > 0) &&
                                                                    (alreadyAddedBookInCart[0].quantityToBuy)
                                                                }
                                                            </div>
                                                            <div className="bookAddToBagPlusBtn" onClick={() => handlePlusClick()} > <AddOutlinedIcon style={{ color: "#333232" }} /> </div>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <Button className="addToBagBtn" style={{ backgroundColor: "#A03037", borderRadius: "3px", width: "45%", color: "#DBDBDB", }} onClick={handleAddToBagClick} variant="contained">Add to bag</Button>
                                                    )

                                            }
                                            <Button className="wishlistBtn" onClick={handleWishlistClick} style={{ backgroundColor: "#333333", borderRadius: "3px", width: "45%", color: "#DBDBDB", }} variant="contained">Wishlist</Button>
                                        </div>
                                    </div>
                                    <div className="bookInfoShowContainer">
                                        <div className="singleBookMetadataContainer">
                                            <div className="singleBookName">{book.bookName}</div>
                                            <div className="singleBookAuthorName">by {book.author} </div>
                                            <div className="singleBookRatings">
                                                <div className="singleBookRatingPoints">4.5 <StarIcon style={{ width: "15px", height: "15px" }} /> </div>
                                                <div className="numOfPeopleRating">(20)</div>
                                            </div>
                                            <div className="singleBookPriceContainer">
                                                <div className="newPrice"> Rs. {book.discountPrice} </div>
                                                <div className="oldPrice"> Rs. {book.price} </div>
                                            </div>
                                        </div>
                                        <Divider style={{ color: "#9D9D9D", }} />
                                        <div className="singleBookDesc">
                                            <div className="singleBookDescItem1">Book Details</div>
                                            <div className="singleBookDescItem2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quam, voluptates odio similique reprehenderit iure expedita minima, magni explicabo voluptatibus incidunt! Maxime ratione ad, dicta expedita ab eligendi ullam non nam aperiam ipsam odit voluptate earum placeat odio aliquam provident iure unde saepe eaque. Ex, pariatur? Sed nostrum quia aspernatur. </div>
                                        </div>
                                        <Divider style={{ color: "#9D9D9D", }} />
                                        <div className="feedbackContainer">
                                            <p className="feedbackHeading">Customer Feedback</p>
                                            <div className="writeFeedbackContainer">
                                                <div className="ratingText">Overall rating</div>
                                                <div className="ratingStarContainer">
                                                    <StarBorderOutlinedIcon style={{ color: "#707070" }} />
                                                    <StarBorderOutlinedIcon style={{ color: "#707070" }} />
                                                    <StarBorderOutlinedIcon style={{ color: "#707070" }} />
                                                    <StarBorderOutlinedIcon style={{ color: "#707070" }} />
                                                    <StarBorderOutlinedIcon style={{ color: "#707070" }} />
                                                </div>
                                                <textarea className="writeReviewTextarea" placeholder="Write your review" name="" id="" rows="3"></textarea>
                                                <button className="submitReviewBtn" type="submit">Submit</button>
                                            </div>
                                        </div>
                                        <div className="allReviewsContainer">
                                            <div className="reviewContainer">
                                                <div className="reviewAccImgContainer">
                                                    <div className="reviewAccImg"> AC </div>
                                                </div>
                                                <div className="customerReviewContainer">
                                                    <div className="reviewCustomerName">Aniket Chile</div>
                                                    <div className="customerRatingsContainer">
                                                        <StarIcon style={{ color: "#FFCE00" }} />
                                                        <StarIcon style={{ color: "#FFCE00" }} />
                                                        <StarIcon style={{ color: "#FFCE00" }} />
                                                        <StarBorderOutlinedIcon style={{ color: "#707070" }} />
                                                        <StarBorderOutlinedIcon style={{ color: "#707070" }} />
                                                    </div>
                                                    <div className="customerReviewText">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae perferendis totam esse perspiciatis aspernatur architecto quos alias, consectetur itaque obcaecati voluptatum maxime temporibus aperiam. Velit quos laudantium aperiam cum cupiditate.</div>
                                                </div>
                                            </div>
                                            <div className="reviewContainer">
                                                <div className="reviewAccImgContainer">
                                                    <div className="reviewAccImg"> SB </div>
                                                </div>
                                                <div className="customerReviewContainer">
                                                    <div className="reviewCustomerName">Sweta Bodkar</div>
                                                    <div className="customerRatingsContainer">
                                                        <StarIcon style={{ color: "#FFCE00" }} />
                                                        <StarIcon style={{ color: "#FFCE00" }} />
                                                        <StarIcon style={{ color: "#FFCE00" }} />
                                                        <StarIcon style={{ color: "#FFCE00" }} />
                                                        <StarBorderOutlinedIcon style={{ color: "#707070" }} />
                                                    </div>
                                                    <div className="customerReviewText">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae perferendis totam esse perspiciatis aspernatur architecto quos alias, consectetur itaque obcaecati voluptatum maxime temporibus aperiam. Velit quos laudantium aperiam cum cupiditate.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </React.Fragment>
    )
}

export default ViewSingleBookInfo
