<template>
    <sticky>
      <loading v-model="getLoading"></loading>
      <move :list="getTopMove"></move>
    </sticky>
</template>
<script>
import { Sticky, Loading } from 'vux'
import { mapActions, mapGetters } from 'vuex'
import Move from '../components/move_list'
export default{
  name: 'top',
  components: {
    Sticky,
    Move,
    Loading
  },
  mounted () {
    this.fetchTop(`v2/movie/top250`)
  },
  methods: {
    ...mapActions([
      'fetchTop'
    ])
  },
  computed: {
    ...mapGetters({
      getTopMove: 'getTopMove',
      getLoading: 'getLoading'
    })
  }
}
</script>
