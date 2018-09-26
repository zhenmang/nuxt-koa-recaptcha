<template lang='pug'>
div.register-container
  c-input(:inputs='inputs' ref='inputs')
  router-link.own-account(to='Login') 已有账号，去登陆
  button.register(@click='regist') 同意用户协议并注册
  p.agree-tip(v-show='selectTip') {{selectTip}}
  div.agree-protocol
    span.agree(@click='toggleSelect' :style='{backgroundImage: "url(" + require("~/assets/register/" + select + ".png") + ")"}')
    router-link.user-protocol(to='/UserProtocol') 用户协议
</template>

<script>
import CInput from '~/components/CInput'
import { mapActions } from 'vuex'
export default {
  head () {
    return {
      title: this.title
    }
  },
  components: {
    CInput
  },
  data () {
    return {
      selectTip: '',
      title: '注册',
      select: 'false',
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

<style lang='stylus' scoped>
.register-container
  position fixed
  left 0
  right 0
  top 50%
  transform translateY(-50%)
  padding 0 2.5rem
  .own-account
    font-family: 'PingFangSC-Regular';
    font-size: .875rem;
    color: #DADCE6;
    margin-top .625rem
  .register
    margin-top 2rem
    width 100%
    height 2.625rem
    background: #DADCE6;
    border-radius: 2px;
    line-height 2.625rem
    font-family: PingFangSC-Regular;
    font-size: .875rem;
    color: #FFFFFF;
    font-weight normal
    outline none
  .agree-tip
    font-size 0.5rem
    color red
  .agree-protocol
    margin-top 1.0625rem
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
</style>

