const initState = {
  cartError: null,
  loading: true,
  carts: [],
  order: null
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADDED_ITEM_TO_CART_SUCCESS':
      // console.log('added to cart success');
      return {
        ...state,
        carts: action.cart,
        loading: action.loading,
        cartError: null
      };
    case 'ADDED_ITEM_TO_CART_FAILURE':
      // console.log('added to cart failed');
      return {
        ...state,
        cartError: action.error.response
      };
    case 'DELETED_ITEM_FROM_CART_SUCCESS':
      // console.log('DELETED_ITEM_FROM_CART_SUCCESS');
      return {
        ...state,
        carts: action.cart,
        loading: action.loading,
        cartError: null
      };
    case 'DELETED_ITEM_FROM_CART_FAILURE':
      // console.log('ELETED_ITEM_FROM_CART failed');
      return {
        ...state,
        cartError: action.error.response
      };
    case 'GET_USER_CART_ITEMS_SUCCESS':
      // console.log('GET_USER_CART_ITEMS_SUCCESS');
      return {
        ...state,
        carts: action.cart,
        loading: action.loading,
        cartError: null
      };
    case 'GET_USER_CART_ITEMS_FAILURE':
      // console.log('GET_USER_CART_ITEMS_failed');
      return {
        ...state,
        cartError: action.error.response
      };
    case 'INITIALIZE_ORDER_SUCCESS':
      // console.log('GET_USER_CART_ITEMS_SUCCESS');
      return {
        ...state,
        carts: action.cart,
        order: action.order,
        loading: action.loading,
        cartError: null
      };
    case 'INITIALIZE_ORDER_FAILURE':
      // console.log('GET_USER_CART_ITEMS_failed');
      return {
        ...state,
        cartError: action.error.response
      };

    default:
      return state;
  }
};

export default productReducer
