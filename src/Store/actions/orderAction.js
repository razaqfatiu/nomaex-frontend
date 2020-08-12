require('dotenv').config();
const url = process.env.REACT_APP_API_URL
const axios = require('axios').default


export const getInitializedOrderRequest = () => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().cart.loading = true;
      const getNewOrder = await axios.get(`${url}/api/v1/cart/get-new-order`, { withCredentials: true })
      loading = getState().cart.loading = false
      dispatch({
        type: 'GET_NEW_ORDER_SUCCESS',
        order: getNewOrder.data.getNewUserOrder,
        loading
      })
    }
    catch (error) {
      dispatch({ type: 'GET_NEW_ORDER_FAILURE', error })
    }
  }
}

export const checkOutCartInit = (cred) => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().cart.loading = true;
      const checkOutCart = await axios.post(`${url}/api/v1/cart/checkout`, cred, { withCredentials: true })
      loading = getState().cart.loading = false
      dispatch({
        type: 'CHECKOUT_SUCCESS',
        cart: checkOutCart.data.initializePayment,
        loading
      })
    }
    catch (error) {
      dispatch({ type: 'CHECKOUT_FAILURE', error })
    }
  }
}