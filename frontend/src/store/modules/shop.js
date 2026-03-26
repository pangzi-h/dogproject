const state = {
  cart: []
}

const mutations = {
  SET_CART(state, cart) {
    state.cart = cart
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
