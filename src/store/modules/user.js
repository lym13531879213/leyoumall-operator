import { login, getInfo } from '@/api/user'
import * as roleAPI from '@/api/role/index'
import { getToken, setToken, removeToken, setUserInfo, removeUserInfo, getUserInfo, getMenu, setMenu, removeMenu } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {
      userId: '',
      name: '',
      avatar: ''
    },
    menu: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_ID: (state, userId) => {
    state.userInfo.userId = userId
  },
  SET_NAME: (state, name) => {
    state.userInfo.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.userInfo.avatar = avatar
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response)
        setToken(response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (getUserInfo() !== undefined) {
        const userInfo = getUserInfo()
        const { userId, username, headImg } = userInfo
        commit('SET_USER_ID', userId)
        commit('SET_NAME', username)
        commit('SET_AVATAR', headImg)
        resolve(userInfo)
      } else {
        getInfo().then(response => {
          const { userId, username, headImg } = response
          commit('SET_USER_ID', userId)
          commit('SET_NAME', username)
          commit('SET_AVATAR', headImg)
          // 将userInfo放到cookie
          setUserInfo(response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      }
    })
  },
  getMenu({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (getMenu() !== undefined) {
        const menu = getMenu()
        commit('SET_MENU', menu)
        resolve(menu)
      } else {
        roleAPI.getMenu().then(res => {
          const menu = [... new Set(res)]
          commit('SET_MENU')
          setMenu(menu)
          resolve(menu)
        }).catch(err => {
          console.log(err)
          reject()
        })
      }
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      removeUserInfo()
      removeMenu()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

