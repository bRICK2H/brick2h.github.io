export default {
	getters: {
		GET_FIELD_SELECT: (s, g, rootState) => field => {
			const { form: { fields: { select } } } = rootState;
			return select[field];
		}
	},
	mutations: {
		SET_SELECT: (s, { select, value }) => select.value = value,
	},
	actions: {
		SET_SELECT: ({ commit, rootState }, value) => {
			let { form: { fields: { select } } } = rootState;
			commit('SET_SELECT', { select, value });
		},
	}
}