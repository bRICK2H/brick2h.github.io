<template>
	<div class="field-box form__field-box">
		<p class="field-box__error"
			v-show="GET_IS_SENDING_FORM && GET_FIELD_PHONE('isError')"
		>
			{{ GET_FIELD_PHONE('errorMsg') }}
		</p>
		<label for="phone" class="field-box__label">
			Телефон*
		</label>
		<input class="field-item field-box__field-item"
			:class="[GET_CLASS_FIELD_ERROR('phone'), GET_CLASS_FIELD_SUCCESS('phone')]"
			autocomplete="off"
			placeholder="+79779991178"
			id="phone"
			type="text"
			v-model.trim="phone"
			@click.once="SET_PHONE('+7')"
			@focus.once="SET_PHONE('+7')"
		>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'cFormPhone',
	computed: {
		...mapGetters('form', [
			'GET_FIELD_PHONE',
			'GET_IS_SENDING_FORM',
			'GET_CLASS_FIELD_ERROR',
			'GET_CLASS_FIELD_SUCCESS'
		]),
		phone: {
			get() {
				return this.GET_FIELD_PHONE('value');
			},
			set(value) {
				this.SET_PHONE(value);
			}
		}
	},
	methods: mapActions('form', ['SET_PHONE']),
}
</script>