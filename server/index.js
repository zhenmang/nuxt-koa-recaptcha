
const Koa = require('koa')
const consola = require('consola')
const bodyparser = require('koa-bodyparser')
const axios = require('axios')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(bodyparser())

  app.use(async (ctx, next) => {
    if (ctx.request.method ==='POST' && ctx.request.url === '/googleManMachine/register') {
      console.log('recaptchaToken', ctx.request.body.recaptchaToken)
      await axios.get('https://www.google.com/recaptcha/api/siteverify', {
        params: {
          secret: '6Le6t3EUAAAAAAQj6tQVQEyMIupUsVfGv2p8Ldew',
          response: ctx.request.body.recaptchaToken
        }
      }, {
        timeout: 10000
      })
      .then(async ({data}) => {
        console.log('responseData', data)
        ctx.status = 200
        if (data.success) {
          let cookieObj = req.headers.cookie && req.headers.cookie.split(';').reduce((p, c, i, a) => {let r = c.split('='); p[r[0]] = r[1]; return p}, {})
          let { code, message, data } = await axios.post('/millionaire/user/register', {
            ...ctx.request.body
          }, {
            headers: {
              'X-USER-TOKEN': (cookieObj && cookieObj['X-USER-TOKEN']) ? cookieObj['X-USER-TOKEN'] : (cookieObj && cookieObj['x-user-token']) ? cookieObj['x-user-token'] : ''
            }
          })
          if (code === 0) {
            ctx.body = {
              code: 0,
              message: '验证通过',
              data: null
            }
          } else {
            ctx.body = {
              code,
              message,
              data
            }
          }
          console.log('验证通过')
        } else {
          ctx.body = {
            code: -1,
            message: '验证失败',
            data: null
          }
        }
      })
      .catch((error) => {
        console.log('验证失败')
        ctx.status = 200
        ctx.body = {
          code: -2,
          message: '验证链接失败',
          data: null
        }
      })
      return
    }
    // console.log('request.headers', ctx.request.headers)
    // console.log('body', ctx.request.body)
    await next()
  })

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
