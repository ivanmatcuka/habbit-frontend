const AUTH_KEY = 'auth_details'

export default {
  getAccessToken(): null | string {
    return localStorage.getItem(AUTH_KEY)
  },

  removeAccessToken() {
    localStorage.removeItem(AUTH_KEY)
  },

  setAccessToken(accessToken: string) {
    localStorage.setItem(AUTH_KEY, accessToken)
  },
}
