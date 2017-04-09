import * as types from '../types'
import Vue from 'vue'
// http 获取豆瓣数据
export const _get = ({ url, id }, commit) => {
  if (commit) {
    commit(types.START_LOADING)
  }
  let _url
  if (id) {
    _url = `https://api.douban.com/${url}/${id}`
  } else {
    _url = `https://api.douban.com/${url}`
  }
  return Vue.http.jsonp(_url)
    .then((res) => {
      if (commit) commit(types.FINISH_LOADING)
      if (res.status === 200) {
        return res
      }
      return Promise.reject(new Error(res.status))
    })
}
//  获取即将开始电影
export const fetchComingSoonList = ({ commit }, url) => {
  return _get({url}, commit)
    .then((res) => {
      if (res.status === 200 && res.data) {
        return commit(types.FETCH_COMING_SOON, res.data)
      }
    }).catch((err) => {
      Promise.reject(new Error(err))
    })
}
// 获取正在热映的电影
export const fetchInTheaters = ({ commit }, url) => {
  return _get({url}, commit)
    .then((res) => {
      if (res.status === 200 && res.data) {
        return commit(types.FETCH_HOT_MOVE, res.data)
      }
    }).catch((err) => {
      Promise.reject(new Error(err))
    })
}
// 获取电影详情
export const fetchDetails = ({commit}, url) => {
  return _get({url}, commit)
    .then((res) => {
      if (res.status === 200 && res.data) {
        commit(types.FETCH_DETAILS, res.data)
      }
    }).catch((err) => {
      Promise.reject(new Error(err))
    })
}
// 获取短评
export const fetchSmallComment = ({commit}, url) => {
  return _get({url}, commit)
    .then((res) => {
      commit(types.FETCH_SMALL_COMMENT, res.data)
    }).catch((err) => {
      Promise.reject(new Error(err))
    })
}
// 获取长评
export const fetchComment = ({commit}, url) => {
  return _get({url}, commit)
    .then((res) => {
      commit(types.FETCH_COMMENT, res.data)
    }).catch((err) => {
      Promise.reject(new Error(err))
    })
}
// 获取演员或者导演信息
export const fetchCelebrity = ({commit}, url) => {
  return _get({url}, commit)
    .then((res) => {
      commit(types.FETCH_CELEBRITY, res.data)
    }).catch((err) => {
      Promise.reject(new Error(err))
    })
}
// 获取top 250
export const fetchTop = ({commit}, url) => {
  return _get({url}, commit)
    .then((res) => {
      commit(types.FETCH_TOP, res.data)
    }).catch((err) => {
      Promise.reject(new Error(err))
    })
}
