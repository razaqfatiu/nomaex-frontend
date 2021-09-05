const initState = {
  categoryError: null,
  categories: [],
  loading: false
}

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.categories,
        loading: action.loading,
        categoryError: null
      }

    case 'GET_CATEGORIES_FAILURE':
      return {
        ...state,
        categoryError: action.error.response
      }
    default:
      return state;
  }

}

export default categoryReducer;