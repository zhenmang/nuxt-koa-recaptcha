import * as api from './api'
import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import http from 'http'
import https from 'https'

function finger (domain) {
  if (process.server) {
    return ''
  }
  function bin2hex (s) {
    let i, l, n
    let o = ''
    s += ''
    for (i = 0, l = s.length; i < l; i++) {
      n = s.charCodeAt(i)
        .toString(16)
      o += n.length < 2 ? '0' + n : n
    }
    return o
  }
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  let txt = domain
  ctx.textBaseline = 'top'
  ctx.font = "1rem ‘Arial'"
  ctx.textBaseline = 'tencent'
  ctx.fillStyle = '#f60'
  ctx.fillRect(125, 1, 62, 20)
  ctx.fillStyle = '#069'
  ctx.fillText(txt, 2, 15)
  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
  ctx.fillText(txt, 4, 17)
  let b64 = canvas.toDataURL().replace('data:image/png;base64,', '')
  let bin = atob(b64)
  let crc = bin2hex(bin.slice(-16, -12))
  return crc
}
const headers = {
  'X-USER-TOKEN': Cookies.get('X-USER-TOKEN') || '',
  'X-CLIENT-TIMESTAMP': (new Date()).getTime(),
  'X-DI': finger('http://www.luoyupu521.com') || '',
  'X-H5-Version': require('../package').version,
  'X-Requested-With': 'XMLHttpRequest'
}

const conf = {
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
  timeout: 15000,
  headers,
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  withCredentials: true,
  responseType: 'json'
}

const httpInstance = axios.create(conf)

httpInstance.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

httpInstance.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

const type = Object.prototype.toString

export default function post (url, data, config) {
  if (type.call(url) !== '[object String]') {
    throw new Error('first parameter must be a String')
  }
  if (arguments.length < 1) {
    throw new Error('post request one parameter at least')
  }
  return httpInstance.post(url, data, config)
}

export { headers }
