import reformProto from './reformProto'
import accessors from './accessors'
import remLayout from './remLayout'
import directive from './directive'
import Vue from 'vue'
const base = {}
base.install = function (Vue, options) {
  Vue.prototype = Object.assign(Vue.prototype, reformProto)
  accessors(Vue.prototype)
  remLayout()
  directive(Vue)
}
Vue.use(base)
