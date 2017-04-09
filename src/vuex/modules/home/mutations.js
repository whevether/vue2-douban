import * as types from '../types'

const mutations = {
  [types.FETCH_HOT_MOVE] (state, data) {
    state.hotMove = data
  },
  [types.FETCH_COMING_SOON] (state, data) {
    state.comingSoonList = data
  },
  [types.FETCH_DETAILS] (state, data) {
    if (data) {
      state.details = data
    }
  },
  [types.FETCH_SMALL_COMMENT] (state, data) {
    if (data) {
      state.smallcomment = data
    }
  },
  [types.FETCH_COMMENT] (state, data) {
    if (data) {
      state.comment = data
    }
  },
  [types.FETCH_CELEBRITY] (state, data) {
    if (data) {
      state.celebrity = data
    }
  },
  [types.FETCH_TOP] (state, data) {
    if (data) {
      state.top = data
    }
  }
}

export default mutations
