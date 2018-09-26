<template lang='pug'>
div.telegram-register-container
  div.bg-text
    p.special-token {{telegramRegisterContainer.bgText.specialToken}}
    p.pay-dividends {{telegramRegisterContainer.bgText.payDividends}}
    p.annual-profit {{telegramRegisterContainer.bgText.annualProfit}}
    p.dividend-principle {{telegramRegisterContainer.bgText.dividendPrinciple}}
  div.content
    div.onebet-logo
    div.text
      p.first {{telegramRegisterContainer.content.text.first}}
      p.second {{telegramRegisterContainer.content.text.second}}
      p.third {{telegramRegisterContainer.content.text.third}}
      p.fourth {{telegramRegisterContainer.content.text.fourth}}
      p.email
        input(:placeholder='telegramRegisterContainer.content.text.email.input.placeholder' v-model='email')
      div.verify-container
        div.input-verify
          input(:placeholder='telegramRegisterContainer.content.text.verifyContainer.inputVerify.input.placeholder' v-model='verifyCode')
        span.send-verify(@click='sendCode') {{sendVerify}}
  div.wallet-address
    input(:placeholder='telegramRegisterContainer.walletAddress.input.placeholder' v-model='walletAddress')
  vue-recaptcha(
    ref='recaptcha'
    @verify='onCaptchaVerified'
    @expired='onCaptchaExpired'
    sitekey='6Le6t3EUAAAAAPTpQFAcU1GXR3VC02puPDOttERN'
    :style='{marginTop: "2rem", width: "100%", display: "flex", flexDirection: "row", justifyContent: "center"}'
  )
  div.submit
    button(type='submit' @click='submit') {{telegramRegisterContainer.submit.button}}
  div.footer
    p.copyright {{telegramRegisterContainer.footer.copyright}}
    p.date {{new Date()}}
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import { mapState, mapActions } from 'vuex'
export default {
  head () {
    return {
      title: 'OneBet-加密货币交易平台',
      meta: [
        {
          hid: 'telegramRegisterDescription',
          name: 'description', content: '加密货币交易平台'
        },
        {
          hid: 'telegramRegisterKeywords',
          name: 'keywords', content:'onebet'
        }
      ],
      script: [
        {
          // src: ' https://www.google.com/recaptcha/api.js',
          src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit',
          async: true,
          defer: true,
          ssr: false
        }
      ]
    }
  },
  components: {
    VueRecaptcha
  },
  data () {
    return {
      select: 'false',
      recaptchaToken: '',
      email: '',
      verifyCode: '',
      walletAddress: '',
      disableSubmit: false,
      sendVerifyCountDown: null,
      countDownNumber: 60
    }
  },
  computed: {
    ...mapState(['telegramLanguage']),
    sendVerify () {
      return this.telegramLanguage === 'Chinese' ? '发送验证码' : 'Send verification code'
    },
    telegramRegisterContainer () {
      return this.telegramLanguage === 'Chinese' ?
      {
        bgText: {
          specialToken: '1dollar专属代币',
          payDividends: 'ONEBET持币分红',
          annualProfit: '年盈利高达1460万美金',
          dividendPrinciple: '分红规则：持有ONEBET／流通ONEBET *平台赢利总额'
        },
        content: {
          text: {
            first: 'ONEBET在1DOLLAR.BET平台上用于价格预测',
            second: '1ONEBET=$0.2',
            third: '1DOLLAR.BET用户数达到200,000时，',
            fourth: 'ONEBET即启动若干交易所上线交易程序',
            email: {
              input: {
                placeholder: '邮箱'
              }
            },
            verifyContainer: {
              inputVerify: {
                input: {
                  placeholder: '验证码'
                }
              }
            }
          }
        },
        walletAddress: {
          input: {
            placeholder: '请输入你的以太坊钱包地址'
          }
        },
        submit: {
          button: '提交'
        },
        footer: {
          copyright: 'OneBet.io@2018',
          date: '(中国标准时间)'
        }
      }
      :
      {
        bgText: {
          specialToken: 'Exclusive token of 1DOLLAR.BET',
          payDividends: 'Share profit by holding ONEBET',
          annualProfit: 'Annual profits are as high as $14.6 million',
          dividendPrinciple: 'Profit-sharing Rules: amount of ONEBET held / amount of ONEBET in circulation* total profits'       
        },
        content: {
          onebetLogo: {},
          text: {
            first: 'On the platform of 1DOLLAR.BET, ONEBET is used for predicating price',
            second: '1ONEBET=$0.2',
            third: 'ONEBET will list on exchanges once',
            fourth: '1DOLLAR.BET gets 200,000 community users',
            email: {
              input: {
                placeholder: 'Email'
              }
            },
            verifyContainer: {
              inputVerify: {
                input: {
                  placeholder: 'Verification Code'
                }
              }
            }
          }
        },
        walletAddress: {
          input: {
            placeholder: 'Please enter your ethereal wallet address'
          }
        },
        submit: {
          button: 'Submit'
        },
        footer: {
          copyright: 'OneBet.io@2018',
          date: '(China standard time)'
        }
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.sendVerifyCountDown)
    this.sendVerifyCountDown = null
    this.number = 60
    this.sendVerify = this.telegramLanguage === 'Chinese' ? '发送验证码' : 'Send verification code'
    this.disableSubmit = false
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(from.sendVerifyCountDown)
    from.sendVerifyCountDown = null
    fromis.number = 60
    from.sendVerify = this.telegramLanguage === 'Chinese' ? '发送验证码' : 'Send verification code'
    from.disableSubmit = false
    next()
  },
  methods: {
    ...mapActions(['telegramRegister', 'sendVerifyCode']),
    async onCaptchaVerified (recaptchaToken) {
      this.recaptchaToken = recaptchaToken
      this.$refs.recaptcha.reset()
    },
    sendCode () {
      let msg = this.email.indexOf('@') === -1 || this.email.indexOf('.') === -1 || this.email.length < 3 ? '请正确输入邮箱' : ''
      if (msg) {
        window.alert(msg)
        return
      }
      let { code, message, data } = this.sendVerifyCode({
        email: this.email
      })
      if (code === 0) {
        // console.log('验证码发送成功')
        this.sendVerifyCountDown = setInterval(() => {
          this.countDownNumber--
          if (this.countDownNumber < 0) {
            clearInterval(this.sendVerifyCountDown)
            this.countDownNumber = 60
            this.sendVerifyCountDown = null
            this.sendVerify = this.telegramLanguage === 'Chinese' ? '发送验证码' : 'Send verification code'
          }
          this.sendVerify = this.countDownNumber + 's'
        }, 1000)
      } else {
        let tipMsg = this.telegramLanguage === 'Chinese' ? '验证码发送失败' : 'Verification code sent failure'
        window.alert(tipMsg)
      }
    },
    onCaptchaExpired () {
      let tipMsg = this.telegramLanguage === 'Chinese' ? '请重新验证' : 'Please re verify'
      window.alert(tipMsg)
      this.$refs.recaptcha.reset()
    },
    manMachine () {
      this.select = this.select === 'false' ? 'true' : 'false'
    },
    async submit () {
      if (this.disableSubmit) {
        let disableMsg = this.telegramLanguage === 'Chinese' ? '请等待验证结果' : 'Please wait for validation results'
        window.alert(disableMsg)
        return
      }
      let { email, verifyCode, walletAddress, recaptchaToken } = this
      let inputMsg
      if (this.telegramLanguage === 'Chinese') {
        inputMsg = !email ? '请输入邮箱' : !verifyCode ? '请输入验证码' : !walletAddress ? '请输入钱包地址' : !recaptchaToken ? '请进行人机验证' : ''
      } else {
        inputMsg = !email ? 'Please input the emilAddress' : !verifyCode ? 'Please input verification code' : !walletAddress ? 'Please enter your wallet address' : !recaptchaToken ? 'Please perform man-machine verification' : ''
      }
      if (inputMsg) {
        window.alert(inputMsg)
        return
      }
      this.disableSubmit = true
      let { code, message, data } = await this.telegramRegister({
        recaptchaToken,
        email,
        code: verifyCode,
        password: '123qwe',
        realAddress: walletAddress,
        inviteCode: this.parseUrl().inviteCode || ''
      })
      this.disableSubmit = false
      if (code === 0) {
        this.$router.push('/TelegramInvite')
      } else {
        window.alert(message)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
div.telegram-register-container
  position relative
  width 100%
  padding 27.1875rem 0 1.875rem 0
  background-image url('~assets/telegram/top_bg.png')
  background-size 100% 27.1875rem
  background-position center top
  background-repeat no-repeat
  .bg-text
    font-family: PingFangSC-Regular;
    font-size: .875rem;
    color: #FFFFFF;
    text-align: center;
    text-shadow: 0 2px .25rem #7072A0;
    text-align center
    width 100%
    p
      width 100%
      position absolute
    p.special-token
      top 14.5rem
    p.pay-dividends
      top 18.125rem
    p.annual-profit
      top 20.5625rem
      font-family: PingFangSC-Semibold;
      font-size: 2rem;
      color: #FBC50E;
    p.dividend-principle
      top 24.0625rem
  div.content
    padding 2.5rem 3.75rem
    div.onebet-logo
      height 1.375rem
      background-image url('~assets/telegram/onebet_logo.png')
      background-size auto 1.375rem
      background-position center top
      background-repeat no-repeat
    div.text
      font-family: PingFangSC-Semibold;
      font-size: .75rem;
      color: #25265E;
      text-align: center;
      p.first
        line-height 5
      p.second
        font-family: PingFangSC-Semibold;
        font-size: 1rem;
        color: #130000;
        text-align: center;
        line-height: 1.0625rem;
      p.third
      p.fourth
        margin-bottom 1.75rem
      p.email
        margin-bottom 0.5rem
        width 100%
        box-sizing border-box
        border 01px solid #5A27F6;
        background-color: #FFFFFF;
        border-radius: 2px;
        padding 1px 1px 1px 1.5625rem
        background-size .8125rem .8125rem
        background-position .5rem center
        background-repeat no-repeat
        background-image url('~assets/telegram/email.png')
        input
          outline none
          border none
          height 1.875rem
          width 100%
          box-sizing border-box
          &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
            font-family: PingFangSC-Regular;
            font-size: .625rem;
            color: #DADCE6;
          }
          &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            font-family: PingFangSC-Regular;
            font-size: .625rem;
            color: #DADCE6;
          }
          &::-moz-placeholder { /* Mozilla Firefox 19+ */
            font-family: PingFangSC-Regular;
            font-size: .625rem;
            color: #DADCE6;
          }
          &:-ms-input-placeholder { /* Internet Explorer 10-11 */
            font-family: PingFangSC-Regular;
            font-size: .625rem;
            color: #DADCE6;
          }
      .verify-container
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        width 100%
        background-color #FFF
        .input-verify
          flex 1
          background-image url('~assets/telegram/verify.png')
          background-size .8125rem .8125rem
          background-position .5rem center
          background-repeat no-repeat
          border 01px solid #5A27F6;
          border-radius: 2px;
          margin-right .5625rem
          padding 1px 1px 1px 1.5625rem
          input
            width 100%
            outline none
            border none
            height 1.875rem
            box-sizing border-box
            &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
              font-family: PingFangSC-Regular;
              font-size: .625rem;
              color: #DADCE6;
            }
            &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              font-family: PingFangSC-Regular;
              font-size: .625rem;
              color: #DADCE6;
            }
            &::-moz-placeholder { /* Mozilla Firefox 19+ */
              font-family: PingFangSC-Regular;
              font-size: .625rem;
              color: #DADCE6;
            }
            &:-ms-input-placeholder { /* Internet Explorer 10-11 */
              font-family: PingFangSC-Regular;
              font-size: .625rem;
              color: #DADCE6;
            }
        span.send-verify
          width 5rem
          height 1.875rem
          background: #FFFFFF;
          border: 1px solid #5A27F6;
          border-radius: 1.25rem;
          font-family: PingFangSC-Regular;
          font-size: .625rem
          color: #C2C6DA;
          text-align center
          line-height 1.875rem
  div.wallet-address
    margin 0 1.875rem
    background: rgba(218,220,230,0.12);
    border: 1px solid #5A27F6;
    input
      width 100%
      height 1.875rem
      box-sizing border-box
      outline none
      border none
      &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        font-family: PingFangSC-Regular;
        font-size: .75rem;
        color: #C3C4CC;
        text-align: center;
      }
      &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        font-family: PingFangSC-Regular;
        font-size: .75rem;
        color: #C3C4CC;
        text-align: center;
      }
      &::-moz-placeholder { /* Mozilla Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: .75rem;
        color: #C3C4CC;
        text-align: center;
      }
      &:-ms-input-placeholder { /* Internet Explorer 10-11 */
        font-family: PingFangSC-Regular;
        font-size: .75rem;
        color: #C3C4CC;
        text-align: center;
      }
  div.Man-machine-verification
    margin-top .875rem
    display flex
    flex-direction row
    justify-content center
    align-items center
    height .875rem
    span.rectangle
      width .875rem
      height .875rem
      background-size .875rem .875rem
      background-position center center
      background-repeat no-repeat
      background-color #aaa
      margin-right .5rem
    span.verify
      font-family: PingFangSC-Regular;
      font-size: .625rem;
      color: #C3C4CC;
      text-align: center;
      line-height .875rem
  div.submit
    margin 1.625rem 0
    position relative
    height 1.875rem
    button
      outline none
      border none
      position absolute
      left 50%
      transform translateX(-50%)
      width 11.25rem
      height 1.875rem
      background: #5A27F6;
      border-radius: 2px;
      font-family: PingFangSC-Regular;
      font-size: .875rem;
      color: #FFFFFF;
      text-align: center;
  div.footer
    font-family: PingFangSC-Regular;
    font-size: .625rem;
    color: #8A8FAB;
    text-align: center;
    // p.copyright
    // p.date
</style>
