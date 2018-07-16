const tokenKey = 'UserInfo'

export function getToken() {
  return JSON.parse(localStorage.getItem(tokenKey)) || ''
}

export function setToken(token) {
  return localStorage.setItem(tokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(tokenKey)
}
