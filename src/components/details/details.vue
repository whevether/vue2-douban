<template>
    <group :title="$t('电影详情')">
    <loading v-model="getLoading"></loading>
      <section class="move-msg">
        <div class="move-msg-img">
          <img :src="movieMsg.images.large" :alt="movieMsg.alt">
        </div>
        <div class="move-msg-content">
          <h3 v-text="movieMsg.title"></h3>
          <cell :title="$t('评级')">
            <rater v-model="movieMsg.rating.average" slot="value" :max="10" star="☻" active-color="#90EE90" :margin="4"></rater>
          </cell>
          <cell :title="$t('评分')">
            <span v-text="movieMsg.collect_count + '评分'"></span>
          </cell>
          <cell :title="$t('上映年份')">
            <span v-text="movieMsg.year"></span>
          </cell>
          <cell :title="$t('类型')">
            <span v-text="movieMsg.genres.join(', ')"></span>
          </cell>
          <cell :title="$t('产地')">
            <span v-for="item in movieMsg.countries" v-text="item + ' '"></span>
          </cell>
          <cell :title="$t('时长')">
            <span v-for="item in movieMsg.durations" v-text="item"></span>
          </cell>
          <cell  :title="$t('上映地区时间')"></cell>
          <p v-for="item in movieMsg.pubdates" v-text="item"></p>
        </div>
        <div class="move-msg-image">
            <img  v-for="(item,index) in movieMsg.trailers" :src="item.medium" class="previewer-img" @click="show(index)" :alt="item.alt">
            <previewer :list="movieMsg.trailers" ref="previewer" :options="options"></previewer>
        </div>
        <div class="move-msg-tag">
          <h3 v-text="$t('影片标签')"></h3>
          <ul class="tags">
            <li v-for="item in movieMsg.tags"><icon type="success" is-msg></icon>{{item}}</li>
          </ul>
        </div>
      </section>
      <section class="move-count">
        <x-button type="warn" action-type="button" v-text="movieMsg.wish_count + '看过' "></x-button>
        <x-button type="warn" action-type="button" v-text="movieMsg.reviews_count + '人想看' "></x-button>
      </section>
      <section class="move-sum">
        <cell :title="$t('剧情简介')">
          <p v-text="movieMsg.summary"></p>
        </cell>
      </section>
      <section class="move-desc">
        <divider v-text="$t('导演列表')"></divider>
          <div class="details-list" v-for="item in movieMsg.directors" @click="actorInfo(item.id)">
            <div v-if="item.avatars.small" >
              <img :src="item.avatars.small" :alt="item.avatars.alt">
              <p v-text="item.name+'--导演'"></p>
            </div>
          </div>
          <divider v-text="$t('演员列表')"></divider>
          <div class="details-list" v-for="item in movieMsg.casts" @click="actorInfo(item.id)">
            <div v-if="item.avatars.small">
              <img :src="item.avatars.small" :alt="item.avatars.alt">
              <p v-text="item.name"></p>
            </div>
          </div>
      </section>
      <section class="move-duanping">
        <divider v-text="$t('前十热评')"></divider>
        <div class="pl" v-for="item in movieMsg.popular_reviews">
          <div class="rater">
            <span>评分:</span><rater v-model="item.rating.value" slot="value" :max="5" star="☻" active-color="#90EE90" :margin="4"></rater>
            <h4 v-text="item.title" style="display:inline-block"></h4>
          </div>
            <div class="pl-content">
              <p v-text="item.summary"></p>
              <p style="text-align:center"><a v-bind:href="item.alt">评论地址</a></p>
            </div>
            <div class="pl-author">
              <a v-bind:href="item.author.alt">
                <img :src="item.author.avatar" :alt="item.author.alt">
                <span v-text="item.author.name"></span>
              </a>
            </div>
        </div>
        <divider v-text="$t('热门短评')"></divider>
        <div class="pl" v-for="item in movieMsg.popular_comments">
          <div class="rater">
            <span>评分:</span><rater v-model="item.rating.value" slot="value" :max="5" star="☻" active-color="#90EE90" :margin="4"></rater>
            <h4 v-text="'评论论时间:'+item.created_at" style="display:inline-block"></h4>
          </div>
            <div class="pl-content">
              <p v-text="item.content"></p>
            </div>
            <div class="pl-author">
              <a v-bind:href="item.author.alt">
                <img :src="item.author.avatar" :alt="item.author.alt">
                <span v-text="item.author.name"></span>
              </a>
            </div>
        </div>
        <x-button type="primary" @click.native="smallComment(movieMsg.id)">查看全部短评</x-button>
        <x-button type="primary" @click.native="comment(movieMsg.id)">查看全部评论</x-button>
      </section>
    </group>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Group, Cell, Rater, XButton, Divider, Icon, Previewer, Loading } from 'vux'
