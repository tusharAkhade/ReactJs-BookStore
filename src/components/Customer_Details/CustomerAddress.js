import React, { useState } from 'react'
import './CustomerAddress.css'
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { makeStyles } from '@mui/styles';
import { customerAddress } from '../../service/DataService';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const useStyles = makeStyles({
    cityStateTextField: {
        color: "#0A0102",
        textTransform: "capitalize",
        font: '13px/15px Roboto',
        height: "45px",
    },
    nameMobileTextField: {
        color: "#333232",
        font: '13px/15px Lato',
        height: "45px",
    },
    addressTextAreaError: {
        borderRadius: "3px",
        width: "-webkit-fill-available",
        font: '13px/16px Roboto',
        outline: "none",
        border: "1px solid #ba000d",
        color: "#0A0102",
        resize: "none",
        padding: "10px",
    },
    addressTextArea: {
        borderRadius: "3px",
        width: "-webkit-fill-available",
        font: '13px/16px Roboto',
        outline: "none",
        border: "1px solid #DCDCDC",
        color: "#0A0102",
        resize: "none",
        padding: "10px",
    },
})

const fullNameRegEx = /^[A-Z]{1}[a-z]{2,}([ ][A-Z]{1}[a-z]{2,})?$/
const phoneNumberRegEx = /^([1-9]{2}\s{1})?[1-9]{1}[0-9]{9}$/
const cityRegEx = /^[A-Z]{1}[a-z]{2,}$/
const stateRegEx = /^[A-Z]{1}[a-z]{2,}$/

