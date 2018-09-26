export default function () {
  if (process.browser) {
    const win = window
    const doc = win.document
    const docEl = doc.documentElement
    let remStyle = document.createElement('style')
    remStyle.type = 'text/css'
    docEl.firstElementChild && docEl.firstElementChild.appendChild(remStyle)
    let tid
    let width
    function refreshRem () {
      width = /Mobi/.test(navigator.userAgent) ? (docEl.getBoundingClientRect().width) : (docEl.clientWidth || doc.body.clientWidth)
      let rem = width / 375 * 16
      remStyle.innerText = 'html{font-size:' + rem + 'px;}'
    }
    refreshRem()
    win.addEventListener ? (win.addEventListener('resize', function () {
      win.clearTimeout(tid)
      tid = win.setTimeout(refreshRem, 300)
    }, false)) : win.onresize = function () {
      win.clearTimeout(tid)
      tid = win.setTimeout(refreshRem, 300)
    }
  }
}
