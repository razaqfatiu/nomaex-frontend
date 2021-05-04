require('dotenv').config();
const url = process.env.REACT_APP_API_URL
const axios = require('axios').default


export const createNewProduct = (credentials) => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().product.loading = true
      const newProduct = await axios.post(`${url}/api/v1/product`, credentials, {
        withCredentials: false
      })
      loading = getState().product.loading = false
      dispatch({ type: 'CREATED_PRODUCT_SUCCESS', product: newProduct, loading })
    }
    catch (error) {
      dispatch({ type: 'CREATED_PRODUCT_FAILURE', error })
    }
  }
}

export const getAllProducts = () => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().product.loading = true
      const getAllProducts = await axios.get(`${url}/api/v1/products`, { withCredentials: false })
       loading = getState().product.loading = false
      // console.log(getCategories.data.getCategories)
      dispatch({
        type: 'GET_ALL_PRODUCTS_SUCCESS',
        products: getAllProducts.data.getAllProducts,
        loading
      })
    }
    catch (error) {
      dispatch({ type: 'GET_ALL_PRODUCTS_FAILURE', error })
    }
  }
}
export const getOneProduct = (productId) => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().product.loading = true
      const getOneProduct = await axios.get(`${url}/api/v1/products/${productId}`, { withCredentials: false })
      loading = getState().product.loading = false
      // console.log(getOneProduct.data.getOneProduct)
      dispatch({
        type: 'GET_ONE_PRODUCTS_SUCCESS',
        product: getOneProduct.data.getOneProduct,
        loading
      })
    }
    catch (error) {
      dispatch({ type: 'GET_ONE_PRODUCTS_FAILURE', error })
    }
  }
}

export const getProductsByCategory = (categoryId) => {
  return async (dispatch, getState) => {
    try {
      const getProductsByCategory = await axios.get(`${url}/api/v1/category/${categoryId}`, { withCredentials: false })
      let loading = getState().product.loading = false
      // console.log(getProductsByCategory.data.getProductsByCategory)
      dispatch({
        type: 'GET_PRODUCTS_BY_CATEGORY_SUCCESS',
        products: getProductsByCategory.data.getProductsByCategory,
        loading
      })
    }
    catch (error) {
      dispatch({ type: 'GET_PRODUCTS_BY_CATEGORY_FAILURE', error })
    }
  }
}

export const updateAProduct = (credentials, productId) => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().product.loading = true;
      const updateAProduct = await axios.patch(`${url}/api/v1/product/${productId}`, credentials, { withCredentials: false })
      const getOneProduct = await axios.get(`${url}/api/v1/products/${productId}`)
      loading = getState().product.loading = false
      dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', product: getOneProduct.data.getOneProduct, loading })
    }
    catch (error) {
      dispatch({ type: 'UPDATE_PRODUCT_FAILURE', error })
    }
  }
}

export const deleteAProduct = (productId) => {
  return async (dispatch, getState) => {
    try {
      let loading = getState().product.loading = true;
      const deleteAProduct = await axios.delete(`${url}/api/v1/product/${productId}`, { withCredentials: false })
      loading = getState().product.loading = false
      // this.props.history.push('/')
      dispatch({ type: 'DELETE_UPDATED_PRODUCT_SUCCESS', product: deleteAProduct.data.response, loading })
    }
    catch (error) {
      dispatch({ type: 'DELETE_PRODUCT_FAILURE', error })
    }
  }
}