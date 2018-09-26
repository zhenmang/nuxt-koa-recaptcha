<template lang='pug'>
div.telegram-invite-container
  div.how-obtain {{telegramInviteContainer.howObtain}}
  div.share-reward
    p.first {{telegramInviteContainer.shareReward.first}}
    p.second
      span {{telegramInviteContainer.shareReward.second.span1}}
      i {{telegramInviteContainer.shareReward.second.i}}
      span {{telegramInviteContainer.shareReward.second.span2}}
  div.one-group
    p.number {{telegramInviteContainer.oneGroup.number}}
    p.desc {{telegramInviteContainer.oneGroup.desc}}
    a.group.group-active(:href='telegramInviteContainer.oneGroup.groupActive.href') {{telegramInviteContainer.oneGroup.groupActive.text}}
  div.two-group
    p.numer {{telegramInviteContainer.twoGroup.number}}
    p.desc {{telegramInviteContainer.twoGroup.desc}}
    p.reward {{telegramInviteContainer.twoGroup.reward}}
    div.code
      P.code-text {{userInfos.inviteCode ? userInfos.inviteCode : '--'}}
      p.code-copy(@click='copyContent(userInfos.inviteCode, "codeCopyText")') {{telegramInviteContainer.twoGroup.code.codeCopy}}
      p.code-copy-text(:style='{paddingLeft: codeCopyText ? "0.5rem" : "", paddingRight: codeCopyText ? "0.5rem" : ""}') {{codeCopyText}}
  div.three-group
    p.number {{telegramInviteContainer.threeGroup.number}}
    p.desc1 {{telegramInviteContainer.threeGroup.desc1}}
    p.desc2 {{telegramInviteContainer.threeGroup.desc2}}
    div.link
      p.link-text {{link}}
      p.link-copy(@click='copyContent(link, "linkCopyText")') {{telegramInviteContainer.threeGroup.link.linkCopy}}
      p.link-copy-text(:style='{paddingLeft: codeCopyText ? "0.5rem" : "", paddingRight: codeCopyText ? "0.5rem" : ""}') {{linkCopyText}}
  div.people-reward
    div.people
      p.text {{telegramInviteContainer.peopleReward.people.text}}
      p.number 0
    div.reward
      p.text {{telegramInviteContainer.peopleReward.reward.text}}
      p.number 100
  div.footer
    p.first {{telegramInviteContainer.footer.first}}
    p.second {{telegramInviteContainer.footer.second}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  // async asyncData ({ store, params, error }) {
  //   let { code, message, data } = await store.dispatch('telegramUserInfo', {})
  //   if ( code === 0 ) {
  //     return {
  //       userInfos: data
  //     }
  //   }
  // },
  data () {
    return {
      userInfos: {},
      linkCopyText: '',
      codeCopyText: ''
    }
  },
  computed: {
    ...mapState(['telegramLanguage']),
    link () {
      return process.client ? (window.location.origin + '/TelegramRegister?inviteCode=' + this.userInfos.inviteCode) : ''
    },
    telegramInviteContainer () {
      return this.telegramLanguage ?
        {
          howObtain: '如何获得ONEBET币',
          shareReward: {
            first: '分享链接给你的好友',
            second: {
              span1: '每一个成功推荐将会获得',
              i: '100 ONEBET！',
              span2: '的奖励'
            }
          },
          oneGroup: {
            number: 1,
            desc: '加入1DOLLAR.BET Global 电报群',
            groupActive: {
              text: '1DOLLAR.BET Global 1',
              href: 'https://t.me/joinchat/JkFGWhERF_A3xsIAKyu0mg'
            }
          },
          twoGroup: {
            number: 2,
            desc: '发送一下代码到telegram小组，将会获得',
            reward: '100 ONEBET奖励！',
            code: {
              codeCopy: '复制'
            }
          },
          threeGroup: {
            number: 3,
            desc1: '分享下列链接给身边好友，每一个成功推荐，',
            desc2: '你将获得额外的100个ONEBET奖励',
            link: {
              linkCopy: '复制'
            }
          },
          peopleReward: {
            people: {
              text: '邀请人数'
            },
            reward: {
              text: '获得的ONEBET'
            }
          },
          footer: {
            first: 'OneBet.io@2018',
            second: '(中国标准时间)'
          }
        }
        :
        {
          howObtain: 'How to get ONEBET',
          shareReward: {
            first: 'Share the link with your friends',
            second: {
              span1: 'and every successful invitation will bring you',
              i: '100 ONEBET',
              span2: 'as reward'
            }
          },
          oneGroup: {
            number: 1,
            desc: 'Join in the telegram groups of 1DOLLAR',
            groupActive: {
              text: '1DOLLAR.BET Global 1',
              href: 'https://t.me/joinchat/JkFGWhERF_A3xsIAKyu0mg'
            }
          },
          twoGroup: {
            numer: 2,
            desc: 'Send the following code to the telegram group',
            reward: 'and you will be rewarded with 100 ONEBET!',
            code: {
              codeCopy: 'Copy'
            }
          },
          threeGroup: {
            number: 3,
            desc1: 'Share the link with your friends and every successful invitation will',
            desc2: 'bring you an extra 100 ONEBET as reward',
            link: {
              linkCopy: 'Copy'
            }
          },
          peopleReward: {
            people: {
              text: 'Invited'
            },
            reward: {
              text: 'ONEBET gained'
            }
          },
          footer: {
            first: 'OneBet.io@2018',
            second: '(China standard time)'
          }
        }
    }
  },
  watch: {
    linkCopyText (newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {
          this.linkCopyText = ''
        }, 2000)
      }
    },
    codeCopyText (newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {
          this.codeCopyText = ''
        }, 2000)
      }
    }
  },
  methods: {
    ...mapActions(['telegramUserInfo']),
    copyContent (value, textTip) {
      const input = document.createElement('input')
      input.setAttribute('readonly', 'readonly')
      input.setAttribute('value', value)
      document.body.appendChild(input)
      input.focus()
      input.setSelectionRange(0, 9999)
      try {
        if (document.execCommand('copy')) {
          document.execCommand('copy')
          this[textTip] = this.telegramLanguage === 'Chinese' ? '复制成功' : 'Copied'
        } else {
          this[textTip] = this.telegramLanguage === 'Chinese' ? '不支持copy,请升级浏览器' : 'Copy is not supported. Please upgrade browser'
        }
      } catch (e) {
        this[textTip] = this.telegramLanguage === 'Chinese' ? '复制出错，请重试' : 'Copy error. Please try again'
      }
      document.body.removeChild(input)
    }
  }
}
</script>

