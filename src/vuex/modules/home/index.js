import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
const state = {
  comingSoonList: [],
  hotMove: [],
  details: [],
  commit: [],
  smallcomment: [],
  celebrity: [],
  top: []
}
export default{
  state,
  getters,
  actions,
  mutations
}
