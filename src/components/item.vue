<template>
   <group>
    <panel :type="type" :list="list" :footer="footer"></panel>
        <ul class="casts-name">
            <li v-for="i in item.casts"><a v-bind:href="i.alt" v-text="'主演:'+i.name"></a></li>
        </ul>
   </group>
</template>
<script>
import { Group, Panel } from 'vux'
export default{
  name: 'item',
  props: {
    item: {
      type: [Array, Object],
      required: true
    }
  },
  data () {
    return {
      type: '1',
      list: [{
        src: this.item.images.large,
        title: this.item.title,
        desc: `导演: ${this.item.directors[0].name} 类型:  ${this.item.genres} 上映年份:  ${this.item.year} 豆瓣评分: ${this.item.rating.average} (${this.item.collect_count} 人评分)`,
        url: {
          path: `/details/${this.item.id}`,
          replace: false
        }
      }],
      footer: {
        title: '查看详情',
        url: this.item.alt
      }
    }
  },
  components: {
    Panel,
    Group
  }
}
</script>
<style lang="css">
ul.casts-name
{
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    -webkit-flex-direction: row;
    -webkit-justify-content: space-around;
    -webkit-flex-wrap: wrap;
    -moz-flex-direction: row;
    -moz-justify-content: space-around;
    -moz-flex-wrap: wrap;
    padding: .5rem 0rem;
}
ul.casts-name > li > a
{
    color: #7B68EE;
    text-decoration: none;
}
</style>
