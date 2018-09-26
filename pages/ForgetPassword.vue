<template lang='pug'>
div.forget-password-container
  c-input(:inputs='inputs' ref='inputs')
  p.login
    router-link.link(to='Login') 去登陆
  button.change-password(@click='change') 修改密码
  p.change-tip(v-show='changeTip') {{changeTip}}
</template>

<script>
import CInput from '~/components/CInput'
import { mapActions } from 'vuex'
export default {
  head () {
    return {
      title: '忘记密码'
    }
  },
  components: {
    CInput
  },
  data () {
    return {
      changeTip: '',
      inputs: [
        {
          index:'email',
          icon: 'email',
          placeholder: '邮箱'
        },
        {
          index: 'verifyCode',
          icon: 'verify',
          placeholder: '验证码'
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
    ...mapActions(['changePassword']),
    async change () {
      let { email, password, againPassword, verifyCode } = this.allInput
      let { emailTip, passwordTip, againPasswordTip, verifyCodeTip } = this.$refs.inputs.blurTip
      this.changeTip = !email ? '请输入邮箱' : !password ? '请输入密码' : !againPassword ? '请输入重复密码' : !verifyCode ? '请输入验证码' : emailTip ? emailTip : passwordTip ? passwordTip : againPasswordTip ? againPasswordTip : verifyCodeTip ? verifyCodeTip : ''
      console.log('this.changeTip', this.changeTip)
      if (!this.changeTip) {
        return
      }
      let { code, data, message } = await this.changePassword({
        code: allInput.verifyCode,
        ...allInput
      })
      if (code !== 0) {
        console.log(message)
      } else {
        this.setCookie('X-USER-TOKEN', data.token)
        this.$router.push('/Game')
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.forget-password-container
  padding 0 2.5rem
  position fixed
  left 0
  right 0
  top 50%
  transform translateY(-50%)
  .login
    margin-top .875rem
    .link
      color: #DADCE6;
      font-family: PingFangSC-Regular;
      font-size: .875rem;
  .change-password
    width 100%
    height 2.625rem
    background: #DADCE6;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: .875rem;
    color: #FFFFFF;
    margin-top 2rem
    outline none
    border  none
  .change-tip
    font-size 0.5rem
    color red
</style>
