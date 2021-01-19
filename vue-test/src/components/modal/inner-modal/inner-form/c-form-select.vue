<template>
	<div class="field-box form__field-box">
		<label for="" class="field-box__label">Начальник</label>
		<select name="" id="" class="field-item field-box__field-item"
			v-model="select"
		>
			<option value="" disabled selected>нет</option>
			<option
				v-for="user of GET_USERS"
				:key="user.id"
				:value="[user]"
			>
				{{ user.name }}
			</option>
		</select>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'cFormSelect',
	computed: {
		...mapGetters('form', ['GET_FIELD_SELECT']),
		...mapGetters('users', ['GET_USERS']),
		select: {
			get() {
				return this.GET_FIELD_SELECT('value');
			},
			set(value) {
				this.SET_SELECT(value);
			}
		}
	},
	methods: mapActions('form', ['SET_SELECT']),
}
</script>