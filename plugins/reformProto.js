import Cookies from 'js-cookie'
export default {
  // global WebViewJavascriptBridge
  // setupWebViewJavascriptBridge (callback) {
  //   if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge) }
  //   if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
  //   window.WVJBCallbacks = [callback]
  //   let WVJBIframe = document.createElement('iframe')
  //   WVJBIframe.style.display = 'none'
  //   WVJBIframe.src = 'https://__bridge_loaded__'
  //   document.documentElement.appendChild(WVJBIframe)
  //   setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
  // },
  // usage
  // setupWebViewJavascriptBridge(function (bridge) {
  //   bridge.registerHandler('JavascriptHandler_NavheadCustom', function (data, responseCallback) {
  //     var responseData = {'HideNav': '0', 'ShowBtn': '0', 'rightBtn': '1', 'btnTitle': '下载币加加', 'data': {'ArticleType': '5', 'ArticleHref': 'iHuoQiuOther◎itms-apps://itunes.apple.com/gb/app/bi-jia-jia/id1395192920?mt=8'}}
  //     responseCallback(responseData)
  //   })

  //   var callbackButton1 = document.getElementById('join_in')
  //   callbackButton1.onclick = function (r) {
  //     r.preventDefault()
  //     bridge.callHandler('ObjcCallback_ToastMsg', {'message': '请点击右上角参加活动'}, function (response) {
  //     })
  //   }
  // })
  handleDownLoadAll () {
    const ua = navigator.userAgent.toLowerCase()
    // if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
    //   location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=coinread.info'
    //   // location.href = 'https://fir.im/bplusandroid'
    // } else {
    //   if (ua.match(/(phone|pad|pod|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|webos|symbian|windows phone)/i)) {
    //     location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=coinread.info'
    //     // location.href = 'https://fir.im/bplusplus'
    //   }
    //   if (ua.match(/(iphone|ipod|ios|ipad)/i)) {
    //     location.href = 'https://itunes.apple.com/cn/app/%E5%B8%81%E5%8A%A0%E5%8A%A0/id1395192920?mt=8'
    //     // location.href = 'https://fir.im/bplusplus'
    //   } else {
    //     this.$router.replace('/HomePage')
    //   }
    // }
    if ((/(iphone|ipod|ios|ipad)/i).test(ua)) {
      location.href = 'https://itunes.apple.com/cn/app/%E5%B8%81%E5%8A%A0%E5%8A%A0/id1395192920?mt=8'
    } else if ((/android/i).test(ua)) {
      location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=coinread.info'
    }
  },
  cutUrlStr (urlChild, location) {
    let sub = location[urlChild]
    let child = decodeURIComponent(sub)
    if (child.indexOf('?') === -1) {
      return
    }
    let childArr = child.split('?')
    let length = childArr.length
    if (childArr[length - 1][childArr[length - 1]['length'] - 1] === '/') {
      childArr[length - 1] = childArr[length - 1].slice(0, -1)
    }
    let result = childArr.slice(1).join('&')
    return result
  },
  parseUrl () {
    const {decodeURIComponent, location} = window
    let urlComponent = decodeURIComponent(window.location.href)
    const queryObj = {}
    if (urlComponent.indexOf('?') === -1) {
      return queryObj
    }
    let queryHashStr = this.cutUrlStr('hash', location)
    let querySearchStr = this.cutUrlStr('search', location)
    let queryStr
    if (queryHashStr && querySearchStr) {
      queryStr = queryHashStr + '&' + querySearchStr
    } else {
      queryStr = queryHashStr || querySearchStr
    }
    let kVArr = queryStr.split('&')
    let i
    for (i = 0; i < kVArr.length; i++) {
      let cutItemArr = kVArr[i].split('=')
      queryObj[cutItemArr[0]] = cutItemArr[1]
    }
    return queryObj
  },
  formatDate (timestamp, ms) {
    function lessThanTen (time) {
      time = time < 10 ? ('0' + time) : time
      return time
    }
    const standardDate = new Date(timestamp)
    const year = standardDate.getFullYear()
    const month = lessThanTen(standardDate.getMonth() + 1)
    const date = lessThanTen(standardDate.getDate())
    const hour = lessThanTen(standardDate.getHours())
    const minute = lessThanTen(standardDate.getMinutes())
    const second = lessThanTen(standardDate.getSeconds())
    let milliSeconds = standardDate.getMilliseconds()
    if (milliSeconds < 10) {
      milliSeconds = '00' + milliSeconds
    } else if (milliSeconds < 100) {
      milliSeconds = '0' + milliSeconds
    }
    const r = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    return ms ? (r + '  ' + milliSeconds) : r
  },
  tip (msg) {
    console.log(msg)
    msg && this.$store.commit('showTip', { msg })
  },
  getCookie (k) {
    return Cookies.get(k)
  },
  setCookie (k, v, a) {
    return Cookies.set(k, v, a)
  },
  removeCookie (k, a) {
    return Cookies.remove(k, a)
  }
}
