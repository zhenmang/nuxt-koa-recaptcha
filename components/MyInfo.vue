<template lang='pug'>
div.my-info-container
  div.portrait
    p.pic
      img(src='~/assets/icon/verify.png')
    p.nick-name {{userInfo.userName ? userInfo.userName : '--'}}
  div.contact
    div.email
      span.text 邮箱:
      input(:placeholder='userInfo.email ? userInfo.email : "--"' readonly=true)
    div.phone
      span.text 手机号:
      input(:placeholder='userInfo.phone ? userInfo.phone : "--"' readonly=true)
  ul.wallet-address
    li.item
      p.coin-name BTC地址：
      input(:placeholder='userInfo.address.btc' readonly=true)
      p.coin-name BTC地址：
      input(:placeholder='userInfo.address.eth' readonly=true)
      p.coin-name BTC地址：
      input(:placeholder='userInfo.address.usdt' readonly=true)
  div.reward
    p 邀请好友即可获得
    p 他1个月内消费的10%返佣奖励！
  div.invite-code
    div.code
      span 您的邀请码:
      input(:placeholder='userInfo.inviteCode' readonly=true)
    div.copy(@click='copyInviteCode(userInfo.inviteCode)') 复制邀请码
  div.customer-service
    p 微信客服：ssld234
    p QQ客服：123456789
  </template>
  
  <script>
  export default {
    async asyncData ({store, error, req}) {
      let { code, data, message } = await store.dispatch('userInfo')
      if (code === 0) {
        return {
          userInfo: data
        }
      } else {
        console.log(message)
      }
    },
    data () {
      return {
        userInfo: {
          userName: '张三',
          email: '123456@qq.com',
          phone: '18900237777',
          inviteCode: 'QEW123',
          address: {
            btc: {
              address:'0x743F67527FF4DD211528c7e7AE041888F70D1C700x743F6752',
              amount:'100'
            },
            eth: {
              address:'0x743F67527FF4DD211528c7e7AE041888F70D1C700x743F6752',
              amount:'200'
            },
            usdt: {
              address:'0x743F67527FF4DD211528c7e7AE041888F70D1C700x743F6752',
              amount:'300'
            }
          }
        }
      }
    },
    methods: {
      copyInviteCode (value) {
        const input = document.createElement('input')
        input.setAttribute('value', this.userInfo.inviteCode)
        document.body.appendChild(input)
        input.focus()
        input.setSelectionRange(0, 9999)
        try {
          if (document.execCommand('copy')) {
            document.execCommand('copy')
          } else {
            console.log('不支持copy')
          }
        } catch (e) {
          console.log(e)
        }
        document.body.removeChild(input)
      }
    }
  }
  </script>

<style lang='stylus' scoped>
.my-info-container
  width 100%
  box-sizing border-box
  padding 0 1.75rem
  .portrait
    padding 1.25rem 0
    display flex
    flex-direction column
    justify-content center
    align-items center
    .pic
      background: #D8D8D8;
      width 4.5rem
      height 4.5rem
      border-radius 50%
      img
        width 100%
        height 100%
    .nick-name
      margin-top .625rem
      font-family: PingFangSC-Semibold;
      font-size: .875rem;
      color: #25265E;
  .contact
    width 100%
    .email, .phone
      width 100%
      margin-bottom .75rem
      display flex
      flex-direction row
      justify-content space-between
    .email .text, .phone .text
        text-align right
        width 3.1rem
        font-family: PingFangSC-Medium;
        font-size: .875rem;
        color: #25265E;
        line-height 2.5rem
    .email input, .phone input
        margin-left 1rem
        flex 1
        background: #FFFFFF;
        border-radius: 2px;
        height 2.5rem
        font-size .875rem
        font-family: 'PingFangSC-Semibold';
        color: #25265E;
        padding-left 1rem
        &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
          font-family: 'PingFangSC-Regular';
          color: #DADCE6;
          font-size .875rem
          padding-left 1rem
        }
        &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          font-family: 'PingFangSC-Regular';
          color: #DADCE6;
          font-size .875rem
          padding-left 1rem
        }
        &::-moz-placeholder { /* Mozilla Firefox 19+ */
          font-family: 'PingFangSC-Regular';
          color: #DADCE6;
          font-size .875rem
          padding-left 1rem
        }
        &:-ms-input-placeholder { /* Internet Explorer 10-11 */
          font-family: 'PingFangSC-Regular';
          color: #DADCE6;
          font-size .875rem
          padding-left 1rem
        }
  .wallet-address
    width 100%
    .coin-name
      font-family: PingFangSC-Regular;
      font-size: .75rem;
      color: #25265E;
    input
      width 100%
      background: #FFFFFF;
      border-radius: 2px;
      height 2rem
      &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        font-family: PingFangSC-Regular;
        font-size: .625rem;
        color: #25265E;
      }
      &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        font-family: PingFangSC-Regular;
        font-size: .625rem;
        color: #25265E;
      }
      &::-moz-placeholder { /* Mozilla Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: .625rem;
        color: #25265E;
      }
      &:-ms-input-placeholder { /* Internet Explorer 10-11 */
        font-family: PingFangSC-Regular;
        font-size: .625rem;
        color: #25265E;
      }
  .reward
    margin 1.125rem 0
    font-family: PingFangSC-Semibold;
    font-size: 1rem;
    color: #5A27F6;
    text-align: center;
  .invite-code
    height 2.5rem
    .code
      float left
      span 
        line-height 2.5rem
        font-family: PingFangSC-Medium;
        font-size: .875rem;
        color: #25265E;
      input
        margin-left .75rem
        height 2.375rem
        width 5rem
        &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
          font-family: PingFangSC-Regular;
          font-size: .875rem;
          color: #25265E;
          text-align center
        }
        &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          font-family: PingFangSC-Regular;
          font-size: .875rem;
          color: #25265E;
          text-align center
        }
        &::-moz-placeholder { /* Mozilla Firefox 19+ */
          font-family: PingFangSC-Regular;
          font-size: .875rem;
          color: #25265E;
          text-align center
        }
        &:-ms-input-placeholder { /* Internet Explorer 10-11 */
          font-family: PingFangSC-Regular;
          font-size: .875rem;
          color: #25265E;
          text-align center
        }
    .copy
      margin-left 1.875rem
      float left
      line-height 2.5rem
      font-family: PingFangSC-Regular;
      font-size: .75rem;
      color: #25265E;
  .customer-service
    position fixed
    bottom 2.5rem
    font-family: PingFangSC-Regular;
    font-size: .75rem;
    color: #25265E;
    p
      font-family: PingFangSC-Regular;
      font-size: .75rem;
      color: #25265E;
</style>
