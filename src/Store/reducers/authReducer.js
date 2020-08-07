const initState = {
  authError: null,
  loading: true,
  payload: {},
  isLoggedIn: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      // console.log('signup success');
      return {
        ...state,
        payload: action.payload,
        loading: action.loading,
        authError: null
      };
    case 'SIGNUP_FAILURE':
      // console.log('signup failed')
      return {
        ...state,
        authError: action.error.message
      }

    case 'SIGNIN_SUCCESS':
      // console.log('signin success');
      return {
        ...state,
        isLoggedIn: true,
        payload: action.payload,
        loading: action.loading,
        authError: null
      };
    case 'SIGNIN_FAILURE':
      // console.log('signin failed')
      return {
        ...state,
        authError: action.error.response
      }
    case 'FORGOT_PASSWORD_SUCCESS':
      // console.log('forgot password success')
      return {
        ...state,
        payload: action.payload,
        loading: action.loading,
        authError: null
      }
    case 'FORGOT_PASSWORD_FAILURE':
      // console.log('Forgot password failed')
      return {
        ...state,
        authError: action.error.response
      }
    case 'RESET_PASSWORD_SUCCESS':
      // console.log('Reset password success')
      return {
        ...state,
        payload: action.payload,
        loading: action.loading,
        authError: null
      }
    case 'RESET_PASSWORD_FAILURE':
      // console.log('Reset password failed')
      return {
        ...state,
        authError: action.error.response
      }
    case 'SIGN_OUT_SUCCESS':
      // console.log('auth success');
      return {
        ...state,
        isLoggedIn: false,
        payload: action.payload,
        loading: action.loading,
        authError: null
      };
    case 'SIGN_OUT_FAILURE':
      // console.log('auth failed')
      return {
        ...state,
        authError: action.error.response
      }
    default:
      return state;
  }
};

export default authReducer
