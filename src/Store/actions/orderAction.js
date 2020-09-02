
require('dotenv').config();
const url = process.env.REACT_APP_API_URL
const axios = require('axios').default


export const getInitializedOrderRequest = () => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().order.loading = true;
      const getNewOrder = await axios.get(`${url}/api/v1/cart/get-new-order`, { withCredentials: true })
      loading = getState().cart.loading = await false
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

export const checkOutPay = (cred) => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().order.loading = true;
      const checkOutPay = await axios.post(`${url}/api/v1/order/pay`, cred, { withCredentials: true })
      const getNewOrder = await axios.get(`${url}/api/v1/cart/get-new-order`, { withCredentials: true })
      loading = getState().order.loading = false
      dispatch({
        type: 'CHECKOUT_PAY_SUCCESS',
        order: getNewOrder.data.getNewUserOrder,
        checkOut: checkOutPay.data,
        loading
      })
    }
    catch (error) {
      dispatch({ type: 'CHECKOUT_PAY_FAILURE', error })
    }
  }
}

export const verifyOrderCheckOut = () => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().order.loading = true;
      const verifyOrderCheckOut = await axios.get(`${url}/api/v1/order/verify`, { withCredentials: true })
      loading = getState().order.loading = false
      dispatch({
        type: 'VERIFY_ORDER_CHECKOUT_SUCCESS',
        order: verifyOrderCheckOut.data.data,
        loading
      })
    }
    catch (error) {
      dispatch({ type: 'VERIFY_ORDER_CHECKOUT_FAILURE', error })
    }
  }
}

export const cancelOrder = () => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().order.loading = true;
      const cancelOrder = await axios.delete(`${url}/api/v1/order/cancel`, { withCredentials: true })
      loading = getState().order.loading = false
      dispatch({
        type: 'CANCEL_ORDER_SUCCESS',
        order: cancelOrder.data.message,
        loading
      })
    }
    catch (error) {
      dispatch({ type: 'CANCEL_ORDER_FAILURE', error })
    }
  }
}

export const getUserOrders = () => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().order.loading = true;
      const getUserOrders = await axios.get(`${url}/api/v1/orders/recent`, { withCredentials: true })
      loading = getState().order.loading = false
      dispatch({
        type: 'USER_RECENT_ORDER_SUCCESS',
        order: getUserOrders.data.data,
        loading
      })
    } catch (error) {
      dispatch({
        type: 'USER_RECENT_ORDER_FAILURE',
        error
      })
    }
  }
}

export const adminGetAllOrders = () => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().order.loading = true;
      const adminGetOrders = await axios.get(`${url}/api/v1/admin/orders`, { withCredentials: true })
      loading = getState().order.loading = false
      dispatch({
        type: 'ADMIN_GET_ORDER_SUCCESS',
        order: adminGetOrders.data.data,
        loading
      })
    } catch (error) {
      dispatch({
        type: 'ADMIN_GET_ORDER_FAILURE',
        error
      })
    }
  }
}

export const adminGetOneOrder = (id) => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().order.loading = true;
      const adminGetOneOrders = await axios.get(`${url}/api/v1/admin/orders/${id}`, { withCredentials: true })
      loading = getState().order.loading = false
      dispatch({
        type: 'ADMIN_GET_ONE_ORDER_SUCCESS',
        order: adminGetOneOrders.data.data,
        loading
      })
    } catch (error) {
      dispatch({
        type: 'ADMIN_GET_ONE_ORDER_FAILURE',
        error
      })
    }
  }
}

export const confirmOrderShipped = (orderId) => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().order.loading = true;
      const adminGetOrders = await axios.get(`${url}/api/v1/admin/orders`, { withCredentials: true })
      const orderShipped = await axios.get(`${url}/api/v1/admin/shipped/orders/${orderId}`, { withCredentials: true })
      loading = getState().order.loading = false
      dispatch({
        type: 'ORDER_SHIPPED_SUCCESS',
        order: adminGetOrders.data.data,
        loading
      })
    } catch (error) {
      dispatch({
        type: 'ORDER_SHIPPED_FAILURE',
        error
      })
    }
  }
}