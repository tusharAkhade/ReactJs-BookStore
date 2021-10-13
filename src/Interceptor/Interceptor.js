import axios from 'axios'

axios.interceptors.request.use(req => {
    if(req.url.includes('bookstore_user/add_cart_item/') || req.url.includes('bookstore_user/add/order') || req.url.includes('bookstore_user/remove_cart_item/')) {
        req.headers.token = localStorage.getItem('token')
        // console.log(req)
        return req;
    }
    else if(req.url.includes('bookstore_user/cart_item_quantity/') || req.url.includes('bookstore_user/get_cart_items') || req.url.includes('bookstore_user/remove_wishlist_item/')) {
        req.headers.token = localStorage.getItem('token')
        // console.log(req)
        return req;
    }
    else if(req.url.includes('bookstore_user/add_wish_list/') || req.url.includes('bookstore_user/edit_user') || req.url.includes('bookstore_user/get_wishlist_items') ) {
        req.headers.token = localStorage.getItem('token')
        // console.log(req)
        return req;
    }
    else {
        return req;
    }
})


axios.interceptors.response.use(resp => {
    if(resp.status!= 200) {
        console.log("error")
    }
    // console.log(resp)
    return resp;
})




