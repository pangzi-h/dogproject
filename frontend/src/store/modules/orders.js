const state = {
  list: []
}

const mutations = {
  SET_LIST(state, list) {
    state.list = list
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
