const state = {
  token: '',
  profile: null
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_PROFILE(state, profile) {
    state.profile = profile
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
