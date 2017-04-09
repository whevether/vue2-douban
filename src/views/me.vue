<template>
    <sticky>
      <loading v-model="getLoading"></loading>
      <card class="me" v-for="item in avatar">
        <div class="me-header" slot="header">
            <img :src="item.img" :alt="item.info.name" style="width:150px;height:150px;border-radius:50%;-webkit-border-radius:50%;-moz-border-radius:50%;">
            <h3 v-text="item.info.name"></h3>
        </div>
        <div class="me-content-info" slot="content">
            <h1 v-text="`姓名: ${item.info.name}`"></h1>
            <p style="margin: .6rem 0rem;"><span style="font-size:23px;" v-text="'年龄:'"></span><span v-text="item.info.age"></span></p>
            <p style="margin: .6rem 0rem;"><span style="font-size:23px;" v-text="'性别:'"></span><span v-text="item.info.sex"></span></p>
            <p style="margin: .6rem 0rem;"><span style="font-size:23px;" v-text="'QQ:'"></span><span v-text="item.info.qq"></span></p>
            <p style="margin: .6rem 0rem;"><span style="font-size:23px;" v-text="'婚否:'"></span><span v-text="item.info.maritalNo"></span></p>
            <p style="margin: .6rem 0rem;"><span style="font-size:23px;" v-text="'联系电话:'"></span><a href="#" v-text="item.info.tel"> </a></p>
            <p style="margin: .6rem 0rem;"><span style="font-size:23px;" v-text="'个人简介:'"></span><strong v-text="item.info.career"></strong></p>
            <h5 style="margin: .6rem 0rem; font-size:30px">标签</h5>
            <ul style="list-style: none;">
                <li v-for="i in item.info.tag" v-text="i" style="display: inline-block;
                    line-height: 1;
                    vertical-align: baseline;
                    background-color: #e8e8e8;
                    background-image: none;
                    padding: .5833em .833em;
                    color: rgba(0,0,0,.6);
                    text-transform: none;
                    border: 0 solid transparent;
                    border-radius: .28571429rem;
                    -webkit-transition: background .1s ease;
                    transition: background .1s ease;
                    margin: 5px 10px;"></li>
            </ul>
        </div>
      </card>
    </sticky>
</template>
<script>
import { Sticky, Loading, Card } from 'vux'
import { mapGetters } from 'vuex'
export default{
  name: 'top',
  components: {
    Sticky,
    Loading,
    Card
  },
  computed: {
    ...mapGetters({
      getLoading: 'getLoading'
    })
  },
  data () {
    return {
      'avatar': [{
        'img': require('../assets/me.jpg'),
        'info': {
          'name': '万文峰',
          'age': '28',
          'tel': '13265616949',
          'qq': '415494857',
          'sex': '男',
          'maritalNo': '未婚',
          'career': '一个不入流的码农',
          'tag': ['码农', '吃货', '喜欢旅游', '爱好骑行']
        }
      }]
    }
  }
}
</script>
