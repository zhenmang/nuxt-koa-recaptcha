import { fetchFromUA } from './comFuns'
export default function (prop) {
  if (process.browser) {
    Object.defineProperties(prop, {
      isApp: {
        get () {
          let platform = fetchFromUA('X-PLATFORM')
          if (platform && (platform === '0' || platform === '1')) {
            return true
          } else {
            return false
          }
        }
      },
      isMobile: {
        get () {
          return (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i).test(window.navigator.userAgent)
        }
      }
    })
  }
}
