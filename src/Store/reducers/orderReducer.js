
const initState = {
  orderError: null,
  loading: true,
  orders: [],
  checkOut: null
}

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_NEW_ORDER_SUCCESS':
      // console.log('GET_USER_CART_ITEMS_SUCCESS');
      return {
        ...state,
        orders: action.order,
        loading: action.loading,
        orderError: null
      };
    case 'GET_NEW_ORDER_FAILURE':
      // console.log('GET_USER_CART_ITEMS_failed');
      return {
        ...state,
        orderError: action.error.response
      };
    case 'CHECKOUT_PAY_SUCCESS':
      // console.log('GET_USER_CART_ITEMS_SUCCESS');
      return {
        ...state,
        orders: action.order,
        loading: action.loading,
        checkOut: action.checkOut,
        orderError: null
      };
    case 'CHECKOUT_PAY_FAILURE':
      // console.log('GET_USER_CART_ITEMS_failed');
      return {
        ...state,
        orderError: action.error.response
      };
    case 'VERIFY_ORDER_CHECKOUT_SUCCESS':
      // console.log('GET_USER_CART_ITEMS_SUCCESS');
      return {
        ...state,
        orders: action.order,
        loading: action.loading,
        orderError: null
      };
    case 'VERIFY_ORDER_CHECKOUT_FAILURE':
      // console.log('GET_USER_CART_ITEMS_failed');
      return {
        ...state,
        orderError: action.error.response
      };
    case 'CANCEL_ORDER_SUCCESS':
      // console.log('GET_USER_CART_ITEMS_SUCCESS');
      return {
        ...state,
        orders: action.order,
        loading: action.loading,
        orderError: null
      };
    case 'CANCEL_ORDER_FAILURE':
      // console.log('GET_USER_CART_ITEMS_failed');
      return {
        ...state,
        orderError: action.error.response
      };
    case 'USER_RECENT_ORDER_SUCCESS':
      // console.log('GET_USER_CART_ITEMS_SUCCESS');
      return {
        ...state,
        orders: action.order,
        loading: action.loading,
        orderError: null
      };
    case 'USER_RECENT_ORDER_FAILURE':
      // console.log('GET_USER_CART_ITEMS_failed');
      return {
        ...state,
        orderError: action.error.response
      };
    case 'ADMIN_GET_ORDER_SUCCESS':
      // console.log('GET_USER_CART_ITEMS_SUCCESS');
      return {
        ...state,
        orders: action.order,
        loading: action.loading,
        orderError: null
      };
    case 'ADMIN_GET_ORDER_FAILURE':
      // console.log('GET_USER_CART_ITEMS_failed');
      return {
        ...state,
        orderError: action.error.response
      };
    case 'ORDER_SHIPPED_SUCCESS':
      // console.log('GET_USER_CART_ITEMS_SUCCESS');
      return {
        ...state,
        orders: action.order,
        loading: action.loading,
        orderError: null
      };
    case 'ORDER_SHIPPED_FAILURE':
      // console.log('GET_USER_CART_ITEMS_failed');
      return {
        ...state,
        orderError: action.error.response
      };

    default:
      return state;
  }
};

export default orderReducer
