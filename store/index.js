import * as actions from './actions'
import * as mutations from './mutations'
import state from './state'
import * as getters from './getters'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = () => new Vuex.Store({
  actions,
  mutations,
  getters,
  state
})

if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(['./mutations', './actions'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const newMutations = require('./mutations').default
    const newActions = require('./actions').default
    // 加载新模块
    store.hotUpdate({
      mutations: newMutations,
      actions: newActions
    })
  })
}
export default store
