import { createStore } from 'vuex'

const store = createStore({
  state: {
    visitorName: ''
  },

  mutations: {
    setVisitorName(state, name) {
      state.visitorName = name
    }
  },

  actions: {}
})

export default store