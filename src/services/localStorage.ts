const AUTH_KEY = 'auth_details'

export default {
  getAccessToken(): string | null {
    return localStorage.getItem(AUTH_KEY)
  },

  setAccessToken(accessToken: string) {
    localStorage.setItem(AUTH_KEY, accessToken)
  },

  removeAccessToken() {
    localStorage.removeItem(AUTH_KEY)
  },
}
