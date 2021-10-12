import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import './Navbar.css'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShopOutlinedIcon from '@mui/icons-material/ShopOutlined';
import Badge from '@mui/material/Badge';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';

function Navbar(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory()
    const handleLogoClick = () => {
        if (props.name == "homePage") {
            props.listenToViewBookInfo(false)
        }
        else {
            history.push('/user-home-page')
        }
    }

    const handleCartClick = () => {
        history.push("/user-cart")
    }

    const handleWishlistClick = () => {
        history.push("/user-wishlist")
    }

    const handleLogoutClick = () => {
        localStorage.removeItem('bookStoreToken')
        history.push("/")
    }

    const handleProfileClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <React.Fragment>
            <div className="navbarMainContainer mainContainer">
                <div className="navbarContainer innerContainer">
                    <div className="navItem1">
                        <div className="logoImgAndText" onClick={handleLogoClick} >
                            <div className="bookStorelogo"></div>
                            <div className="logoText">Bookstore</div>
                        </div>
                        <div className="navSearchbar">
                            <input className="searchBarInput" placeholder=" Search ..." type="text" />
                        </div>
                    </div>
                    <div className="navItem2">
                        <div className="profileImgAndTxt" onClick={handleProfileClick}>
                            <div className="profileImg"> <PersonOutlineOutlinedIcon /> </div>
                            <div className="profileTxt">Tushar</div>
                        </div>
                        <Popper click style={{ boxShadow: "0px 3px 6px #00000029", boxSizing: "border-box", backgroundColor: "#fff", border: "2px solid white", width: "200px", borderRadius: "3px", height: "182px" }} id={id} open={open} anchorEl={anchorEl}>
                            <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                                <div className="popperContainer">
                                    <div className="popperHeading">Hello Tushar</div>
                                    <div className="popperContent"> <PersonOutlineOutlinedIcon style={{height: "13px", marginRight: "5px", width: "13px",}} /> Profile</div>
                                    <div className="popperContent"> <ShopOutlinedIcon style={{height: "13px", marginRight: "5px", width: "13px",}} /> My Order</div>
                                    <div className="popperContent" onClick={handleWishlistClick}> <FavoriteBorderOutlinedIcon style={{height: "13px", marginRight: "5px", width: "13px",}} /> My Wishlist</div>
                                    <div className="popperBtnContainer">
                                        <div className="popperBtnInnerContainer" onClick={handleLogoutClick}>
                                            <div className="popperBtn">Logout</div>
                                        </div>
                                    </div>
                                </div>
                            </ClickAwayListener>
                        </Popper>
                        <div className="cartImgAndText">
                            <div onClick={handleCartClick} className="cartImg">
                                <Badge style={{ color: "#fff", }} badgeContent={0} > <ShoppingCartOutlinedIcon /> </Badge>
                            </div>
                            <div className="cartTxt">Cart</div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Navbar
