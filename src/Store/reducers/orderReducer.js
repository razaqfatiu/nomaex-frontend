
const initState = {
  orderError: null,
  loading: true,
  orders: {},
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
    case 'CHECKOUT_SUCCESS':
      // console.log('GET_USER_CART_ITEMS_SUCCESS');
      return {
        ...state,
        orders: action.order,
        loading: action.loading,
        orderError: null
      };
    case 'CHECKOUT_FAILURE':
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
