export const saveNuxtToken = function (state, { nuxtToken }) {
  state.nuxtToken = nuxtToken
}
export const changeRaceTypeL = function (state, { raceTypeL }) {
  state.raceTypeL = raceTypeL
}
export const showTip = function (state, payload) {
  console.log('payload', payload)
  state.tipMsg = payload.msg
  console.log('state.tipMsg', state.tipMsg)
}
export const showLoading = function (state, payload) {
  if (!state.loadingBool.t.length) {
    state.loading = true
  }
  if (payload) {
    state.loadingBool.t.push(payload)
  } else {
    state.loadingBool.f.push(payload)
  }
  if (state.loadingBool.t.length === state.loadingBool.f.length) {
    state.loading = false
    state.loadingBool.t = []
    state.loadingBool.f = []
  }
}
