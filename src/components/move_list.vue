<template>
    <group>
      <cell :title="list.title"></cell>
      <cell :title="'总共有'+list.count+'部电影'"></cell>
      <item :item="item" v-for="item in list.subjects"></item>
    </group>
</template>
<script>
import { Group, Cell } from 'vux'
import Item from './item'
export default{
  name: 'hot',
  props: {
    list: {
      type: [Array, Object],
      required: true
    }
  },
  components: {
    Group,
    Cell,
    Item
  }
}
</script>
