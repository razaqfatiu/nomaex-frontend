const initState = {
  cartError: null,
  loading: false,
  carts: [],
  order: null
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADDED_ITEM_TO_CART_SUCCESS':
      return {
        ...state,
        carts: action.cart,
        loading: action.loading,
        cartError: null
      };
    case 'ADDED_ITEM_TO_CART_FAILURE':
      return {
        ...state,
        cartError: action.error.response
      };
    case 'DELETED_ITEM_FROM_CART_SUCCESS':
      return {
        ...state,
        carts: action.cart,
        loading: action.loading,
        cartError: null
      };
    case 'DELETED_ITEM_FROM_CART_FAILURE':
      return {
        ...state,
        cartError: action.error.response
      };
    case 'GET_USER_CART_ITEMS_SUCCESS':
      return {
        ...state,
        carts: action.cart,
        loading: action.loading,
        order: action.order,
        cartError: null
      };
    case 'GET_USER_CART_ITEMS_FAILURE':
      return {
        ...state,
        cartError: action.error.response
      };
    case 'INITIALIZE_ORDER_SUCCESS':
      return {
        ...state,
        carts: action.cart,
        order: action.order,
        loading: action.loading,
        cartError: null
      };
    case 'INITIALIZE_ORDER_FAILURE':
      return {
        ...state,
        cartError: action.error.response
      };

    default:
      return state;
  }
};

export default productReducer
