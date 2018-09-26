<template lang='pug'>
  ul.input-ul
    li.input-li(v-for='(v, i) in inputs' :key='i')
      div.input-div(:style='{backgroundImage: "url(" + require("~/assets/icon/" + v.icon + ".png") + ")"}')
        input(:placeholder='v.placeholder' v-model='allInput[v.index]' @blur='blurHandle(v.index, v.placeholder)')
        div.verify(v-if='v.index==="verifyCode"' @click='sendVerify') 发送验证码
      p.input-tip(v-show='blurTip[v.index + "Tip"]') {{blurTip[v.index + "Tip"]}}
    //- div.static(v-for='(v, i) in inputs' :style="{backgroundImage: 'url(/icon/' + v.icon + '.png)'}" :key='i')
    //-   input(:placeholder='v.placeholder')
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    inputs: {
      type: Array,
      default () {
        return [  
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
    }
  },
  data () {
    return {
      blurTip: {
        emailTip: '',
        passwordTip: '',
        againPasswordTip: '',
        verifyCodeTip: ''
      },
      allInput: {
        email: '',
        password: '',
        againPassword: '',
        verifyCode: ''
      }
    }
  },
  methods: {
    ...mapActions(['sendVerifyCode']),
    async sendVerify () {
      let { name } = this.$route
      let { emailTip, passwordTip, againPasswordTip, verifyCodeTip } = this.blurTip
      if (emailTip) {
        return
      }
      let { code, data } = await this.sendVerifyCode({email: this.allInput.email})
      if (code !== 0) {
        console.log(data.message)
      }
    },
    blurHandle (index, placeholder) {
      let { email, password, againPassword, verifyCode } = this.allInput
      if (!this.allInput[index]) {
        return this.blurTip[index + 'Tip'] = placeholder + '不得为空'
      }
      switch (index) {
        case 'email':
          this.blurTip.emailTip = email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.length < 3 ? '请正确输入邮箱' : ''
          break
        case 'password':
          this.blurTip.passwordTip = /^\w{6,10}$/.test(password) && /\d/.test(password) && /[A-z]/.test(password) ? '' : '密码由数字/字母/下划线组成，6-10位'
          break
        case 'againPassword':
          this.blurTip.againPasswordTip = againPassword === password ? '' : '两次密码不一致'
          break
        case 'verifyCode':
          this.blurTip.verifyCodeTip = /^\w+$/.test(verifyCode) ? '' : '验证码格式不对'
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
.input-ul
  .input-li
    position relative
    margin-top 0.5rem
    padding .6rem 0 .2rem 0
    border-bottom 0.5px solid #DADCE6
    box-sizing border-box
    .input-div
      box-sizing border-box
      width 100%
      padding-left 2rem
      background-size 1rem auto
      background-position 0 center
      position relative
      .verify
        position absolute
        right 0
        bottom 0
        line-height 1.875rem
        font-size .875rem
        font-family: 'PingFangSC-Regular';
        color: #C2C6DA;
      input
        display inline-block
        width 100%
        // background-color skyblue
        border none
        height 1.875rem
        line-height 1.875rem
        font-size .875rem
        font-family: 'PingFangSC-Semibold';
        color: #25265E;
        outline: none;
        &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
          font-family: 'PingFangSC-Regular';
          color: #DADCE6;
          font-size .875rem
        }
        &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          font-family: 'PingFangSC-Regular';
          color: #DADCE6;
          font-size .875rem
        }
        &::-moz-placeholder { /* Mozilla Firefox 19+ */
          font-family: 'PingFangSC-Regular';
          color: #DADCE6;
          font-size .875rem
        }
        &:-ms-input-placeholder { /* Internet Explorer 10-11 */
          font-family: 'PingFangSC-Regular';
          color: #DADCE6;
          font-size .875rem
        }
    .input-tip
      position absolute
      bottom -1rem
      font-size 0.5rem
      color red
</style>