export default {
  name: 'details',
  components: {
    Group,
    Cell,
    Rater,
    XButton,
    Divider,
    Icon,
    Previewer,
    Loading
  },
  mounted () {
    this.$nextTick(() => {
      this.fetchDetails(`v2/movie/subject/${this.$route.params.id}?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&client=something&udid=dddddddddddddddddddddd`)
      .then(() => {
        this.movieMsg = this.getDetails
      })
    })
  },
  methods: {
    ...mapActions([
      'fetchDetails'
    ]),
    show (index) {
      // 显示预览图
      this.$refs.previewer.show(index)
    },
    comment (id) {
      // 影片评论
      const path = `/comment/${id}`
      this.$router.push({path: path})
    },
    smallComment (id) {
      // 短评
      const path = `/smallcomment/${id}`
      this.$router.push({path: path})
    },
    actorInfo (id) {
      // 演员信息
      const path = `/actorinfo/${id}`
      this.$router.push({path: path})
    }
  },
  data () {
    return {
      movieMsg: {
        'rating': {
          'max': '',
          'average': 0,
          'details': {
            '1': '',
            '3': '',
            '2': '',
            '5': '',
            '4': ''
          },
          'stars': '',
          'min': 0
        },
        trailer_urls: [],
        collect_count: '',
        'wish_count': '',
        'reviews_count': '',
        'images': {
          'small': '',
          'large': '',
          'medium': ''
        },
        'alt': '',
        'year': '',
        'pubdates': [],
        'id': '',
        'title': '',
        'languages': [],
        'countries': [],
        'writers': [{
          'avatars': {
            'small': '',
            'large': '',
            'medium': ''
          },
          'name_en': '',
          'name': '',
          'alt': '',
          'id': ''
        }, {
          'avatars': {
            'small': '',
            'large': '',
            'medium': ''
          },
          'name_en': '',
          'name': '',
          'alt': '',
          'id': ''
        }],
        'casts': [{
          'avatars': {
            'small': '',
            'large': '',
            'medium': ''
          },
          'name_en': '',
          'name': '',
          'alt': '',
          'id': ''
        }],
        'summary': '',
        'directors': [{
          'avatars': {
            'small': '',
            'large': '',
            'medium': ''
          },
          'name_en': '',
          'name': '',
          'alt': '',
          'id': ''
        }],
        'durations': [],
        'genres': [],
        'trailers': [],
        'popular_comments': [{
          'rating': {
            'max': 0,
            'min': 0,
            'value': 0
          },
          'author': {
            'uid': '',
            'avatar': '',
            'name': ''
          },
          'content': '',
          'create_at': ''
        }],
        'comments_count': '',
        'popular_reviews': [{
          'rating': {
            'max': 0,
            'value': 0,
            'min': 0
          },
          'title': '',
          'author': {
            'uid': '',
            'avatar': '',
            'alt': '',
            'id': '',
            'name': ''
          },
          'summary': '',
          'alt': '',
          'id': ''
        }]
      },
      'options': {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getDetails: 'getDetails',
      getLoading: 'getLoading'
    })
  }
}
</script>
<style lang="css">
.move-msg
{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: initial;
    -webkit-flex-direction: row;
    -webkit-flex-wrap: wrap;
    -webkit-justify-content: initial;
    -moz-flex-direction: row;
    -moz-flex-wrap: wrap;
    -moz-justify-content: initial;
    padding: 1rem;
}
.move-msg .move-msg-content h3
{
  margin: .5rem 1rem;
}
.move-msg .move-msg-image
{
  display: block;
  flex: 1;
  -webkit-flex:1;
  -moz-flex:1;
}
.move-msg .move-msg-image > img.previewer-img
{
  width: 200px;
  height: 200px;
  margin: 10px 5px;
}
.move-msg .move-msg-tag
{
  margin-left: 1.5rem;
}
.move-msg .move-msg-tag ul.tags
{
  list-style: none;
}
.move-msg .move-msg-tag ul.tags > li
{
  display: inline-block;
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
  margin: 5px 10px;
}
.move-count
{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: initial;
  -webkit-flex-direction: column;
  -webkit-flex-wrap: wrap;
  -webkit-align-items: initial;
  -moz-flex-direction: column;
  -moz-flex-wrap: wrap;
  -moz-align-items: initial;
  padding: 1rem;
}
.move-desc .details-list
{
  display: table-cell;
  padding: 1rem;
  cursor: pointer;
}
.move-duanping .pl
{
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}
.move-duanping .pl >.rater
{
  text-align: left;
  padding: .3rem;
  border-bottom: 1px solid #eee;
}
.move-duanping .pl > .pl-content
{
  text-align: left;
  padding: .6rem .3rem;
}
.move-duanping .pl > .pl-author
{
  text-align: left;
  padding: .6rem .3rem;
}
.move-duanping .pl > .pl-author img
{
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
}
.move-duanping .pl > .pl-author span
{
  vertical-align: 65%;
  margin-left: 5px;
}
.move-sum
{
  padding: 1rem;
}
</style>
