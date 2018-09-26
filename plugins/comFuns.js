function fetchFromUA (key) {
  const ua = navigator.userAgent.toLowerCase()
  // const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Mobile/14C89X-PLATFORM:2;X-CLIENT-TIMESTAMP:1529032430.107238;X-PRODUCT:Simulator;X-CHANNEL:100;X-USER-TOKEN:ce5ba415-2d00-45f6-8083-3d4de2778bc7;X-APP-VERSION:1.0.0;X-OS:10.2;X-DI:5BE84163-8631-437C-8195-E8E0200864A9;X-MANUFACTURE:Apple;'
  let regexp = new RegExp(key + ':(.*?);', 'i')
  let value = ua.match(regexp)
  value = (value && value.length > 1) ? value[1] : ''
  return value
}

function finger (domain) {
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
  let xid = fetchFromUA('X-DI')
  return xid || crc
}

export default function header () {
  let version = fetchFromUA('X-APP-VERSION')
  let token = fetchFromUA('X-USER-TOKEN')
  let timestamp = (new Date()).getTime()
  let xdi = fetchFromUA('X-DI')
  return {
    'X-APP-VERSION': version || '',
    'X-CLIENT-TIMESTAMP': timestamp,
    'X-USER-TOKEN': token || '',
    'X-USER-TOKEN': token || 'f67a6ff7-1ec5-420f-8412-69965f73b124',
    // 'X-USER-TOKEN': token || 'aserv_userSession_f574bda9-665c-453f-aa05-07fce0a7002c',
    'X-DI': xdi || finger('http://www.luoyupu521.com')
  }
}

export { fetchFromUA }
