<template>
    <sticky>
      <tab :line-width=1 v-model="index">
        <tab-item class="vux-center" :selected="move === item" v-for="item in movelist" @click.native="moveTab">{{item}}</tab-item>
      </tab>
      <section v-show="selnav">
        <loading v-model="getLoading"></loading>
        <swiper :list="swiper_img" auto  height="1000px" dots-class="custom-bottom" dots-position="center">
        </swiper>
        <move :list="getHotMoveList"></move>
      </section>
      <section v-show="!selnav">
        <loading v-model="getLoading"></loading>
        <move :list="getComingSoonList"></move>
      </section>

    </sticky>
</template>

<script>
import { Tab, TabItem, Sticky, Swiper, SwiperItem, Loading } from 'vux'
import Move from '../components/move_list'
import { mapActions, mapGetters } from 'vuex'

const imgList = [
  require('../assets/sw1.jpg'),
  require('../assets/sw2.jpg'),
  require('../assets/sw3.jpg'),
  require('../assets/sw4.jpg'),
  require('../assets/sw5.jpg'),
  require('../assets/sw6.jpg'),
  require('../assets/sw7.jpg'),
  require('../assets/sw8.jpg'),
  require('../assets/sw9.jpg'),
  require('../assets/sw10.jpg'),
  require('../assets/sw11.jpg')
]

const img = imgList.map((one, index) => ({
  url: index,
  img: one
}))

export default {
  components: {
    Tab,
    TabItem,
    Sticky,
    Swiper,
    SwiperItem,
    Move,
    Loading
  },
  data () {
    return {
      movelist: ['正在热映', '即将上映'],
      move: '正在热映',
      index: 0,
      swiper_img: img,
      selnav: true
    }
  },
  methods: {
    moveTab (e) {
      (e.target.outerText === this.move) ? this.selectedHot() : this.selectedMoveList()
    },
    selectedHot () {
      this.selnav = true
    },
    selectedMoveList () {
      this.selnav = false
    },
    ...mapActions([
      'fetchInTheaters',
      'fetchComingSoonList'
    ])
  },
  created () {
    // 获取即将上映的和正在热映影片  v2/movie/coming_soon
    this.fetchInTheaters('v2/movie/in_theaters')
    this.fetchComingSoonList('v2/movie/coming_soon')
  },
  computed: {
    ...mapGetters({
      getHotMoveList: 'getHotMoveList',
      getComingSoonList: 'getComingSoonList',
      getLoading: 'getLoading'
    })
  }
}
</script>

<style  scoped>
.box {
  padding: 15px;
}
</style>
