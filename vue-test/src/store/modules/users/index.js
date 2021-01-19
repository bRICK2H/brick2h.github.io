import DEFAULT_USERS from './users.json'

import Vue from 'vue'
const vm = new Vue

export default {
	namespaced: true,
	state: {
		users: [],
		isTypeOfSort: {
			'name': false,
			'phone': true
		}
	},
	getters: {
		GET_USERS: state => state.users,
		GET_NEXT_USER_ID: state => Math.max(...state.users.map(curr => curr.id)) + 1,
		GET_IS_TYPE_OF_SORT: state => state.isTypeOfSort,
	},
	mutations: {
		SET_SAVING_USER: (state, user) => state.users.push(user),
		SET_SAVING_USERS: (state, STORAGE_USER) => {
			if (STORAGE_USER) {
				vm.$set(state, 'users', JSON.parse(STORAGE_USER));
			} else {
				vm.$set(state, 'users', DEFAULT_USERS);
			}
		},
		SET_STATE_TYPE_OF_SORT: (state, STATE_TYPE_OF_SORT) => {
			if (STATE_TYPE_OF_SORT) {
				vm.$set(state, 'isTypeOfSort', JSON.parse(STATE_TYPE_OF_SORT));
			} else {
				vm.$set(state, 'isTypeOfSort', {
					'name': false,
					'phone': true
				});
			} 
		},
		SET_SORTING_USERS: (state, type) => {
			state.isTypeOfSort[type] = !state.isTypeOfSort[type];

			state.users.sort(({ [type]: a }, { [type]: b }) => {
				switch (type) {
					case 'name':
					case 'phone':
						return state.isTypeOfSort[type]
							? a.localeCompare(b)
							: b.localeCompare(a)

				}
			});
		}
	},
	actions: {
		SAVE_USER: ({ commit, getters }, user) => {
			const NEXT_USER_ID = getters.GET_NEXT_USER_ID;

			commit('SET_SAVING_USER', { id: NEXT_USER_ID, ...user });
		},
		FETCH_USERS: ({ commit }) => {
			const STORAGE_USER = localStorage.getItem('CURR_USERS');
			const STATE_TYPE_OF_SORT = localStorage.getItem('STATE_TYPE_OF_SORT');

			commit('SET_SAVING_USERS', STORAGE_USER);
			commit('SET_STATE_TYPE_OF_SORT', STATE_TYPE_OF_SORT);
		},
		SORT_USERS: ({ commit }, type) => commit('SET_SORTING_USERS', type)
	}
}