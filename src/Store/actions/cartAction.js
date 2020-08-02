require('dotenv').config();
const url = process.env.REACT_APP_API_URL
const axios = require('axios').default

export const addItemsToCart = (item) => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().cart.loading = true;
      const addItemsToCart = await axios.post(`${url}/api/v1/product/cart`, item, {withCredentials: true })
      loading = getState().cart.loading = false
      dispatch({
        type: 'ADDED_ITEM_TO_CART_SUCCESS',
        cart: addItemsToCart.data.addItemsToCart,
        loading
      })
    }
    catch (error) {
      dispatch({ type: 'ADDED_ITEM_TO_CART_FAILURE', error })
    }
  }
}

export const deleteCartItem = (cartId) => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().cart.loading = true;
      const deleteCartItem = await axios.delete(`${url}/api/v1/product/cart/${cartId}`, {withCredentials: true })
      const getUserCartItems = await axios.get(`${url}/api/v1/product/cart`, {withCredentials: true })
      loading = getState().cart.loading = false
      dispatch({
        type: 'DELETED_ITEM_FROM_CART_SUCCESS',
        cart: getUserCartItems.data.getUserCart,
        loading
      })
    }
    catch (error) {
      dispatch({ type: 'DELETED_ITEM_FROM_CART_FAILURE', error })
    }
  }
}
export const getUserCartItems = () => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().cart.loading = true;
      const getUserCartItems = await axios.get(`${url}/api/v1/product/cart`, {withCredentials: true })
      loading = getState().cart.loading = false
      dispatch({
        type: 'GET_USER_CART_ITEMS_SUCCESS',
        cart: getUserCartItems.data.getUserCart,
        loading
      })
    }
    catch (error) {
      dispatch({ type: 'GET_USER_CART_ITEMS_FAILURE', error })
    }
  }
}