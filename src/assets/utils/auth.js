const TokenKey = 'feifanToken'
const RememberKey = 'feifanRemember'

export function getToken (key, remember) {
  if (key) {
    return localStorage.getItem(RememberKey)
  } else {
    if (remember) {
      return localStorage.getItem(TokenKey)
    } else {
      return sessionStorage.getItem(TokenKey)
    }
  }
}

export function setToken (token, key, remember) {
  if (key) {
    return localStorage.setItem(RememberKey, JSON.stringify(token))
  } else {
    if (remember) {
      return localStorage.setItem(TokenKey, JSON.stringify(token))
    } else {
      return sessionStorage.setItem(TokenKey, JSON.stringify(token))
    }
  }
}

export function removeToken (key, remember) {
  if (key) {
    return localStorage.removeItem(RememberKey)
  } else {
    if (remember) {
      return localStorage.removeItem(TokenKey)
    } else {
      return sessionStorage.removeItem(TokenKey)
    }
  }
}
