const initState = {
  productError: null,
  loading: false,
  products: [],
}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATED_PRODUCT_SUCCESS':
      return {
        ...state,
        products: action.product,
        loading: action.loading,
        productError: null
      };
    case 'CREATED_PRODUCT_FAILURE':
      return {
        ...state,
        productError: action.error.response
      }
    case 'GET_ALL_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: action.products,
        loading: action.loading,
        productError: null
      }
    case 'GET_ALL_PRODUCTS_FAILURE':
      return {
        ...state,
        productError: action.error.response
      }
    case 'GET_PRODUCTS_BY_CATEGORY_SUCCESS':
      return {
        ...state,
        products: action.products,
        loading: action.loading,
        productError: null
      }
    case 'GET_PRODUCTS_BY_CATEGORY_FAILURE':
      return {
        ...state,
        productError: action.error.response
      }
    case 'GET_ONE_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: action.product,
        loading: action.loading,
        productError: null
      }
    case 'GET_ONE_PRODUCTS_FAILURE':
      return {
        ...state,
        productError: action.error.response
      }
    case 'UPDATE_PRODUCT_SUCCESS':
      return {
        ...state,
        products: action.product,
        loading: action.loading,
        productError: null
      }
    case 'UPDATE_PRODUCT_FAILURE':
      return {
        ...state,
        productError: action.error.response
      }
    case 'DELETE_UPDATED_PRODUCT_SUCCESS':
      return {
        ...state,
        products: action.product,
        loading: action.loading,
        productError: null
      }
    case 'DELETE_UPDATED_PRODUCT_FAILURE':
      return {
        ...state,
        productError: action.error.response
      }
    default:
      return state;
  }
};

export default productReducer
