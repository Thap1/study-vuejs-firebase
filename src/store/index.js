import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: '',
    setRole: ''
  },
  actions: {
    setUid: ({commit, state}, uid) => {
      commit('SET_UID', uid)
      return state.uid
    }
  },
  mutations: {
    SET_UID: (state, uid) => {
      state.uid = uid
    }
  },
  getters: {
    uid: (state) => {
      return state.uid
    }
  }
})
