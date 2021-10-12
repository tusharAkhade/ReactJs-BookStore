import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import './Login.css'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { logIn, signUp } from '../../service/UserService';
import Button from '@mui/material/Button';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegEx = /^(?=.*[A-Z])(?=.*[a-z])(?=[^!@#$%^&+=]*[!@#$%^&+=][^!@#$%^&+=]*$)(?=.*[0-9]).{8,}$/
const fullNameRegEx = /^[A-Z]{1}[a-z]{2,}([ ][A-Z]{1}[a-z]{2,})?$/
const phoneNumberRegEx = /^([1-9]{2}\s{1})?[1-9]{1}[0-9]{9}$/

function Login(props) {
    const [openSignUp, setOpenSignUp] = React.useState(false)
    const [isSignUpClicked, setIsSignUpClicked] = React.useState(false)

    const [errorEmail, setErrorEmail] = React.useState(false)
    const [errorPassword, setErrorPassword] = React.useState(false)
    const [errorFullName, setErrorFullName] = React.useState(false)
    const [errorPhoneNumber, setErrorPhoneNumber] = React.useState(false)

    const [helperTextEmail, setHelperTextEmail] = React.useState(' ')
    const [helperTextPassword, setHelperTextPassword] = React.useState(' ')
    const [helperTextPhoneNumber, setHelperTextPhoneNumber] = React.useState(' ')
    const [helperTextFullName, setHelperTextFullName] = React.useState(' ')

    const [loginValues, setLoginValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const [signUpValues, setSignUpValues] = React.useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        showPassword: false,
    });

    const handleLoginPageSwitchClick = (e) => {
        setOpenSignUp(false)
        setIsSignUpClicked(false)
        reset()
    }

    const handleSignUpPageSwitchClick = () => {
        setOpenSignUp(true)
        setIsSignUpClicked(true)
        reset()
    }

    const takeEmailFromLogin = (event) => {
        setLoginValues({ ...loginValues, email: event.target.value })
    }

    const takePasswordFromLogin = (event) => {
        setLoginValues({ ...loginValues, password: event.target.value })
    }

    let handleClickShowPasswordFromLogin = () => {
        setLoginValues({ ...loginValues, showPassword: !loginValues.showPassword })
    }

    const takeFullNameFromSignUp = (event) => {
        setSignUpValues({ ...signUpValues, fullName: event.target.value })
    }

    const takeEmailFromSignUp = (event) => {
        setSignUpValues({ ...signUpValues, email: event.target.value })
    }

    const takePasswordFromSignUp = event => {
        setSignUpValues({ ...signUpValues, password: event.target.value })
    }

    const takePhoneNumberFromSignUp = event => {
        setSignUpValues({ ...signUpValues, phoneNumber: event.target.value })
    }

    let handleClickShowPasswordFromSignUp = () => {
        setSignUpValues({ ...signUpValues, showPassword: !signUpValues.showPassword })
    }

    const handleSignUpClickBtn = () => {
        let emailCheck = emailRegex.test(signUpValues.email)
        let passwordCheck = passwordRegEx.test(signUpValues.password)
        let fullNameCheck = fullNameRegEx.test(signUpValues.fullName)
        let phoneNumCheck = phoneNumberRegEx.test(signUpValues.phoneNumber)

        if (emailCheck) {
            setErrorEmail(false)
            setHelperTextEmail(' ')
        } else {
            setErrorEmail(true)
            setHelperTextEmail('Enter valid email')
        }

        if (passwordCheck) {
            setErrorPassword(false)
            setHelperTextPassword(' ')
        } else {
            setErrorPassword(true)
            setHelperTextPassword('Enter valid password')
        }

        if (fullNameCheck) {
            setErrorFullName(false)
            setHelperTextFullName(' ')
        } else {
            setErrorFullName(true)
            setHelperTextFullName('Enter valid name')
        }

        if (phoneNumCheck) {
            setErrorPhoneNumber(false)
            setHelperTextPhoneNumber(' ')
        } else {
            setErrorPhoneNumber(true)
            setHelperTextPhoneNumber('Enter valid mobile number')
        }

        if (emailCheck && passwordCheck && fullNameCheck && phoneNumCheck) {
            let obj = {
                fullName: signUpValues.fullName,
                email: signUpValues.email,
                password: signUpValues.password,
                phone: signUpValues.phoneNumber
            }
            signUp(obj)
                .then(res => {
                    if (res.status == 200) {
                        setOpenSignUp(false)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const handleLoginClickBtn = () => {
        let emailCheck = emailRegex.test(loginValues.email)
        let passwordCheck = passwordRegEx.test(loginValues.password)

        if (emailCheck == true) {
            setErrorEmail(false)
            setHelperTextEmail(' ')
        } else {
            setHelperTextEmail('Enter valid email')
            setErrorEmail(true)
        }

        if (passwordCheck == true) {
            setErrorPassword(false)
            setHelperTextPassword(' ')
        } else {
            setErrorPassword(true)
            setHelperTextPassword('Enter valid password')
        }

        if (emailCheck == true && passwordCheck == true) {
            let obj = {
                email: loginValues.email,
                password: loginValues.password,
            }
            logIn(obj)
                .then(res => {
                    if (res.status == 200) {
                        // console.log(props)
                        props.history.push("/user-home-page")
                    }
                })
        }
    }

    const reset = () => {
        setLoginValues({
            email: '',
            password: '',
            showPassword: false,
        })

        setSignUpValues({
            fullName: '',
            email: '',
            password: '',
            phoneNumber: '',
            showPassword: false,
        })

        setErrorEmail(false)
        setErrorPassword(false)
        setErrorPhoneNumber(false)
        setErrorFullName(false)

        setHelperTextFullName(' ')
        setHelperTextEmail(' ')
        setHelperTextPassword(' ')
        setHelperTextPhoneNumber(' ')
    }

    return (
        <React.Fragment>
            <div className="loginPageContainer">
                <div className="mainLoginPage">
                    <div className="mainLoginPageImagediv">
                        <div className="mainLoginPageImagedivItem">
                            <div className="mainLoginPageDivBgImg"></div>
                            <div className="mainLoginPageDivText">ONLINE BOOK SHOPPING</div>
                        </div>
                    </div>

                    <div className="mainLoginAndSignUpPageDetails">

                        <div className="loginAndSignupForm">
                            <div className={isSignUpClicked ? "LoginForm pageHeadingText" : "LoginFormClick pageHeadingText" } onClick={handleLoginPageSwitchClick}>LOGIN</div>
                            <div className={isSignUpClicked ? "SignupFormClick pageHeadingText" : "SignupForm pageHeadingText" } onClick={handleSignUpPageSwitchClick}>SIGNUP</div>
                        </div>

                        {
                            openSignUp ?
                                <div className="SignUpPageForm">
                                    <div className="username-container">
                                        <InputLabel style={{height: "13px", color: "#0A0102", font: "11px/13px Roboto", fontWeight: "bolder",}} htmlFor="nameTextfield" >Full Name</InputLabel>
                                        <TextField className="username-text fullName-text" fullWidth size='small' id="nameTextfield" value={signUpValues.fullName} error={errorFullName} variant="outlined" onChange={takeFullNameFromSignUp} />
                                        <FormHelperText style={{height: "13px", font: "10px/10px Roboto", color: "#FF001C", fontWeight: "bolder", }} id="nameTextfield">{helperTextFullName}</FormHelperText>
                                    </div>
                                    <div className="username-container">
                                        <InputLabel style={{height: "13px", color: "#0A0102", font: "11px/13px Roboto", fontWeight: "bolder",}} htmlFor="textfield" >Email id</InputLabel>
                                        <TextField className="username-text" fullWidth size='small' id="emailTextfield" error={errorEmail} variant="outlined" onChange={takeEmailFromSignUp} />
                                        <FormHelperText style={{height: "13px", font: "10px/10px Roboto", color: "#FF001C", fontWeight: "bolder", }} id="emailTextfield">{helperTextEmail}</FormHelperText>
                                    </div>
                                    <div className="login-password-container">
                                        <InputLabel style={{height: "13px", color: "#0A0102", font: "11px/13px Roboto", fontWeight: "bolder",}} htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput className="login-password-text"
                                            type={signUpValues.showPassword ? 'text' : 'password'}
                                            size='small' id="outlined-adornment-password"
                                            fullWidth
                                            error={errorPassword}
                                            onChange={takePasswordFromSignUp}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPasswordFromSignUp}
                                                        edge="end"
                                                    >
                                                        {signUpValues.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText style={{height: "13px", font: "10px/10px Roboto", color: "#FF001C", fontWeight: "bolder", }} id="outlined-adornment-password">{helperTextPassword}</FormHelperText>
                                    </div>
                                    <div className="username-container">
                                        <InputLabel style={{height: "13px", color: "#0A0102", font: "11px/13px Roboto", fontWeight: "bolder",}} htmlFor="textfield">Mobile Number</InputLabel>
                                        <TextField className="username-text" fullWidth size='small' id="mobileTextfield" error={errorPhoneNumber} variant="outlined" onChange={takePhoneNumberFromSignUp} />
                                        <FormHelperText style={{height: "13px", font: "10px/10px Roboto", color: "#FF001C", fontWeight: "bolder", }} id="mobileTextfield">{helperTextPhoneNumber}</FormHelperText>
                                    </div>
                                    <div className="loginBtnContainer signUpBtnContainer">
                                        <Button fullWidth onClick={handleSignUpClickBtn} style={{ backgroundColor: "#A03037", borderRadius: "3px" }} variant="contained">Signup</Button>
                                    </div>
                                </div>

                                :

                                <div className="loginPageForm">
                                    <div className="username-container">
                                        <InputLabel style={{height: "13px", color: "#0A0102", font: "11px/13px Roboto", fontWeight: "bolder",}} htmlFor="textfield">Email id</InputLabel>
                                        <TextField
                                            autoFocus
                                            className="username-text"
                                            fullWidth
                                            size='small'
                                            value={loginValues.email}
                                            id="textfield"
                                            error={errorEmail}
                                            variant="outlined"
                                            onChange={takeEmailFromLogin}
                                        />
                                        <FormHelperText style={{height: "13px", font: "10px/10px Roboto", color: "#FF001C", fontWeight: "bolder", }} id="adornment-password">{helperTextEmail}</FormHelperText>
                                    </div>
                                    <div className="login-password-container">
                                        <InputLabel style={{height: "13px", color: "#0A0102", font: "11px/13px Roboto", fontWeight: "bolder",}} htmlFor="adornment-password">Password</InputLabel>
                                        <OutlinedInput className="login-password-text"
                                            type={loginValues.showPassword ? 'text' : 'password'}
                                            size='small'
                                            fullWidth
                                            id="adornment-password"
                                            helperText={"helperTextPassword"}
                                            error={errorPassword}
                                            variant="outlined"
                                            onChange={takePasswordFromLogin}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPasswordFromLogin}
                                                        edge="end"
                                                    >
                                                        {loginValues.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText style={{height: "13px", font: "10px/10px Roboto", color: "#FF001C", fontWeight: "bolder", }} id="adornment-password">{helperTextPassword}</FormHelperText>
                                    </div>
                                    <div className="loginBtnContainer">
                                        <Button fullWidth onClick={handleLoginClickBtn} style={{ backgroundColor: "#A03037", borderRadius: "3px" }} variant="contained">Login</Button>
                                    </div>
                                    <Divider style={{ width: "80%", margin: "0 auto" }} className="loginPageDivider">OR</Divider>
                                    <div className="loginOptions">
                                        <div className="fbLoginBtn">
                                            <Button style={{ backgroundColor: "#4266B2", borderRadius: "3px", width: "100%" }} variant="contained">Facebook</Button>
                                        </div>
                                        <div className="googleLoginBtn">
                                            <Button style={{ backgroundColor: "#F5F5F5", borderRadius: "3px", color: "#0A0102", width: "100%" }} variant="contained">Google</Button>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login
