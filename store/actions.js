import post, { headers } from './post'
import * as api from './api'
import CircularJson from 'circular-json'

function nuxtHeaders (headers, { nuxtToken }) {
  return {
    ...headers,
    'X-USER-TOKEN': nuxtToken
  }
}
export const nuxtServerInit = function ({ commit }, { req, params }) {
  // console.log('req', CircularJson.stringify(req))
  // if (req.session.user) {
  //   commit('user', req.session.user)
  // }
  let cookieObj = req.headers.cookie && req.headers.cookie.split(';').reduce((p, c, i, a) => {let r = c.split('='); p[r[0]] = r[1]; return p}, {})
  commit('saveNuxtToken', {
    nuxtToken: cookieObj && cookieObj[' X-USER-TOKEN'] ? cookieObj[' X-USER-TOKEN'] : ''
  })
}
export const register = function ({commit}, params)  {
  return post(api.register, params)
}
export const sendVerifyCode = function ({commit}, params) {
  return post(api.sendVerifyCode, params)
}
export const login = function ({commit}, params) {
  return post(api.login, params)
}
export const changePassword = function ({commit}, params) {
  return post(api.changePassword , params)
}
export const raceCoinTypeList = function ({commit, state}) {
  return post(api.raceCoinTypeList, {}, {
    headers: nuxtHeaders(headers, state)
  })
}
export const raceList = function ({commit, state}, params) {
  return post(api.raceList, params, {
    headers: nuxtHeaders(headers, state)
  })
}
export const touZhu = function ({commit, state}, params) {
  return post(api.touZhu, params)
}
export const userInfo = function ({commit, state}, params) {
  return post(api.userInfo)
}
export const telegramRegister = function ({commit, state, dispatch}, params) {
  return post(api.telegramRegister, params)
}
export const telegramUserInfo = function ({commit, state, dispatch}, params) {
  return post(api.telegramUserInfo, params)
}