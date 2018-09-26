<template lang='pug'>
div.game-container(@refreshRoomData='refreshRoomData')
  ul.tab-header
    li(v-for='(v, i) in header' :key='i' @click='toggleCoin(v.name, v.id)' :class='["title", v.name === content ? "active-title" : ""]') {{v.name}}
  div.broadcast(v-show='content!="我的" && content!="游戏介绍"')
    p.horn-text 恭喜xxx中得1BTC；总榜单：1.xxx32BTC；2.xxx32BTC；3.xxx
  //- c-room(:coin='this.content' v-show='this.content === "BTC" || this.content === "ETH" || this.content === "USDT"')
  //- my-info(v-show='this.content === "我的"')
  //- ex-plain(v-show='this.content === "游戏介绍"')
  component(
    :is='tabBody'
    :coin='content'
    :roomList='roomList'
  )
</template>

<script>
import CRoom from '~/components/CRoom'
import MyInfo from '~/components/MyInfo'
import ExPlain from '~/components/ExPlain'
import { mapActions, mapMutations, mapState } from 'vuex'
import post from '../store/post'
export default {
  middleware: 'auth',
  async asyncData ({store, error, req}) {
    // console.log('arg', arguments)
    let { code, data, message } = await store.dispatch('raceCoinTypeList').catch((e) => {
      error({statusCode: 404, message: 'Post raceCoinTypeList not found'})
    })
    if (code !== 0) {
      console.log(message)
    } else {
      store.commit('changeRaceTypeL', {
        raceTypeL: data[0].id
      })
      return {
        header: [
          ...data,
          {
            id: 'explain',
            name: '游戏介绍'
          },
          {
            id: 'my',
            name: '我的'
          }
        ]
      }
    }
    let res = await store.dispatch('raceList', {
      raceTypeL: store.state.raceTypeL
    }).catch((e) => {
      error({statusCode: 404, message: 'Post raceCoinTypeList not found'})
    })
    if (res.code !== 0) {
      console.log(res.message)
    } else {
      return {
        roomList: res.data
      }
    }
  },
  head () {
    return {
      title: '百万富翁'
    }
  },
  // layout: 'tabHead',
  components: {
    CRoom,
    MyInfo,
    ExPlain
  },
  data () {
    return {
      content: 'BTC',
      header: [],
      roomList: []
    }
  },
  computed: {
    ...mapState(['raceTypeL']),
    tabBody () {
      let r
      switch (this.content) {
        case '我的':
          r = 'MyInfo'
          break
        case '游戏介绍':
          r = 'ExPlain'
          break
        default:
          r = 'CRoom'
          break
      }
      return r
    }
  },
  methods: {
    ...mapMutations(['changeRaceTypeL']),
    ...mapActions(['raceCoinTypeList', 'raceList']),
    toggleCoin (coin, type) {
      this.content = coin
      this.changeRaceTypeL({
        raceTypeL: this.raceTypeL
      })
    },
    async refreshRoomData (raceTypeL) {
      let { code, data, message } = await this.raceList({
        raceTypeL
      })
      if (code !== 0) {
        console.log(res.message)
      } else {
        this.roomList = data
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.game-container
  .tab-header
    display flex
    flex-direction row
    justify-content space-around
    font-family: PingFangSC-Semibold;
    font-size: 1rem;
    color: #C2C6DA;
    .active-title
      font-family: PingFangSC-Semibold;
      font-size: 1rem;
      color: #25265E;
      border-bottom: .25rem solid #25265E;
  .broadcast
    position relative
    font-family: PingFangSC-Medium;
    font-size: .75rem;
    color: #FFFFFF;
    width: 100%;
    height 2rem
    background: #9674F8;
    line-height 2rem
    .horn-text
      position absolute
      height 100%
      padding-left 3.82rem
      background-image url('~/assets/game/horn.png')
      background-size 1.125rem auto
      background-position 1.5625rem center
      @keyframes lunbo {
        0% {
          transform: translateX(100%);
        }
        100% {
          transform: translateX(-100%);
        }
      }
      animation lunbo 9s linear 0s infinite normal
  .room-list
    width 100%
    padding-top 1.25rem
    display flex
    flex-direction column
    justify-content center
    align-items center
</style>
