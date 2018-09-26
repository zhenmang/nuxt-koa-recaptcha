<template lang='pug'>
  div.tip-container-customer(v-show='tipMsg')
    div.tip-content
      div.real-tip {{tipMsg}}
      p(@click='confirm' class='confirm') 确认
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    // ...mapState(['tipMsg'])
    tipMsg () {
      return this.$store.state.default.tipMsg
    }
  },
  methods: {
    ...mapMutations(['showTip']),
    confirm () {
      this.showTip({msg: false})
    }
  }
}
</script>

<style lang='stylus'>
  .tip-container.customer {
    font-size: 0.9375rem;
    line-height: 2;
    z-index: 10;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(66, 66, 66, 0.6);
    .tip-content {
      background-color: white;
      color: black;
      position: fixed;
      width: 60%;
      padding: 0.9375rem;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      border-radius: 0.375rem;
      text-align: center;
      .real-tip {
        color: blue;
      }
      .confirm {
        margin-top: 0.625rem;
        border-top: 1px dotted #666666;
      }
    }
  }
</style>
