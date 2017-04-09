import * as types from '../types'
const mutations = {
  [types.BACKTOP] (state, payload) {
    state.backScrollTop = payload
  },
  [types.START_LOADING] (state) {
    state.loading = true
  },
  [types.FINISH_LOADING] (state) {
    state.loading = false
  }
}
export default mutations