function CustomerAddress(props) {
    const classes = useStyles()

    const [fullName, setFullName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [address, setAddress] = useState('')
    const [errorFullName, setErrorFullName] = useState(false)
    const [errorMobileNumber, setErrorMobileNumber] = useState(false)
    const [errorCity, setErrorCity] = useState(false)
    const [errorState, setErrorState] = useState(false)
    const [errorAddress, setErrorAddress] = useState(false)
    const [helperTextFullName, setHelperTextFullName] = useState('')
    const [helperTextMobileNumber, sethelperTextMobileNumber] = useState('')
    const [helperTextCity, setHelperTextCity] = useState(' ')
    const [helperTextState, setHelperTextState] = useState(' ')
    const [helperTextAddress, setHelperTextAddress] = useState(' ')

    const [openOrderDetails, setOpenOrderDetails] = useState(true)
    const [showHomeDetails, setShowHomeDetails] = useState(true)

    const takeFullName = (event) => {
        setFullName(event.target.value)
    }

    const takeMobileNumber = (event) => {
        setMobileNumber(event.target.value)
    }

    const takeFullAddress = (event) => {
        setAddress(event.target.value)
    }

    const takeCity = (event) => {
        setCity(event.target.value)
    }

    const takeState = (event) => {
        setState(event.target.value)
    }

    const handleRadioButton = (event) => {
        console.log(event.target.value)
    }

    const handleContinueClick = () => {
        let fullNameCheck = fullNameRegEx.test(fullName)
        let mobileCheck = phoneNumberRegEx.test(mobileNumber)
        let addressCheck = address
        let stateCheck = stateRegEx.test(state)
        let cityCheck = cityRegEx.test(city)

        if (fullNameCheck) {
            setErrorFullName(false)
            setHelperTextFullName(' ')
        } else {
            setErrorFullName(true)
            setHelperTextFullName('Enter valid name')
        }

        if (mobileCheck) {
            setErrorMobileNumber(false)
            sethelperTextMobileNumber(' ')
        } else {
            setErrorMobileNumber(true)
            sethelperTextMobileNumber('Enter valid number')
        }

        if (addressCheck.length >= 3) {
            setErrorAddress(false)
            setHelperTextAddress(' ')
        } else {
            setErrorAddress(true)
            setHelperTextAddress('Enter valid address')
        }

        if (cityCheck) {
            setErrorCity(false)
            setHelperTextCity(' ')
        } else {
            setErrorCity(true)
            setHelperTextCity('Enter valid number')
        }

        if (stateCheck) {
            setErrorState(false)
            setHelperTextState(' ')
        } else {
            setErrorState(true)
            setHelperTextState('Enter valid number')
        }

        if (fullNameCheck && mobileCheck && addressCheck && cityCheck && stateCheck) {
            let obj = {
                "addressType": "Home",
                "fullAddress": address,
                "city": city,
                "state": state,
            }
            customerAddress(obj)
                .then(res => {
                    setOpenOrderDetails(false)
                    props.listenToAddressDetails(openOrderDetails)
                    setShowHomeDetails(false)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="customerAddressOuterContainer">
            <div className="customerAddressItem1">
                <div className="customerAddressItem1Text">Customer Details</div>
                <div className="customerAddressItem1Btn">Add New Address</div>
            </div>
            <div className="customerDetailsContainer">
                <div className="customerBasicDetail">
                    <div className="customerFullname">
                        <InputLabel style={{ color: "#0A0102", font: '13px/16px Roboto', }} htmlFor="nameTextfield">Full Name</InputLabel>
                        <TextField InputProps={{ className: classes.nameMobileTextField }} fullWidth size='small' id="nameTextfield" error={errorFullName} variant="outlined" onChange={takeFullName} />
                    </div>
                    <div className="customerMobileNum">
                        <InputLabel style={{ color: "#0A0102", font: '13px/16px Roboto', }} htmlFor="mobileTextfield">Mobile Number</InputLabel>
                        <TextField InputProps={{ className: classes.nameMobileTextField }} fullWidth size='small' id="mobileTextfield" error={errorMobileNumber} variant="outlined" onChange={takeMobileNumber} />
                    </div>
                </div>

                <div className="customerEditAddressDetailContainer">
                    <div className="customerAddressDetail">
                        <div className="customerAddressText">Address</div>
                        <div className="customerAddressTextarea">
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Enter Address..."
                                minRows={3}
                                id="addresTextArea"
                                onChange={takeFullAddress}
                                className={errorAddress ? classes.addressTextAreaError : classes.addressTextArea}
                            />
                            <FormHelperText style={{ height: "13px", font: "10px/10px Roboto", color: "#FF001C", fontWeight: "bolder", }} id="addresTextArea">{helperTextAddress}</FormHelperText>
                        </div>
                        <div className="customerBasicDetail customerCityAndState">
                            <div className="customerCity">
                                <InputLabel style={{ color: "#0A0102", font: '13px/16px Roboto', }} htmlFor="cityTextfield">city/town</InputLabel>
                                <TextField InputProps={{ className: classes.cityStateTextField }} fullWidth size='small' id="cityTextfield" error={errorCity} variant="outlined" onChange={takeCity} />
                                <FormHelperText style={{ height: "13px", font: "10px/10px Roboto", color: "#FF001C", fontWeight: "bolder", }} id="cityTextfield">{helperTextCity}</FormHelperText>
                            </div>
                            <div className="customerState">
                                <InputLabel style={{ color: "#0A0102", font: '13px/16px Roboto', }} htmlFor="stateTextfield">State</InputLabel>
                                <TextField InputProps={{ className: classes.cityStateTextField }} fullWidth size='small' id="stateTextfield" error={errorState} variant="outlined" onChange={takeState} />
                                <FormHelperText style={{ height: "13px", font: "10px/10px Roboto", color: "#FF001C", fontWeight: "bolder", }} id="stateTextfield">{helperTextState}</FormHelperText>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="radioButtonContainer">
                    <div className="radioButton">
                        <FormControl component="fieldset" style={{width: "100%"}}>
                            <FormLabel component="legend">Type</FormLabel>
                            <RadioGroup
                                row
                                aria-label="type"
                                defaultValue="WORK"
                                name="type"
                                style={{display: "flex", justifyContent: "space-between"}}
                                onChange={handleRadioButton}
                            >
                                <FormControlLabel value="Home" control={<Radio />} label="Home" />
                                <FormControlLabel selected value="Work" control={<Radio />} label="Work" />
                                <FormControlLabel value="Other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>
            {
                showHomeDetails &&
                <div className="customerContinueBtnDiv">
                    <button onClick={handleContinueClick} className="customerContinueBtn">CONTINUE</button>
                </div>
            }
        </div>
    )
}

export default CustomerAddress
