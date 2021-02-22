const axios = require('axios')
require('dotenv').config()
const url = process.env.REACT_APP_API_URL

export const saveToken = (token) => {
  localStorage.setItem('AUTH_TOKEN', token);
}

export const getToken = () => {
  (async () => {
    try {
      const getToken = await axios.get(`${url}/admin/parse-auth-cookie`)
      return getToken
    } catch (error) {
      return error
    }
  })()

}

