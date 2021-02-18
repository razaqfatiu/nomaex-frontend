const initState = {
  authError: null,
  loading: false,
  payload: {},
  isLoggedIn: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        payload: action.payload,
        loading: action.loading,
        authError: null
      };
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        authError: action.error.response
      }

    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        payload: action.payload,
        loading: action.loading,
        authError: null
      };
    case 'SIGNIN_FAILURE':
      return {
        ...state,
        authError: action.error.response
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        payload: action.payload,
        loading: action.loading,
        authError: null
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        authError: action.error.response
      }
    case 'GET_USER_SUCCESS':
      return {
        ...state,
        payload: action.payload,
        loading: action.loading,
        authError: null
      };
    case 'GET_USER_FAILURE':
      return {
        ...state,
        authError: action.error.response
      }
    case 'REFRESH_LINK_SUCCESS':
      return {
        ...state,
        payload: action.payload,
        loading: action.loading,
        authError: null
      }
    case 'REFRESH_LINK_FAILURE':
      return {
        ...state,
        authError: action.error.response
      }
    case 'FORGOT_PASSWORD_SUCCESS':
      return {
        ...state,
        payload: action.payload,
        loading: action.loading,
        authError: null
      }
    case 'FORGOT_PASSWORD_FAILURE':
      return {
        ...state,
        authError: action.error.response
      }
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        payload: action.payload,
        loading: action.loading,
        authError: null
      }
    case 'RESET_PASSWORD_FAILURE':
      return {
        ...state,
        authError: action.error.response
      }
    case 'ACCOUNT_ACTIVATION_SUCCESS':
      return {
        ...state,
        payload: action.payload,
        loading: action.loading,
        authError: null
      }
    case 'ACCOUNT_ACTIVATION_FAILURE':
      return {
        ...state,
        authError: action.error.response
      }
    case 'SIGN_OUT_SUCCESS':
      return {
        ...state,
        isLoggedIn: false,
        payload: action.payload,
        loading: action.loading,
        authError: null
      };
    case 'SIGN_OUT_FAILURE':
      return {
        ...state,
        authError: action.error.response
      }
    default:
      return state;
  }
};

export default authReducer
