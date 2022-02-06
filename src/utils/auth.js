import Cookies from 'js-cookie'

const TokenKey = 'X-token'
const userInfoKey = 'userInfo'
const menuKey = 'menu'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 1 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserInfo(userInfo) {
  return Cookies.set(userInfoKey, userInfo, { expires: 1 })
}

export function getUserInfo() {
  if (Cookies.get(userInfoKey) === undefined) {
    return
  }
  return JSON.parse(decodeURIComponent(Cookies.get(userInfoKey)))
}

export function removeUserInfo() {
  return Cookies.remove(userInfoKey)
}

export function setMenu(menu) {
  return Cookies.set(menuKey, menu, { expires: 1 })
}

export function getMenu() {
  if (Cookies.get(menuKey) === undefined) {
    return
  }
  return JSON.parse(decodeURIComponent(Cookies.get(menuKey)))
}

export function removeMenu() {
  return Cookies.remove(menuKey)
}

