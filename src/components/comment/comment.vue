<template>
 <div class="small-comment">
    <loading v-model="getLoading"></loading>
    <card v-for="(item, index) in Comment.reviews" :header="{title:item.title}" >
        <div slot="content">
            <div class="comment-header">
                <span>评分:</span><rater v-model="item.rating.value" slot="value" :max="5" star="☻" active-color="#FF4500" :margin="4"></rater>
                <span v-text="'评论时间:'+item.created_at"></span>
            </div>
            <div class="comment-summary">
                <p v-text="item.summary"></p>
                <div class="comment-author" style="padding:1rem;">
                    <a v-bind:href="item.author.alt" style="color:#ccc;display:inline-block;">
                        <img :src="item.author.avatar" :alt="item.author.alt" style="border-radius:50%;-webkit-border-radius:50%;-moz-border-radius:50%;">
                        <span v-text="item.author.name" style="vertical-align:60%;"></span>
                    </a>
                    <div style="float: right;height: 52px;line-height: 52px; display:inline-block">
                        <span v-text="item.useful_count + '赞同'"></span>
                        <span v-text="item.useless_count+'反对'"></span>
                        <span v-text="item.comments_count+'条评论'"></span>
                    </div>
                </div>
            </div>
            <div slot="footer" class="comment-content">
                <x-button type="default" action-type="button" @click.native="more(index)">查看更多内容</x-button>
                <div v-if="loadMore" v-text="item.content"></div>
            </div>
        </div>
    </card>
 </div>
 
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Card, Loading, Rater, XButton } from 'vux'
export default{
  name: 'comment',
  components: {
    Card,
    Loading,
    Rater,
    XButton
  },
  mounted () {
    this.fetchComment(`v2/movie/subject/${this.$route.params.id}/reviews?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=20&client=something&udid=dddddddddddddddddddddd`)
      .then(() => {
        this.Comment = this.getComment
      })
  },
  methods: {
    ...mapActions([
      'fetchComment'
    ]),
    more () {
      this.loadMore = !this.loadMore
    }
  },
  data () {
    return {
      'Comment': {
        'reviews': [{
          'rating': {
            'max': 0,
            'value': 0,
            'min': 0
          },
          'useful_count': 0,
          'author': {
            'uid': '',
            'avatar': '',
            'signature': '',
            'alt': '',
            'id': '',
            'name': ''
          },
          'created_at': '',
          'title': '',
          'updated_at': '',
          'share_url': '',
          'summary': '',
          'content': '',
          'useless_count': '',
          'comments_count': '',
          'id': '',
          'subject_id': ''
        }]
      },
      'loadMore': false
    }
  },
  computed: {
    ...mapGetters({
      getComment: 'getComment',
      getLoading: 'getLoading'
    })
  }
}
</script>
<style lang="css">
.comment-header,.comment-summary
{
    text-align: left;
    padding: 1rem;
}
.comment-header span,.comment-header div
{
    margin: 0rem .3rem;
}
</style>
