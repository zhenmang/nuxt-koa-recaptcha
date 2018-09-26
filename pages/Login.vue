<template lang='pug'>
div.login-container
  c-input(:inputs='inputs' ref='inputs')
  p.forget-password
    router-link.forget(to='ForgetPassword') 忘记密码
    router-link.register(to='Register') 注册
  button.login(@click='log') 登陆
  p.login-tip(v-show='loginTip') {{loginTip}}
</template>

<script>
import CInput from '~/components/CInput'
import { mapActions } from 'vuex'
export default {
  head () {
    return {
      title: '登陆'
    }
  },
  components: {
    CInput
  },
  data () {
    return {
      loginTip: '',
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
    ...mapActions(['login']),
    async log () {
      let { email, password } = this.allInput
      let { emailTip, passwordTip } = this.$refs.inputs.blurTip
      this.loginTip = !email ? '请输入邮箱' : !password ? '请输入密码' : emailTip ? emailTip : passwordTip ? passwordTip : ''
      if (this.loginTip) {
        return
      }
      let { code, data, message } = await this.login({
        email: this.allInput.email,
        password: this.allInput.password
      })
      if (code === 0) {
        this.setCookie('X-USER-TOKEN', data.token)
        this.$router.push('/Game')
      } else {
        console.log(message)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.login-container
  position fixed
  left 0
  right 0
  top 50%
  transform translateY(-50%)
  box-sizing border-box
  padding 0 2.5rem
  .forget-password 
    margin-top .875rem
    font-family: PingFangSC-Regular;
    font-size: .875rem;
    display flex
    flex-direction row
    justify-content space-between
    .forget, .register
      color: #DADCE6;
  .login
    margin-top 2rem
    width 100%
    height 2.625rem
    background: #DADCE6;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 1.125rem;
    color: #FFFFFF;
    outline none
    border none
  .login-tip
    font-size 0.5rem
    color red
</style>

