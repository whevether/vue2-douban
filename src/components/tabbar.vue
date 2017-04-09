<!--工具条-->
<template>
    <tabbar>
      <tabbar-item link="/">
        <img slot="icon" src="../assets/hok.svg">
        <span slot="label">电影</span>
      </tabbar-item>
      <tabbar-item show-dot link="/top">
        <img slot="icon" src="../assets/mok.svg">
        <span slot="label">TOP250</span>
      </tabbar-item>
      <tabbar-item  link="https://github.com/whevether">
        <img slot="icon" src="../assets/github.svg">
        <span slot="label">github</span>
      </tabbar-item>
      <tabbar-item link="/me">
        <img slot="icon" src="../assets/eok.svg">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
</template>
<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  }
}
</script>
