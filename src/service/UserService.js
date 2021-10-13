import axios from "axios";

export const logIn = async (obj) => {
    let response = await axios.post('https://new-bookstore-backend.herokuapp.com/bookstore_user/login', obj)
    localStorage.setItem('bookStoreToken', response.data.result.accessToken)
    return response
}

export const signUp = async (obj) => {
    let response = await axios.post('https://new-bookstore-backend.herokuapp.com/bookstore_user/registration', obj)
    return response
}

