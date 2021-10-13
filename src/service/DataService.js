import axios from 'axios'

const url = 'https://new-bookstore-backend.herokuapp.com'
const config = {
    headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("bookStoreToken"),
    },
}

export const getBooks = async () => {
    let response = await axios.get(`${url}/bookstore_user/get/book`, config)
    return response
}

export const addToCart = async (bookId) => {
    let response = await axios.post(`${url}/bookstore_user/add_cart_item/${bookId}`, {}, config)
    return response
}

export const updateAddToCart = async (bookId, data) => {
    let response = await axios.put(`${url}/bookstore_user/cart_item_quantity/${bookId}`, data, config)
    return response
}

export const getAddedToCartBooks = async () => {
    let response = await axios.get(`${url}/bookstore_user/get_cart_items`, config)
    return response
}

export const removeItemFromCart = async (bookId) => {
    let response = await axios.delete(`${url}/bookstore_user/remove_cart_item/${bookId}`, config)
    return response
}

export const customerAddress = async (data) => {
    let response = await axios.put(`${url}/bookstore_user/edit_user`, data, config)
    return response
}

export const addWishList = async (productId) => {
    let response = await axios.post(`${url}/bookstore_user/add_wish_list/${productId}`, {}, config)
    return response
}

export const getWishListBooks = async () => {
    let response = await axios.get(`${url}/bookstore_user/get_wishlist_items`, config)
    return response
}

export const removeWishListBook = async (productId) => {
    let response = await axios.delete(`${url}/bookstore_user/remove_wishlist_item/${productId}`, config)
    return response
}

export const placeOrder = async (data) => {
    let response = await axios.post(`${url}/bookstore_user/add/order`, data, config)
    return response
} 




