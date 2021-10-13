import React, { useContext } from 'react'
import { ActionContext } from '../UserHomePage/UserHomePage'
import StarIcon from '@mui/icons-material/Star';

function MapBooks(props) {
    let { book } = props
    const openSingleBookInfoAndGiveBookId = useContext(ActionContext)
    const handleBookCardClick = () => {
        openSingleBookInfoAndGiveBookId(true, book._id)
    }
    return (
        <React.Fragment>
            <div className="singleBookCard" onClick={handleBookCardClick}>
                <div className="bookImgContainer">
                    <div className="bookImage"></div>
                </div>
                <div className="bookMetadataContainer">
                    <div className="bookName">{book.bookName}</div>
                    <div className="bookAuthorName"> {book.author} </div>
                    <div className="bookRatings">
                        <div className="bookRatingPoints">4.5 <StarIcon style={{ width: "13px", height: "13px" }} /> </div>
                        <div className="numOfPeopleRatingInViewAll">(20)</div>
                    </div>
                    <div className="bookPriceContainer">
                        <div className="newPriceInViewAll"> Rs. {book.discountPrice} </div>
                        <div className="oldPriceInViewAll"> Rs. {book.price} </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MapBooks
