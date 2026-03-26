import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import orders from './modules/orders'
import shop from './modules/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    orders,
    shop
  }
})
