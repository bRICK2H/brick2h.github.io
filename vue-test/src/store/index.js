import Vue from 'vue'
import Vuex from 'vuex'

import users from './modules/users'
import form from './modules/form'
import modal from './modules/modal'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
	  users,
	  form,
	  modal
  }
})
