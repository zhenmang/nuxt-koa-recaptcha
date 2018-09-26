<template lang='pug'>
div.invitation-container
  div.text
    div.feel 拥有1000个BTC是什么感觉？
    div.depreciation
      p
        i 熊市
        span 行情下，
      p 只能眼睁睁看着手机里的币越来越不值钱？
    div.plan
      p
        i 百万富翁
        span 计划已经拉开帷幕，
      p 你的朋友已经上车了，
      i 你还在等什么？
    div.chance
      p
        span 现在注册即有机会赢得
        i 1000BTC
        span ，
      p
        span 更有ETH、USDT等多种
        i 奖品
        span 等着你!
  c-input(:inputs='inputs' ref='inputs')
  button.register(@click='regist') 注册
  p.selet-tip(v-show='selectTip') {{selectTip}}
  div.agree-protocol
    span.agree(@click='toggleSelect' :style='{backgroundImage: "url(" + require("~/assets/invite/" + select + ".png") + ")"}')
    router-link.user-protocol(to='/UserProtocol') 用户协议
</template>

<script>
import CInput from '~/components/CInput'
import { mapActions } from 'vuex'
export default {
  middleware: 'auth',
  components: {
    CInput
  },
  data () {
    return {
      select: 'false',
      selectTip: '',
      inputs: [
        {
          index:'email',
          icon: 'email',
          placeholder: '邮箱'
        },
        {
          index: 'password',
          icon: 'password',
          placeholder: '密码'
        },
        {
          index: 'againPassword',
          icon: 'password',
          placeholder: '再次输入密码'
        },
        {
          index: 'verifyCode',
          icon: 'verify',
          placeholder: '验证码'
        }
      ]
    }
  },
  computed: {
    allInput () {
      return this.$refs.inputs.allInput
    }
  },
  methods: {
    ...mapActions(['register']),
    toggleSelect () {
      this.select = this.select === 'true' ? 'false' : 'true'
    },
    async regist () {
      // 1.各项提示为空；
      // 注册：
      // blurTip: {
      //   emailTip: '',
      //   passwordTip: '',
      //   againPasswordTip: '',
      //   verifyTip: ''
      // },
      // 登陆 ：
      // blurTip: {
      //   emailTip: '',
      //   passwordTip: '',
      // },
      // 修改密码:
      // blurTip: {
      //   emailTip: '',
      //   passwordTip: '',
      //   againPasswordTip: '',
      //   verifyTip: ''
      // },
      // 2.同意为‘true’
      let { email, password, againPassword, verifyCode } = this.allInput
      console.log('email', email)
      let { emailTip, passwordTip, againPasswordTip, verifyCodeTip } = this.$refs.inputs.blurTip
      this.selectTip = !email ? '请填写邮箱' : !password ? '请填写密码' : !againPassword ? '请再次输入密码' : !verifyCode ? '请输入验证码' : emailTip ? emailTip :  passwordTip ? passwordTip : againPasswordTip ? againPasswordTip : verifyCodeTip ? verifyCodeTip : this.select === 'false' ? '请同意协议' : ''
      if (this.selectTip) {
        return
      }
      let { code, data, message } = await this.register({
        ...this.allInput,
        code: this.allInput.verifyCode,
        inviteCode: this.$route.query.inviteCode || ''
      })
      if (code === 1001) {
        console.log(message)
      } else if (code === 0) {
        // "user_login_token_prefix_8cd7d4d0-02f0-40a0-aef7-13761a998c79"
        this.setCookie('X-USER-TOKEN', data.token)
        this.$router.push('/Game')
      }
    }
  }
}
</script>

<style lang='stylus'>
.invitation-container
  oveflow auto
  position fixed
  left: 0
  right 0
  top 0
  bottom 0
  background-image url('~/assets/invite/invite_bg.png')
  background-size 100% 100%
  padding 0 1.875rem
  font-family: PingFangSC-Semibold;
  font-size: 1rem;
  color: #25265E;
  text-align: center;
  line-height: 1.625rem;
  width 100%
  box-sizing border-box
  .text
    padding 0.1rem
    margin 2.5rem 0 .875rem 0
    opacity: 0.8;
    background: #FFFFFF;
    .feel, .depreciation, .plan, .chance
      margin 1rem 0
  i 
    font-style normal
    color #D33A52
  .input-li
    background-color #ffffff
    margin-bottom 0.5rem
    .input-div
      background-position 0.5rem center !important
  .verify
    right 0.5rem !important
    background: #FFFFFF;
    border-radius: 1.25rem;
    border 1px solid #eee
    padding 0.1rem
  .register
    margin-top 1.25rem
    width 100%
    background: #DADCE6;
    border-radius: 2px;
    height 2.625rem
    font-family: PingFangSC-Regular;
    font-size: .875rem;
    color: #FFFFFF;
    outline none 
    border none
  .agree-protocol
    text-align left
    // margin-top 0.5rem
    font-family: PingFangSC-Regular;
    font-size: .75rem;
    color: #8A8FAB;
    .agree
      vertical-align middle
      display inline-block
      width 1.125rem
      height 1.125rem
      background-repeat no-repeat
      background-position center center
      background-size 100% 100%
    .user-protocol
      vertical-align middle
      margin-left 0.5rem
      color #fff
  .input-tip 
    bottom 0 !important
    right 0
  .selet-tip
    text-align left
    color skyblue
    font-size 0.5rem 
</style>
