<template>
    <div class="actor-wrapper">
      <loading v-model="getLoading"></loading>
      <section class="info" style="background-color:#eee;">
        <img :src="actorData.avatars.large" :alt="actorData.alt">
        <div style="flex: 1;-webkit-flex: 1;-moz-flex: 1;">
          <h3 style="padding:1rem;">影星资料</h3>
          <p style="word-wrap: break-word;overflow-wrap: break-word;letter-spacing: 1px;"><span v-text="'英文名:' + actorData.name_en + '中文名:'+actorData.name"></span> <span v-text="'出生地:'+actorData.born_place"></span> <span v-text="'星座:'+actorData.constellation"></span></p>
          <h4 style="padding:.5rem 0rem;">昵称</h4>
          <ul style="list-style:nonde;">
            <li v-for="item in actorData.aka" v-text="item" style="display: inline-block;
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
          <p v-text="'性别:'+actorData.gender" style="padding: .5rem 0rem;"></p>
          <p v-text="'出生年月:' + actorData.birthday" style="padding: .5rem 0rem;"></p>
          <h4 style="padding: .5rem 0rem;">标签</h4>
          <ul style="list-style: none;">
            <li v-for="item in actorData.professions" style="display: inline-block;
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
              margin: 5px 10px;"><icon type="success" is-msg></icon>{{item}} </li>
          </ul>
          <p v-text="actorData.summary" style="padding: .5rem .3rem;"></p>
        </div>
      </section>
      <section>
        <card :header="{title: '作品'}">
          <div slot="content">
            <ul style="list-style: none;">
              <li v-for="(item,index) in actorData.works" style="display:block;text-align:left;padding: .5rem 1rem; border-bottom:1px solid #666;cursor:pointer;" @click="moveList(item.subject.id)">
                <h3 v-text="`${index+1}部`" style="text-align:center;"></h3>
                <div class="content" style="display:inline-block;">
                  <img :src="item.subject.images.small" :alt="item.alt" style="float:left;border-radius:4px;">
                  <div style="float:left;margin: 0rem .6rem;">
                   <h4 v-text="item.subject.title"></h4>
                    <p ><strong v-text="'角色:'+item.roles[0]"></strong></p>
                    <p><span v-text="'上映年份:'+item.subject.year+';'"></span> <span v-for="i in item.subject.durations" v-text="'时长:' + i"></span></p>
                    <rater v-model="item.subject.rating.average" slot="value" :max="10" star="☻" active-color="#FF4500" :margin="4"></rater>
                    <p><span v-text="'评分:'+item.subject.rating.average"></span> -----------<span v-text="item.subject.collect_count+'人评价'"></span></p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </card>
      </section>
    </div>
</template>
<script>
import { Card, Loading, Icon, Rater } from 'vux'
import { mapActions, mapGetters } from 'vuex'
export default{
  name: 'actorinfo',
  components: {
    Card,
    Loading,
    Icon,
    Rater
  },
  data () {
    return {
      'actorData': {
        'alt': '',
        'aka_en': '',
        'aka': [],
        'avatars': {
          'large': '',
          'medium': '',
          'small': ''
        },
        'birthday': '',
        'born_place': '',
        'constellation': '',
        'gender': '',
        'id': '',
        'mobile_url': '',
        'name': '',
        'name_en': '',
        'photos': [{
          'alt': '',
          'cover': '',
          'icon': '',
          'id': '',
          'image': '',
          'thumb': ''
        }],
        'professions': [],
        'summary': '',
        'website': '',
        'works': [{
          'roles': [],
          'subject': {
            'alt': '',
            'casts': [{
              'alt': '',
              'avatars': {
                'large': '',
                'medium': '',
                'small': ''
              },
              'id': '',
              'name': '',
              'name_en': ''
            }],
            'collect_count': '',
            'directors': [{
              'alt': '',
              'avatars': {
                'large': '',
                'medium': '',
                'small': ''
              },
              'name': '',
              'name_en': ''
            }],
            'durations': [],
            'genres': [],
            'id': '',
            'images': {
              'large': '',
              'medium': '',
              'small': ''
            },
            'mainland_pubdate': '',
            'original_title': '',
            'pubdates': '',
            'rating': {
              'average': 0,
              'details': {
                '1': '',
                '2': '',
                '3': '',
                '4': '',
                '5': ''
              },
              'max': 0,
              'min': 0,
              'stars': ''
            }
          },
          'subtype': '',
          'title': '',
          'year': ''
        }]
      }
    }
  },
  mounted () {
    this.fetchCelebrity(`v2/movie/celebrity/${this.$route.params.id}?apikey=0b2bdeda43b5688921839c8ecb20399b&start=0&count=20&client=something&udid=dddddddddddddddddddddd`)
      .then(() => {
        this.actorData = this.getCelebrity
      })
  },
  methods: {
    ...mapActions([
      'fetchCelebrity'
    ]),
    moveList (id) {
      this.$router.push(`/details/${id}`)
    }
  },
  computed: {
    ...mapGetters({
      getCelebrity: 'getCelebrity',
      getLoading: 'getLoading'
    })
  }
}
</script>
<style lang="css">
.actor-wrapper .info
{
  display: flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  justify-content: flex-start;
  -webkit-justify-content: flex-start;
  -moz-justify-content: flex-start;
}
</style>
