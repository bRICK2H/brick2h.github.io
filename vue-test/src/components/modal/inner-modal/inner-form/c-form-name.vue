<template>
	<div class="field-box form__field-box">
		<p class="field-box__error"
			v-show="GET_IS_SENDING_FORM && GET_FIELD_NAME('isError')"
		>
			{{ GET_FIELD_NAME('errorMsg') }}
		</p>
		<label for="name" class="field-box__label">
			Имя*
		</label>
		<input class="field-item field-box__field-item"
			:class="[GET_CLASS_FIELD_ERROR('name'), GET_CLASS_FIELD_SUCCESS('name')]"
			autocomplete="off"
			placeholder="Денис"
			id="name"
			type="text"
			v-model.trim="name"
		>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'cFormName',
	computed: {
		...mapGetters('form', [
			'GET_FIELD_NAME',
			'GET_IS_SENDING_FORM',
			'GET_CLASS_FIELD_ERROR',
			'GET_CLASS_FIELD_SUCCESS'
		]),
		name: {
			get() {
				return this.GET_FIELD_NAME('value');
			},
			set(value) {
				this.SET_NAME(value);
			}
		}
	},
	methods: mapActions('form', ['SET_NAME']),
}
</script>