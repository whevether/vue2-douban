<template>
  <div id="app" >
    <view-box ref="viewBox">
      <x-header slot="header" style="width: 100%;position: absolute;left: 0px;top: 0px;z-index: 100;" :left-options="leftOptions" :title="title" @on-click-title="scrollTop"></x-header>
      <transition class="vux-pop-in">
        <router-view></router-view>
      </transition>
      <tabbar></tabbar>
    </view-box>
  </div>
</template>
<script>
import { ViewBox, XHeader } from 'vux'
import { mapActions, mapGetters } from 'vuex'
import Tabbar from './components/tabbar'
export default {
  components: {
    Tabbar,
    ViewBox,
    XHeader
  },
  methods: {
    scrollTop () {
      this.box.scrollTop = 0
    },
    ...mapActions([
      'backTop'
    ])
  },
  mounted () {
    this.hander = () => {
      this.backTop(this.$refs.viewBox.getScrollTop())
    }
    this.box = this.$refs.viewBox.getScrollBody()
    this.box.addEventListener('scroll', this.hander, false)
  },
  beforeDestroy () {
    this.box.removeEventlistener('scroll', this.hander, false)
  },
  computed: {
    ...mapGetters({
      test: 'backScrollTop'
    }),
    leftOptions () {
      return {
        showBack: this.$route.path !== '/'
      }
    },
    title () {
      return this.$route.name
    }
  }
}
</script>
<style>
*{
  padding: 0rem;
  margin: 0rem;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
a{
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}
#app #vux_view_box_body
{
  padding-top:2.7rem;
}
</style>
