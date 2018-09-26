<template lang='pug'>
  div.loading-container(v-show='loading')
    div.img-container
      img(src='~/assets/loading.png')
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['loading'])
  },
  methods: {
    ...mapMutations([
      'showLoading'
    ])
  }
}
</script>

<style lang='stylus' scoped>
.loading-container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(#eee, 0.8);
  .img-container {
    @keyframes load {
      from {opacity: 1;}
      to {opacity: 0;}
    }
    @-moz-keyframes load {
      from {opacity: 1;}
      to {opacity: 0;}
    }
    @-webkit-keyframes load {
      from {opacity: 1;}
      to {opacity: 0;}
    }
    @-o-keyframes load {
      from {opacity: 1;}
      to {opacity: 0;}
    }
    animation: load 1s linear 0s infinite alternate;
    width: 30%;
    height: auto;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
