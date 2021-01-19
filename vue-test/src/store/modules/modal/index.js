export default {
	state: {
		isModal: false,
	},
	getters: {
		GET_IS_MODAL: state => state.isModal,
	},
	mutations: {
		SET_OPEN_MODAL: state => state.isModal = true,
		SET_CLOSE_MODAL: state => state.isModal = false,
	},
	actions: {
		OPEN_MODAL: ({ commit }) => commit('SET_OPEN_MODAL'),
		CLOSE_MODAL: ({ commit }) => commit('SET_CLOSE_MODAL'),
	}
}