export default {
	getters: {
		GET_FIELD_PHONE: (s, g, rootState) => field => {
			const { form: { fields: { phone } } } = rootState;
			return phone[field];
		}
	},
	mutations: {
		SET_PHONE: (s, { phone, value }) => {
			phone.value = value;

			if (phone.value.length === 12) {
				let temp = [...phone.value];
				let separator = [];

				for (let i = 0; i < 4; i++) {
					i < 2
						? separator.unshift(` ${temp.splice(-2).join('')}`)
						: separator.unshift(` ${temp.splice(-3).join('')}`);
				}

				phone.value = temp.join('') + separator.join('');
			}
		},
		SET_VALIDATE_PHONE: (s, { phone, value }) => {
			const templateForSettingValues = (isError, errorMsg) => {
				phone.isError = isError;
				phone.errorMsg = errorMsg;
			}

			if (!Boolean(value)) {
				templateForSettingValues(true, 'Телефон обязателен к заполнению!');
			} else if (!(/^\+7{1} ?[0-9]{3} ?[0-9]{3} ?[0-9]{2} ?[0-9]{2}$/).test(value)) {
				templateForSettingValues(true, 'Введены не корректные значения!');
			} else {
				templateForSettingValues(false, '');
			}
		}
	},
	actions: {
		SET_PHONE: ({ commit, rootState }, value) => {
			let { form: { fields: { phone } } } = rootState;

			commit('SET_VALIDATE_PHONE', { phone, value });
			commit('SET_PHONE', { phone, value });
		},
	}
}