export default {
	getters: {
		GET_FIELD_NAME: (s, g, rootState) => field => {
			let { form: { fields: { name } } } = rootState;
			return name[field];
		}
	},
	mutations: {
		SET_NAME: (s, { name, value }) => name.value = value,
		SET_VALIDATE_NAME: (s, { name, value }) => {
			const templateForSettingValues = (isError, errorMsg) => {
				name.isError = isError;
				name.errorMsg = errorMsg;
			}
			
			if (!Boolean(value)) {
				templateForSettingValues(true, 'Имя обязательно к заполнению!');
			} else if (!(/^[А-Яа-яЁё]+$/).test(value)) {
				templateForSettingValues(true, 'Разрешены только буквы кириллицы!');
			} else {
				templateForSettingValues(false, '');
			}
		}
	},
	actions: {
		SET_NAME: ({ commit, rootState }, value) => {
			let { form: { fields: { name } } } = rootState;

			commit('SET_VALIDATE_NAME', { name, value });
			commit('SET_NAME', { name, value });
		},
	}
}