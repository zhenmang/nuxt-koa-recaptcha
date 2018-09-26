export default function (Vue) {
  Vue.directive('focus', {
    bind (el, binding, vnode, oldVnode) {},
    inserted (el, binding, vnode, oldVnode) {
      el.focus()
    },
    update (el, binding, vnode, oldVnode) {},
    componentUpdated (el, binding, vnode, oldVnode) {},
    unbind (el, binding, vnode, oldVnode) {}
  })
  Vue.directive('date', {
    bind (el, binding, vnode, oldVnode) {
      const timestamp = binding.value
      function lessThanTen (timeUnit) {
        timeUnit = timeUnit < 10 ? ('0' + timeUnit) : timeUnit
        return timeUnit
      }
      const standardDate = new Date(timestamp)
      const year = standardDate.getFullYear()
      const month = lessThanTen(standardDate.getMonth() + 1)
      const date = lessThanTen(standardDate.getDate())
      const hour = lessThanTen(standardDate.getHours())
      const minute = lessThanTen(standardDate.getMinutes())
      const second = lessThanTen(standardDate.getSeconds())
      el.innerHTML = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    },
    inserted (el, binding, vnode, oldVnode) {},
    update (el, binding, vnode, oldVnode) {},
    componentUpdated (el, binding, vnode, oldVnode) {},
    unbind (el, binding, vnode, oldVnode) {}
  })
}
