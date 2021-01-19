import name from './name'
import phone from './phone'
import select from './select'

const GET_FORM_STATE = () => {
	return {
		isSendingForm: false,
		fields: {
			name: {
				value: '',
				errorMsg: 'Имя обязательно к заполнению!',
				isError: true
			},
			phone: {
				value: '',
				errorMsg: 'Телефон обязателен к заполнению!',
				isError: true
			},
			select: {
				value: '',
			},
		}
	}
};
const INIT_FORM_STATE = GET_FORM_STATE();

export default {
	namespaced: true,
	modules: {
		name,
		phone,
		select
	},
	state: INIT_FORM_STATE,
	getters: {
		GET_IS_SENDING_FORM: state => state.isSendingForm,
		GET_CLASS_FIELD_ERROR: state => field => {
			return { 'field-item--error': state.fields[field].isError && state.isSendingForm }
		},
		GET_CLASS_FIELD_SUCCESS: state => field => {
			return { 'field-item--success': !state.fields[field].isError && state.isSendingForm }
		},
	},
	mutations: {
		SET_IS_SENDING_FORM: state => state.isSendingForm = true,
		SET_DROP_STATE_FORM: state => Object.assign(state, GET_FORM_STATE()),
	},
	actions: {
		SET_IS_SENDING_FORM: ({ commit }) => commit('SET_IS_SENDING_FORM'),
		DROP_STATE_FORM: ({ commit }) => commit('SET_DROP_STATE_FORM'),
		CHECK_VALIDATE_FORM: ({ state }, { required }) => {
			return required
				.map(curr => state.fields[curr].isError)
				.every(curr => curr === false ? true : false);
		},
		ADD_USER: ({ dispatch, state }) => {
			const user = Object.entries(state.fields)
				.reduce((acc, curr) => {
					const [title, options] = curr;
					Object.assign(acc, { [title]: options.value });

					return acc;
				}, {});

			dispatch('users/SAVE_USER', user, { root: true });
		}
	}
}