<template lang='pug'>
div.room-list
  div.room-container(v-for='(v, i) in roomList' :key='i')
    div.no
      span.order 第{{v.version}}期
      span.history 往期
    div.room-info
      p.target-quota 目标额度：{{v.maxTotal + coin}}
      p.mini-unit 最小投注额度：0.001{{coin}}
      p.start-time 开始时间：{{formatDate(v.startTime)}}
      p.percent-text 投注进度:
      div.percent-pic
        div.whole
          p.done(:style='{width: (v.currentTotal/v.maxTotal) * 100 + "%"}')
          span.open-prize(v-show='v.valid') 已开奖
        div.number
          span.done {{v.currentTotal}}
          span.total /{{v.maxTotal}}
      div.user-operation(v-if='!v.valid')
        div.left
          p.reduce(@click='reduce') -
          p.input
            input(placeholder='投注金额' v-model='amountOfInvestment')
          p.plus(@click='plus') +
          p.coin {{coin}}
        p.amount-tip(v-show='amountTip') {{amountTip}}
        div.right(@click='bet(v.id)') 投注
      div.race-over(v-if='v.valid')
        p.owner 中奖者：{{v.winner}}
        p.next-field 距下期开始还剩：{{timerShow[coin + v.id]}}
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    coin: {
      type: String,
      default () {
        return 'BTC'
      }
    },
    roomList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      amountTip: '',
      amountOfInvestment: 0,
      countDown: '',
      timerArr: [],
      timerShow: {},
      timer: {}
    }
  },
  computed: {
    ...mapState(['raceTypeL'])
  },
  created () {
    this.roomList.forEach((v, i, a) => {
      if (v.valid || !v.seperateTime) {
        return
      }
      let key = this.coin + v.id
      this.timerArr.push(this.timer[key] = setInterval(() => {
        v.seperateTime -= 1000
        if (v.seperateTime <= 1000) {
          this.$set(this.timerShow, key, '00:00:00')
          clearInterval(this.timer[key])
          return
        }
        let initH = Math.floor(time/1000/60/60)
        let hour = initH < 10 ? ("0" + initH) : initH
        let initM = Math.floor(time/1000/60 - hour*60)
        let minute = initM < 10 ? ("0" + initM) : initM
        let initS = Math.floor(time/1000 - minute*60)
        let seconds = initS < 10 ? ("0" + initS) : initS
        if (!this.timerShow[key]) {
          this.$set(this.timerShow, key, (hour + ":" + minute + ":" + seconds))
        } else {
          this.timerShow[key] = (hour + ":" + minute + ":" + seconds)
        }
      }, 1000))
    })
  },
  beforeRouteLeave () {
    this.timerArr.forEach((v, i, a) => {
      clearInterval(v)
    })
  },
  methods: {
    ...mapActions(['touZhu', 'raceList', 'userInfo']),
    plus () {
      this.amountOfInvestment += 0.001
    },
    reduce () {
      this.amountOfInvestment -= 0.001
      if (this.amountOfInvestment < 0) {
        this.amountOfInvestment = 0
        return
      }
    },
    async bet (id) {
      if (!this.getCookie('X-USER-TOKEN')) {
        console.log('尚未登陆')
        this.$router.push('/Login')
        return
      }
      if (this.amountOfInvestment % 0.001) {
        this.amountTip = '投注额度须是0.001的整数倍'
        return
      } else {
        this.amountTip = ''
      }
      let { code, data, message } = await this.userInfo()
      let balance
      if (code !== 0) {
        console.log(message)
      } else {
        balance = data.address[this.coin.toLowerCase()].amount
        if (balance < this.amountOfInvestment) {
          console.log('余额不足')
          // 提示去充值
          return
        }
      }
      let res = await this.touZhu({
        raceTypeL: this.raceTypeL,
        raceTypeM: id
      })
      if (res.code !== 0) {
        console.log(res.message)
      } else {
        this.$emit('refreshRoomData', this.raceTypeL)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.room-list
  width 100%
  padding-top 1.25rem
  display flex
  flex-direction column
  justify-content center
  align-items center
  .room-container
    margin-bottom .875rem
    padding 1rem
    width 20.0625rem
    background: #FFFFFF;
    border: 1px solid #EDE7FD;
    box-shadow: 0 2px .25rem 0 #F7F4FF;
    border-radius: .375rem;
    .no
      text-align center
      .order
        font-family: PingFangSC-Medium;
        font-size: 1rem;
        color: #25265E;
      .history
        float right
        border: 1px solid #8A8FAB;
        border-radius: 3px;
        width 2.8125rem
        height 1.25rem
        font-family: PingFangSC-Regular;
        font-size: .75rem;
        color: #8A8FAB;
        line-height 1.25rem
    .room-info
      margin-top .875rem
      font-family: PingFangSC-Regular;
      font-size: .875rem;
      color: #8A8FAB;
      .percent-pic
        height 1rem
        display flex
        flex-direction row
        justify-content space-between
        .whole
          position relative
          width 12.375rem
          background: #DADCE6;
          border-radius: .84375rem;
          height 100%
          .done
            background: #5A27F6;
            border-radius: .84375rem 0 0 .84375rem;
            height 100%
          .open-prize
            position absolute
            left 50%
            top 50%
            transform translateX(-50%) translateY(-50%)
            font-family: PingFangSC-Regular;
            font-size: .625rem;
            color: #FFFFFF;
        .number
          line-height 1rem
          font-family: PingFangSC-Regular;
          font-size: .75rem;
          color: #8A8FAB;
          .done
            color: #5A27F6;
      .user-operation
        margin-top 1.25rem
        height 1.75rem
        display flex
        flex-direction row
        justify-content space-between
        .amount-tip
          font-size 0.5rem
          color red
        .left
          display flex
          flex-direction row
          justify-content flex-start
          align-items center
          .reduce, .plus
            color: #9674F8;
            font-size 1rem
            line-height 1.75rem
          .reduce, .plus, .input
            margin-right .375rem
          .input
            height 1.75rem
            input
              line-height 1.625rem
              font-size .75rem
              padding-left 1rem
              &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                font-family: PingFangSC-Regular;
                font-size: .625rem;
                color: #C2C6DA;
                padding-left 1rem
              }
              &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                font-family: PingFangSC-Regular;
                font-size: .625rem;
                color: #C2C6DA;
                padding-left 1rem
              }
              &::-moz-placeholder { /* Mozilla Firefox 19+ */
                font-family: PingFangSC-Regular;
                font-size: .625rem;
                color: #C2C6DA;
                padding-left 1rem
              }
              &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                font-family: PingFangSC-Regular;
                font-size: .625rem;
                color: #C2C6DA;
                padding-left 1rem
              }
          .coin
            font-family: PingFangSC-Regular;
            font-size: .875rem;
            color: #C2C6DA;
            line-height 1.75rem
            position relative
            top 2px
        .right
          width 4.5rem
          border: 1px solid #5A27F6;
          border-radius: .25rem;
          font-family: PingFangSC-Regular;
          font-size: .75rem;
          color: #5A27F6;
          height 1.625rem
          text-align center
          line-height 1.625rem
      .race-over
        .owner
          font-family: PingFangSC-Regular;
          font-size: .625rem;
          color: #8A8FAB;
          line-height 2
        .next-field
          font-family: PingFangSC-Regular;
          font-size: .875rem;
          color: #9674F8;
          line-height 1.5
</style>
