const { loadAuthCred, saveAuthCred } = require("../../Store/localStorage");
const loadCred = loadAuthCred('user_auth_cred');
const currentTime = Math.floor(new Date().getTime() / 1000)

function CheckAuth() {
  this.isAuthenticated = false
  this.isAdministrator = false
  this.isTokenExpired = false
  this.isAuth = () => {
    if (loadCred !== undefined && loadCred.exp > currentTime) {
      return true
    }
    if (loadCred !== undefined && loadCred.exp < currentTime) {
      saveAuthCred('user_auth_cred', {})
    }
    return false
  }
  this.isAdmin = () => {
    if (this.isAuth() && loadCred.isAdministrator) return this.isAdministrator = true
    return this.isAdministrator
  }
  this.getSavedData = () => {
    if (loadCred !== {}) return loadCred
    return 'user is not signed in'
  }
}

const checkAuth = new CheckAuth()

export default checkAuth

