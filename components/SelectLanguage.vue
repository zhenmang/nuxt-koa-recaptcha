<template lang='pug'>
  select.language(v-model='selectLanguage')
    option(disabled='true' value='') Language
    option.english English
    option.chinese Chinese
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      selectLanguage: ''
    }
  },
  watch: {
    selectLanguage (newV, oldV) {
      if (newV === 'English') {
        this.toggleTelegramLanguage({
          language: newV
        })
      } else {
        this.toggleTelegramLanguage({
          language: 'Chinese'
        })
      }
    }
  },
  methods: {
    ...mapMutations(['toggleTelegramLanguage'])
  }
}
</script>

<style lang='stylus'>
  .language
    z-index 1
    background-color: #ffffff
    color: black
    font-family: PingFangSC-Regular;
    position absolute
    top: 0.5rem
    right 0.5rem
    outline none
    border none
</style>
