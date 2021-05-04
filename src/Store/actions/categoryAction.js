const axios = require('axios').default;
require('dotenv').config();
const url = process.env.REACT_APP_API_URL;

export const getCategories = () => {
  return async (dispatch, getState) => {
    try {
      let loading = (getState().category.loading = true);
      const getCategories = await axios.get(`${url}/api/v1/categories`, {
        withCredentials: false,
      });
      loading = getState().category.loading = false;
      dispatch({
        type: 'GET_CATEGORIES_SUCCESS',
        categories: getCategories.data.data,
        loading,
      });
    } catch (error) {
      dispatch({ type: 'GET_CATEGORIES_FAILURE', error });
    }
  };
};