<style lang='stylus'>
div.telegram-invite-container
  width 100%
  padding-top 6.875rem
  background-image url('~assets/telegram/onebet_logo.png')
  background-size 6.25rem 1.375rem
  background-position center 3.9375rem
  background-repeat no-repeat
  div.how-obtain
    font-family: PingFangSC-Semibold;
    font-size: 1rem;
    color: #25265E;
    text-align: center;
  div.share-reward
    margin-top 1.25rem
    p
      font-family: PingFangSC-Regular;
      font-size: .875rem;
      color: #8A8FAB;
      text-align: center;
      i
        font-family: PingFangSC-Regular;
        font-size: .875rem;
        color: #5137EC;
        text-align: center;
        line-height: 1.25rem;
  div.one-group
    margin 1.875rem 3.9375rem 0 3.9375rem
    position relative
    padding-top 1.625rem
    p.number
      font-family: PingFangSC-Semibold;
      font-size: 1.125rem;
      color: #FFFFFF;
      text-align: center;
      position absolute
      left 50%
      transform translateX(-50%)
      top 0
      width 1.625rem
      height 1.625rem
      background: #5A27F6;
      border-radius 50%
      line-height 1.625rem
    p.desc
      text-align center
      font-family: PingFangSC-Medium;
      font-size: .875rem;
      color: #5A27F6;
      margin .75rem 0 1.25rem 0
    a.group
      display block
      margin-top .625rem
      border: 1px solid #8A8FAB;
      font-family: PingFangSC-Regular;
      font-size: 1rem;
      color: #8A8FAB;
      text-align: center;
      height 2.75rem
      line-height 2.75rem
    a.group-active
      border: 1px solid #5A27F6;
      color: #5A27F6;
  div.two-group
    margin 2.5rem 1.875rem 0 1.875rem
    position relative
    padding-top 1.625rem
    p.numer
      position absolute
      left 50%
      transform translateX(-50%)
      top 0
      font-family: PingFangSC-Semibold;
      font-size: 1.125rem;
      color: #FFFFFF;
      background: #5A27F6;
      width 1.625rem
      height 1.625rem
      border-radius 50%
      text-align center
      line-height 1.625rem
    p.desc, p.reward
      font-family: PingFangSC-Medium;
      font-size: .875rem;
      color: #5A27F6;
      text-align: center;
    p.desc
      margin-top 0.75rem
    div.code
      height 1.875rem
      margin-top 0.75rem
      background: rgba(218,220,230,0.12);
      border: 1px solid #5A27F6;
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      p.code-text
        flex 1
        height 1.875rem
        font-family: PingFangSC-Regular;
        font-size: .75rem;
        color: #8A8FAB;
        padding-left .75rem
        line-height 1.875rem
        text-align left
      p.code-copy
        width 4.375rem
        height 1.875rem
        font-family: PingFangSC-Regular;
        font-size: .75rem;
        color: #FFFFFF;
        line-height 1.875rem
        text-align center
        background: #5A27F6;
      p.code-copy-text
        color blue
        font-size: .75rem;
        font-family: PingFangSC-Regular;
  div.three-group
    margin 2.625rem 1.875rem 0 1.875rem
    position relative
    padding-top 1.625rem
    p.number
      position absolute
      left 50%
      transform translateX(-50%)
      top 0
      width 1.625rem
      height 1.625rem
      background: #5A27F6;
      text-align center
      line-height 1.625rem
      font-family: PingFangSC-Semibold;
      font-size: 1.125rem;
      color: #FFFFFF;
      border-radius 50%
    p.desc1
      margin-top 0.75rem
    p.desc1, p.desc2
      font-family: PingFangSC-Medium;
      font-size: .875rem;
      color: #5A27F6;
      text-align: center;
    div.link
      margin-top 1.25rem
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      background: rgba(218,220,230,0.12);
      border: 1px solid #5A27F6;
      p.link-text
        flex 1
        height 1.875rem
        line-height 1.875rem
        padding-left .75rem
        font-family: PingFangSC-Regular;
        font-size: .625rem;
        color: #8A8FAB;
        overflow hidden
      p.link-copy
        height 1.875rem
        background: #5A27F6;
        font-family: PingFangSC-Regular;
        font-size: .75rem;
        color: #FFFFFF;
        text-align center
        line-height 1.875rem
        width 4.375rem
      p.link-copy-text
        color blue
        font-family: PingFangSC-Regular;
        font-size: .75rem;
  div.people-reward
    margin 2.5rem 2.875rem 0 2.875rem
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    height 6.25rem
    background: #FFFFFF;
    div.people, div.reward
      flex 1
      height 100%
      display flex
      flex-direction column
      justify-content center
      align-items center
      background: #5A27F6;
      p.text, p.number
        font-family: PingFangSC-Semibold;
        color: #FFFFFF;
        text-align: center;
      p.text
        font-size 1rem
      p.number
        font-size 1.75rem
    div.reward
      margin-left .75rem
  div.footer
    margin 1.875rem 3.75rem 2.125rem 3.75rem
    p.first, p.second
      font-family: PingFangSC-Regular;
      font-size: .625rem;
      color: #8A8FAB;
      text-align: center;
</style>
