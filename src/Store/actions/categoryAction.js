const axios = require('axios').default
require('dotenv').config()
const url = process.env.REACT_APP_API_URL

export const getCategories = (catId) => {
  return async (dispatch, getState) => {
    try {
      const getCategories = await axios.get(`${url}/api/v1/categories`)
      let loading = getState().category.loading = false
      // console.log(getCategories.data.getCategories)
      dispatch({ type: 'GET_CATEGORIES_SUCCESS', categories: getCategories.data.getCategories, loading })
    }
    catch (error) {
      dispatch({ type: 'GET_CATEGORIES_FAILURE', error })
    }
  }
}